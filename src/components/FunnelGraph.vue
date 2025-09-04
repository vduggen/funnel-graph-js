<template>
  <div
    ref="containerRef" 
    class="vue-funnel-graph"
    :class="{ 'vue-funnel-graph--vertical': direction === 'vertical' }"
  >
    <div ref="graphContainerRef" class="vue-funnel-graph__container">
      <svg 
        v-if="svgDimensions.width && svgDimensions.height"
        :width="svgDimensions.width" 
        :height="svgDimensions.height"
        class="vue-funnel-graph__svg"
      >
        <defs>
          <linearGradient
            v-for="gradient in gradients"
            :key="gradient.id"
            :id="gradient.id"
            :gradientTransform="gradient.direction === 'vertical' ? 'rotate(90)' : ''"
          >
            <stop
              v-for="(color, colorIndex) in gradient.colors"
              :key="`${gradient.id}-${colorIndex}`"
              :offset="`${(colorIndex * 100) / (gradient.colors.length - 1)}%`"
              :style="`stop-color: ${color}`"
            />
          </linearGradient>
        </defs>
        
        <path
          v-for="(path, index) in paths"
          :key="index"
          :d="path.d"
          :fill="path.fill"
          :stroke="path.stroke"
          class="vue-funnel-graph__path"
        />
      </svg>
    </div>

    <!-- Labels -->
    <div v-if="labels.length" class="vue-funnel-graph__labels">
      <div 
        v-for="(label, index) in labels"
        :key="index"
        class="vue-funnel-graph__label"
      >
        <div class="label__value">{{ formatNumber(displayValues[index]) }}</div>
        <div class="label__title">{{ label }}</div>
        <div v-if="displayPercent && percentages[index] !== 100" class="label__percentage">
          {{ percentages[index] }}%
        </div>
        
        <!-- Sub-label percentages for 2D data -->
        <div 
          v-if="is2d && subLabels.length && twoDimPercentages[index]" 
          class="label__segment-percentages"
        >
          <ul class="segment-percentage__list">
            <li 
              v-for="(subLabel, j) in subLabels"
              :key="j"
            >
              {{ subLabel }}:
              <span class="percentage__list-label">
                {{ subLabelValue === 'percent' 
                  ? `${twoDimPercentages[index][j]}%` 
                  : formatNumber((data.values as number[][])[index][j]) 
                }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Sub Labels -->
    <div v-if="subLabels.length && !is2d" class="vue-funnel-graph__subLabels">
      <div 
        v-for="(subLabel, index) in subLabels"
        :key="index"
        class="vue-funnel-graph__subLabel"
      >
        <div 
          class="vue-funnel-graph__subLabel--color"
          :style="getSubLabelColor(index)"
        ></div>
        {{ subLabel }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import type { FunnelGraphProps } from '@/types'
import { roundPoint, formatNumber } from '@/utils/number'
import { createPath, createVerticalPath } from '@/utils/path'
import { getDefaultColors } from '@/utils/graph'
import { generateRandomId } from '@/utils/random'

// Props
const props = withDefaults(defineProps<FunnelGraphProps>(), {
  width: 800,
  height: 300,
  direction: 'horizontal',
  gradientDirection: 'horizontal',
  displayPercent: true,
  subLabelValue: 'percent'
})

// Refs
const containerRef = ref<HTMLDivElement>()
const graphContainerRef = ref<HTMLDivElement>()

// Computed properties
const labels = computed(() => props.data.labels || [])
const subLabels = computed(() => props.data.subLabels || [])
const values = computed(() => props.data.values)
const colors = computed(() => {
  if (!props.data.colors) {
    return getDefaultColors(is2d.value ? getSubDataSize() : 2)
  }
  return props.data.colors
})

const is2d = computed(() => {
  return Array.isArray(values.value[0])
})

const direction = computed(() => props.direction)
const gradientDirection = computed(() => props.gradientDirection)
const displayPercent = computed(() => props.displayPercent)
const subLabelValue = computed(() => props.subLabelValue)

// Dimensions
const svgDimensions = computed(() => ({
  width: props.width || (graphContainerRef.value?.clientWidth ?? 800),
  height: props.height || (graphContainerRef.value?.clientHeight ?? 300)
}))

// Helper functions
const getDataSize = (): number => values.value.length
const getSubDataSize = (): number => (values.value[0] as number[]).length

const getValues2d = (): number[] => {
  if (!is2d.value) return values.value as number[]
  return (values.value as number[][]).map(arr => arr.reduce((sum, val) => sum + val, 0))
}

const displayValues = computed(() => {
  return is2d.value ? getValues2d() : values.value as number[]
})

const percentages = computed(() => {
  const vals = displayValues.value
  const max = Math.max(...vals)
  return vals.map(value => value === 0 ? 0 : roundPoint(value * 100 / max))
})

const twoDimPercentages = computed(() => {
  if (!is2d.value) return []
  
  return (values.value as number[][]).map(row => {
    const total = row.reduce((sum, val) => sum + val, 0)
    return row.map(val => val === 0 ? 0 : roundPoint(val * 100 / total))
  })
})

// Path generation
const getMainAxisPoints = (): number[] => {
  const fullDimension = direction.value === 'vertical' ? svgDimensions.value.width : svgDimensions.value.height
  const points: number[] = []
  
  for (let i = 0; i <= getDataSize(); i++) {
    points.push(fullDimension / getDataSize() * i)
  }
  
  return points
}

const getCrossAxisPoints = (): number[] => {
  const fullDimension = direction.value === 'vertical' ? svgDimensions.value.height : svgDimensions.value.width
  const values = displayValues.value
  const max = Math.max(...values)
  
  return values.map(value => fullDimension * (1 - value / max) / 2)
}

const getPathDefinitions = (): string[] => {
  const mainAxisPoints = getMainAxisPoints()
  const crossAxisPoints = getCrossAxisPoints()
  const fullCrossAxis = direction.value === 'vertical' ? svgDimensions.value.height : svgDimensions.value.width
  const paths: string[] = []
  
  for (let i = 0; i < getDataSize(); i++) {
    const X = [mainAxisPoints[i], mainAxisPoints[i + 1]]
    const Y = [crossAxisPoints[i], crossAxisPoints[i]]
    const YNext = [fullCrossAxis - crossAxisPoints[i + 1], fullCrossAxis - crossAxisPoints[i + 1]]
    
    if (direction.value === 'vertical') {
      paths.push(createVerticalPath(i, Y, X, YNext))
    } else {
      paths.push(createPath(i, X, Y, YNext))
    }
  }
  
  return paths
}

// Gradients
const gradients = computed(() => {
  const pathColors = Array.isArray(colors.value) ? colors.value : [colors.value]
  const gradientList: Array<{id: string, colors: string[], direction: string}> = []
  
  pathColors.forEach((color, index) => {
    const gradientId = generateRandomId(`funnelGradient${index}_`)
    
    if (Array.isArray(color)) {
      gradientList.push({
        id: gradientId,
        colors: color,
        direction: gradientDirection.value
      })
    } else {
      gradientList.push({
        id: gradientId,
        colors: [color, color],
        direction: gradientDirection.value
      })
    }
  })
  
  return gradientList
})

const paths = computed(() => {
  const pathDefinitions = getPathDefinitions()
  const pathColors = Array.isArray(colors.value) ? colors.value : [colors.value]
  
  return pathDefinitions.map((d, index) => {
    const color = pathColors[index % pathColors.length]
    const gradient = gradients.value[index % gradients.value.length]
    
    return {
      d,
      fill: `url(#${gradient.id})`,
      stroke: Array.isArray(color) ? `url(#${gradient.id})` : color
    }
  })
})

const getSubLabelColor = (index: number): string => {
  const pathColors = Array.isArray(colors.value) ? colors.value : [colors.value]
  const color = pathColors[index % pathColors.length]
  const colorValue = Array.isArray(color) ? color[0] : color
  return `background-color: ${colorValue}`
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    // Component is ready
  })
})
</script>

<style scoped>
.vue-funnel-graph {
  font-family: 'Open Sans', sans-serif;
  position: relative;
}

.vue-funnel-graph__container {
  width: 100%;
  height: 100%;
}

.vue-funnel-graph__svg {
  width: 100%;
  height: 100%;
}

.vue-funnel-graph__path {
  transition: opacity 0.2s ease;
}

.vue-funnel-graph__path:hover {
  opacity: 0.8;
}

.vue-funnel-graph__labels {
  width: 100%;
  box-sizing: border-box;
  display: flex;
}

.vue-funnel-graph__label {
  flex: 1 1 0;
  position: relative;
  padding-left: 24px;
  text-align: center;
}

.vue-funnel-graph__label:not(:first-child) {
  border-left: 1px solid #666;
}

.label__value {
  font-size: 24px;
  color: #fff;
  line-height: 18px;
  margin-bottom: 6px;
}

.label__title {
  font-size: 12px;
  font-weight: bold;
  color: #999;
}

.label__percentage {
  font-size: 16px;
  font-weight: bold;
  color: #666;
}

.vue-funnel-graph--vertical .vue-funnel-graph__labels {
  flex-direction: column;
  padding-left: 120px;
  padding-right: 16px;
}

.vue-funnel-graph--vertical .vue-funnel-graph__label {
  padding-top: 24px;
  padding-left: 0;
}

.vue-funnel-graph--vertical .vue-funnel-graph__label:not(:first-child) {
  border-left: none;
  border-top: 1px solid #666;
}

.label__segment-percentages {
  margin-top: 16px;
}

.vue-funnel-graph--vertical .label__segment-percentages {
  margin-left: 106px;
  width: calc(100% - 106px);
}

.segment-percentage__list {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #999;
}

.percentage__list-label {
  font-weight: bold;
  color: #fff;
}

.vue-funnel-graph__subLabels {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  position: absolute;
  width: 100%;
  left: 0;
}

.vue-funnel-graph__subLabel {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #fff;
  line-height: 16px;
}

.vue-funnel-graph__subLabel:not(:first-child) {
  margin-left: 16px;
}

.vue-funnel-graph__subLabel--color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>