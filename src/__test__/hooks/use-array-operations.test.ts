import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useArrayOperations from '@/hooks/use-array-operations'

describe('useArrayOperations', () => {
  let setIsAnimating: ReturnType<typeof vi.fn>

  beforeEach(() => {
    setIsAnimating = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should initialize with default array elements', () => {
    const { result } = renderHook(() => useArrayOperations(setIsAnimating))

    expect(result.current.arrayElements).toEqual([
      { id: "1", value: 10, index: 0 },
      { id: "2", value: 20, index: 1 },
      { id: "3", value: 30, index: 2 },
      { id: "4", value: 40, index: 3 },
    ])
    expect(result.current.insertValue).toBe("")
    expect(result.current.insertIndex).toBe("")
    expect(result.current.removeIndex).toBe("")
  })

  describe('handleInsert', () => {
    it('should insert element at specified index', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      // Set values for insertion
      act(() => {
        result.current.setInsertValue('25')
        result.current.setInsertIndex('2')
      })

      // Perform insertion
      await act(async () => {
        await result.current.handleInsert()
      })

      // Verify the insertion
      expect(result.current.arrayElements).toHaveLength(5)
      expect(result.current.arrayElements[2].value).toBe(25)
      expect(result.current.arrayElements[2].index).toBe(2)
      
      // Verify elements after insertion point have updated indices
      expect(result.current.arrayElements[3].value).toBe(30)
      expect(result.current.arrayElements[3].index).toBe(3)
      expect(result.current.arrayElements[4].value).toBe(40)
      expect(result.current.arrayElements[4].index).toBe(4)

      // Verify form is cleared
      expect(result.current.insertValue).toBe("")
      expect(result.current.insertIndex).toBe("")

      // Verify animation state
      expect(setIsAnimating).toHaveBeenCalledWith(true)
    })

    it('should insert at beginning of array', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setInsertValue('5')
        result.current.setInsertIndex('0')
      })

      await act(async () => {
        await result.current.handleInsert()
      })

      expect(result.current.arrayElements[0].value).toBe(5)
      expect(result.current.arrayElements[1].value).toBe(10)
      expect(result.current.arrayElements).toHaveLength(5)
    })

    it('should insert at end of array', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setInsertValue('50')
        result.current.setInsertIndex('4')
      })

      await act(async () => {
        await result.current.handleInsert()
      })

      expect(result.current.arrayElements[4].value).toBe(50)
      expect(result.current.arrayElements).toHaveLength(5)
    })

    it('should not insert with invalid inputs', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))
      const initialLength = result.current.arrayElements.length

      // Test empty values
      await act(async () => {
        await result.current.handleInsert()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)

      // Test invalid value
      act(() => {
        result.current.setInsertValue('abc')
        result.current.setInsertIndex('0')
      })
      await act(async () => {
        await result.current.handleInsert()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)

      // Test invalid index
      act(() => {
        result.current.setInsertValue('10')
        result.current.setInsertIndex('-1')
      })
      await act(async () => {
        await result.current.handleInsert()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)

      // Test index out of bounds
      act(() => {
        result.current.setInsertValue('10')
        result.current.setInsertIndex('10')
      })
      await act(async () => {
        await result.current.handleInsert()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)
    })

    it('should handle animation timeout', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setInsertValue('25')
        result.current.setInsertIndex('1')
      })

      await act(async () => {
        await result.current.handleInsert()
      })

      expect(setIsAnimating).toHaveBeenCalledWith(true)

      // Fast forward time
      act(() => {
        vi.advanceTimersByTime(800)
      })

      expect(setIsAnimating).toHaveBeenCalledWith(false)
    })
  })

  describe('handleRemove', () => {
    it('should remove element at specified index', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setRemoveIndex('1')
      })

      await act(async () => {
        await result.current.handleRemove()
      })

      expect(result.current.arrayElements).toHaveLength(3)
      expect(result.current.arrayElements[1].value).toBe(30)
      expect(result.current.arrayElements[1].index).toBe(1)
      expect(result.current.removeIndex).toBe("")
    })

    it('should not remove with invalid inputs', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))
      const initialLength = result.current.arrayElements.length

      // Test empty index
      await act(async () => {
        await result.current.handleRemove()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)

      // Test invalid index
      act(() => {
        result.current.setRemoveIndex('abc')
      })
      await act(async () => {
        await result.current.handleRemove()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)

      // Test negative index
      act(() => {
        result.current.setRemoveIndex('-1')
      })
      await act(async () => {
        await result.current.handleRemove()
      })
      expect(result.current.arrayElements).toHaveLength(initialLength)
    })

    it('should not remove from empty array', async () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      // Clear array first
      act(() => {
        result.current.clearArray()
      })

      act(() => {
        result.current.setRemoveIndex('0')
      })

      await act(async () => {
        await result.current.handleRemove()
      })

      expect(result.current.arrayElements).toHaveLength(0)
      expect(setIsAnimating).not.toHaveBeenCalled()
    })
  })

  describe('resetArray', () => {
    it('should reset array to initial state', () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      // Modify state
      act(() => {
        result.current.setInsertValue('test')
        result.current.setInsertIndex('1')
        result.current.setRemoveIndex('2')
      })

      // Reset
      act(() => {
        result.current.resetArray()
      })

      expect(result.current.arrayElements).toEqual([
        { id: "1", value: 10, index: 0 },
        { id: "2", value: 20, index: 1 },
        { id: "3", value: 30, index: 2 },
        { id: "4", value: 40, index: 3 },
      ])
      expect(result.current.insertValue).toBe("")
      expect(result.current.insertIndex).toBe("")
      expect(result.current.removeIndex).toBe("")
    })
  })

  describe('clearArray', () => {
    it('should clear all elements and form values', () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setInsertValue('test')
        result.current.clearArray()
      })

      expect(result.current.arrayElements).toHaveLength(0)
      expect(result.current.insertValue).toBe("")
      expect(result.current.insertIndex).toBe("")
      expect(result.current.removeIndex).toBe("")
    })
  })

  describe('state setters', () => {
    it('should update form values correctly', () => {
      const { result } = renderHook(() => useArrayOperations(setIsAnimating))

      act(() => {
        result.current.setInsertValue('42')
        result.current.setInsertIndex('2')
        result.current.setRemoveIndex('1')
      })

      expect(result.current.insertValue).toBe('42')
      expect(result.current.insertIndex).toBe('2')
      expect(result.current.removeIndex).toBe('1')
    })
  })
})