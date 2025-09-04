# Vue 3 Funnel Graph Component

A Vue 3 component library for creating beautiful, interactive SVG funnel charts with TypeScript support and Vite build system.

![Vue 3 Funnel Graph](https://github.com/user-attachments/assets/aa80748d-e8be-4386-a97f-e841b79996c7)

## Features ✨

- **Vue 3 + Composition API**: Built with modern Vue 3 reactive system
- **TypeScript Support**: Full type safety and IntelliSense
- **Vite Build System**: Fast development and optimized builds
- **Responsive Design**: Adapts to container dimensions
- **Interactive**: Click handlers and dynamic data updates
- **Flexible Orientations**: Horizontal and vertical layouts
- **Rich Data Support**: 1D and 2D data with sub-categories
- **Customizable Gradients**: Multi-color gradients with direction control
- **Accessibility**: Proper semantic structure and ARIA support

## Installation

```bash
npm install funnel-graph-js
```

## Usage

### Basic Usage

```vue
<template>
  <FunnelGraph :data="funnelData" />
</template>

<script setup lang="ts">
import { FunnelGraph } from 'funnel-graph-js'
import type { FunnelData } from 'funnel-graph-js'

const funnelData: FunnelData = {
  labels: ['Impressions', 'Add To Cart', 'Buy'],
  values: [12000, 5700, 360]
}
</script>
```

### Advanced Usage with 2D Data

```vue
<template>
  <FunnelGraph
    :data="complexData"
    :width="800"
    :height="300"
    direction="horizontal"
    gradient-direction="horizontal"
    :display-percent="true"
    sub-label-value="raw"
  />
</template>

<script setup lang="ts">
import { FunnelGraph } from 'funnel-graph-js'
import type { FunnelData } from 'funnel-graph-js'

const complexData: FunnelData = {
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
</script>
```

### Plugin Installation

```typescript
import { createApp } from 'vue'
import FunnelGraphPlugin from 'funnel-graph-js'

const app = createApp(App)
app.use(FunnelGraphPlugin)
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `FunnelData` | **required** | The funnel data configuration |
| `width` | `number` | `800` | Chart width in pixels |
| `height` | `number` | `300` | Chart height in pixels |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Chart orientation |
| `gradientDirection` | `'horizontal' \| 'vertical'` | `'horizontal'` | Gradient direction |
| `displayPercent` | `boolean` | `true` | Show percentage values |
| `subLabelValue` | `'percent' \| 'raw'` | `'percent'` | Sub-label value format |

## Types

### FunnelData

```typescript
interface FunnelData {
  labels?: string[]                              // Step labels
  subLabels?: string[]                          // Sub-category labels
  colors?: string | string[] | (string | string[])[]  // Colors or gradients
  values: number[] | number[][]                 // 1D or 2D values
}
```

### FunnelConfig

```typescript
interface FunnelConfig {
  width?: number
  height?: number
  direction?: 'horizontal' | 'vertical'
  gradientDirection?: 'horizontal' | 'vertical'
  displayPercent?: boolean
  subLabelValue?: 'percent' | 'raw'
}
```

## Examples

### Vertical Layout
![Vertical Funnel Graph](https://github.com/user-attachments/assets/f0e271f1-26c5-444d-b396-15e1241b5d67)

### Simple Data
```typescript
const simpleData: FunnelData = {
  colors: ['#FFB178', '#FF3C8E'],
  values: [11000, 3000, 240]
}
```

### With Labels
```typescript
const labeledData: FunnelData = {
  labels: ['Visitors', 'Leads', 'Customers'],
  colors: ['#FFB178', '#FF3C8E'],
  values: [12000, 5700, 360]
}
```

### Multi-dimensional Data
```typescript
const multiData: FunnelData = {
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
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run type-check
```

## Migration from v1.x

This version represents a complete rewrite for Vue 3. Key changes:

- **Vue 3 Components**: Now uses Vue 3 reactive components instead of vanilla JavaScript
- **TypeScript**: Full TypeScript support with proper type definitions
- **Vite**: Modern build system replacing Gulp
- **Composition API**: Uses Vue 3 Composition API for better reactivity
- **ESM**: Native ES module support

### Breaking Changes

1. **Installation**: Now requires Vue 3 as a peer dependency
2. **API**: Use as Vue component instead of JavaScript class
3. **Build**: Uses Vite instead of Gulp/Browserify
4. **Types**: Full TypeScript support with proper interfaces

## Browser Support

- Chrome >= 90
- Firefox >= 90
- Safari >= 14
- Edge >= 90

## License

MIT © [Greg Hovanesyan](https://github.com/greghub)

## Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests to the main repository.