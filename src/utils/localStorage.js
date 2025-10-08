/**
 * LocalStorage utilities for saving and loading quiz state
 */

const STORAGE_KEY = 'aws_quiz_state'

/**
 * Save quiz state to localStorage
 * @param {Object} state - The quiz state to save
 */
export function saveQuizState(state) {
  try {
    const stateToSave = {
      ...state,
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    return true
  } catch (error) {
    console.error('Error saving quiz state:', error)
    return false
  }
}

/**
 * Load quiz state from localStorage
 * @returns {Object|null} - The saved state or null if not found
 */
export function loadQuizState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    
    const state = JSON.parse(saved)
    
    // Check if saved state is not too old (e.g., 7 days)
    const MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    if (state.timestamp && Date.now() - state.timestamp > MAX_AGE) {
      clearQuizState()
      return null
    }
    
    return state
  } catch (error) {
    console.error('Error loading quiz state:', error)
    return null
  }
}

/**
 * Clear saved quiz state from localStorage
 */
export function clearQuizState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing quiz state:', error)
    return false
  }
}

/**
 * Check if there is a saved quiz state
 * @returns {boolean}
 */
export function hasSavedState() {
  return localStorage.getItem(STORAGE_KEY) !== null
}

