// Import all test data
import test001 from './test001.json'
import test002 from './test002.json'
import test003 from './test003.json'
import test004 from './test004.json'
import test005 from './test005.json'
import test006 from './test006.json'

// Export all tests
export const tests = {
  test001,
  test002,
  test003,
  test004,
  test005,
  test006
}

// Export test list metadata
export const testList = [
  { id: 'test001', name: 'Bộ đề 001', file: 'test001' },
  { id: 'test002', name: 'Bộ đề 002', file: 'test002' },
  { id: 'test003', name: 'Bộ đề 003', file: 'test003' },
  { id: 'test004', name: 'Bộ đề 004', file: 'test004' },
  { id: 'test005', name: 'Bộ đề 005', file: 'test005' },
  { id: 'test006', name: 'Bộ đề 006', file: 'test006' }
]

// Helper function to load a specific test
export function getTest(testId) {
  return tests[testId] || null
}

