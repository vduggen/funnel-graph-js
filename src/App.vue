<template>
  <div class="app">
    <h1>Vue 3 Funnel Graph with TypeScript</h1>
    
    <div class="funnel-container">
      <FunnelGraph
        :data="currentData"
        :width="width"
        :height="height"
        :direction="direction"
        :gradient-direction="gradientDirection"
        :display-percent="displayPercent"
        :sub-label-value="subLabelValue"
      />
    </div>

    <div class="controls">
      <button @click="makeVertical">Make Vertical</button>
      <button @click="makeHorizontal">Make Horizontal</button>
      <button @click="toggleDirection">Toggle Direction</button>
      <button @click="gradientMakeVertical">Gradient Vertical</button>
      <button @click="gradientMakeHorizontal">Gradient Horizontal</button>
      <button @click="gradientToggleDirection">Toggle Gradient</button>
      <button @click="useData1" class="dataset-btn">Dataset 1</button>
      <button @click="useData2" class="dataset-btn">Dataset 2</button>
      <button @click="useData3" class="dataset-btn">Dataset 3</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FunnelGraph from './components/FunnelGraph.vue'
import type { FunnelData } from './types'

const width = ref(800)
const height = ref(300)
const direction = ref<'horizontal' | 'vertical'>('horizontal')
const gradientDirection = ref<'horizontal' | 'vertical'>('horizontal')
const displayPercent = ref(true)
const subLabelValue = ref<'percent' | 'raw'>('raw')

const dataExample1: FunnelData = {
  colors: ['#FFB178', '#FF3C8E'],
  values: [11000, 3000, 240]
}

const dataExample2: FunnelData = {
  labels: ['Impressions 2', 'Add To Cart 2', 'Buy 2'],
  colors: ['#FFB178', '#FF3C8E'],
  values: [12000, 5700, 360]
}

const dataExample3: FunnelData = {
  labels: ['Impressions', 'Add To Cart', 'Buy'],
  subLabels: ['Direct', 'Social Media', 'Ads'],
  colors: [
    ['#FFB178', '#FF78B1', '#FF3C8E'],
    ['#A0BBFF', '#EC77FF'],
    ['#A0F9FF', '#7795FF']
  ],
  values: [
    [3500, 2500, 6500],
    [3300, 1400, 1000],
    [600, 200, 130]
  ]
}

const currentData = ref<FunnelData>(dataExample3)

const makeVertical = () => {
  width.value = 300
  height.value = 400
  direction.value = 'vertical'
}

const makeHorizontal = () => {
  width.value = 800
  height.value = 300
  direction.value = 'horizontal'
}

const toggleDirection = () => {
  direction.value === 'horizontal' ? makeVertical() : makeHorizontal()
}

const gradientMakeVertical = () => {
  gradientDirection.value = 'vertical'
}

const gradientMakeHorizontal = () => {
  gradientDirection.value = 'horizontal'
}

const gradientToggleDirection = () => {
  gradientDirection.value = gradientDirection.value === 'horizontal' ? 'vertical' : 'horizontal'
}

const useData1 = () => {
  currentData.value = dataExample1
}

const useData2 = () => {
  currentData.value = dataExample2
}

const useData3 = () => {
  currentData.value = dataExample3
}
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 48px;
}

.funnel-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  min-height: 400px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #45a049;
}

.dataset-btn {
  background: #2196F3;
}

.dataset-btn:hover {
  background: #1976D2;
}
</style>