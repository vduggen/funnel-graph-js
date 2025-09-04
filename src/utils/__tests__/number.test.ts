import { describe, it, expect } from 'vitest'
import { roundPoint, formatNumber } from '../number'

describe('Number utilities', () => {
  describe('roundPoint', () => {
    it('rounds numbers to one decimal place', () => {
      expect(roundPoint(19.99999999998)).toBe(20)
      expect(roundPoint(15.555)).toBe(15.6)
      expect(roundPoint(10.12345)).toBe(10.1)
      expect(roundPoint(5)).toBe(5)
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with comma separators', () => {
      expect(formatNumber(12500)).toBe('12,500')
      expect(formatNumber(1000000)).toBe('1,000,000')
      expect(formatNumber(123)).toBe('123')
      expect(formatNumber(1234)).toBe('1,234')
    })
  })
})