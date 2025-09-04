import { describe, it, expect } from 'vitest'
import { createCurves, createVerticalCurves, createPath, createVerticalPath } from '../path'

describe('Path utilities', () => {
  describe('createCurves', () => {
    it('creates curve points correctly', () => {
      expect(createCurves(0, 0, 6, 2)).toBe(' C3,0 3,2 6,2')
      expect(createCurves(10, 5, 20, 10)).toBe(' C15,5 15,10 20,10')
    })
  })

  describe('createVerticalCurves', () => {
    it('creates vertical curve points correctly', () => {
      expect(createVerticalCurves(0, 0, 6, 4)).toBe(' C0,2 6,2 6,4')
      expect(createVerticalCurves(5, 10, 15, 20)).toBe(' C5,15 15,15 15,20')
    })
  })

  describe('createPath', () => {
    it('creates a complete path string', () => {
      const X = [0, 10, 20]
      const Y = [0, 5, 10]
      const YNext = [2, 7, 12]
      
      const path = createPath(0, X, Y, YNext)
      expect(path).toMatch(/^M0,0/)  // Starts with Move command
      expect(path).toMatch(/Z$/)     // Ends with close path command
      expect(path).toContain('C')    // Contains curve commands
    })
  })

  describe('createVerticalPath', () => {
    it('creates a complete vertical path string', () => {
      const X = [0, 10, 20]
      const Y = [0, 5, 10]
      const YNext = [2, 7, 12]
      
      const path = createVerticalPath(0, X, Y, YNext)
      expect(path).toMatch(/^M0,0/)  // Starts with Move command
      expect(path).toMatch(/Z$/)     // Ends with close path command
      expect(path).toContain('C')    // Contains curve commands
    })
  })
})