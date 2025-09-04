import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FunnelGraph from '@/components/FunnelGraph.vue'
import type { FunnelData } from '@/types'

describe('FunnelGraph Component', () => {
  const basicData: FunnelData = {
    labels: ['Step 1', 'Step 2', 'Step 3'],
    values: [1000, 500, 100]
  }

  const twoDimensionalData: FunnelData = {
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

  it('renders properly with basic data', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: basicData,
        width: 800,
        height: 300
      }
    })

    expect(wrapper.find('.vue-funnel-graph').exists()).toBe(true)
    expect(wrapper.find('.vue-funnel-graph__svg').exists()).toBe(true)
  })

  it('displays labels when provided', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: basicData
      }
    })

    const labels = wrapper.findAll('.vue-funnel-graph__label')
    expect(labels).toHaveLength(3)
    expect(labels[0].find('.label__title').text()).toBe('Step 1')
    expect(labels[1].find('.label__title').text()).toBe('Step 2')
    expect(labels[2].find('.label__title').text()).toBe('Step 3')
  })

  it('displays percentages when displayPercent is true', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: basicData,
        displayPercent: true
      }
    })

    const percentages = wrapper.findAll('.label__percentage')
    // Only non-100% percentages are displayed
    expect(percentages.length).toBeGreaterThan(0)
  })

  it('handles 2D data correctly', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: twoDimensionalData
      }
    })

    expect(wrapper.find('.vue-funnel-graph').exists()).toBe(true)
    expect(wrapper.findAll('.label__segment-percentages')).toHaveLength(3)
  })

  it('switches to vertical direction', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: basicData,
        direction: 'vertical'
      }
    })

    expect(wrapper.find('.vue-funnel-graph--vertical').exists()).toBe(true)
  })

  it('displays sub-labels for non-2D data', () => {
    const simpleDataWithSubLabels: FunnelData = {
      labels: ['Step 1', 'Step 2'],
      subLabels: ['Source A', 'Source B'],
      values: [1000, 500]
    }

    const wrapper = mount(FunnelGraph, {
      props: {
        data: simpleDataWithSubLabels
      }
    })

    const subLabels = wrapper.findAll('.vue-funnel-graph__subLabel')
    expect(subLabels).toHaveLength(2)
    expect(subLabels[0].text()).toContain('Source A')
    expect(subLabels[1].text()).toContain('Source B')
  })

  it('generates SVG paths', () => {
    const wrapper = mount(FunnelGraph, {
      props: {
        data: basicData,
        width: 800,
        height: 300
      }
    })

    const paths = wrapper.findAll('.vue-funnel-graph__path')
    expect(paths).toHaveLength(3)
    
    paths.forEach(path => {
      expect(path.attributes('d')).toBeDefined()
      expect(path.attributes('fill')).toBeDefined()
    })
  })
})