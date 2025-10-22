// Import all test data
import test001 from './test001.json'
import test002 from './test002.json'
import test003 from './test003.json'
import test004 from './test004.json'
import test005 from './test005.json'
import test006 from './test006.json'
import test007_1 from './test007.1.json'
import test007_2 from './test007.2.json'
import test007_3 from './test007.3.json'
import test007_4 from './test007.4.json'
import test007_5 from './test007.5.json'
import test007_6 from './test007.6.json'

// Export all tests
export const tests = {
  test001,
  test002,
  test003,
  test004,
  test005,
  test006,
  'test007.1': test007_1,
  'test007.2': test007_2,
  'test007.3': test007_3,
  'test007.4': test007_4,
  'test007.5': test007_5,
  'test007.6': test007_6
}

// Export test list metadata
export const testList = [
  { id: 'test001', name: 'Bộ đề 001', file: 'test001' },
  { id: 'test002', name: 'Bộ đề 002', file: 'test002' },
  { id: 'test003', name: 'Bộ đề 003', file: 'test003' },
  { id: 'test004', name: 'Bộ đề 004', file: 'test004' },
  { id: 'test005', name: 'Bộ đề 005', file: 'test005' },
  { id: 'test006', name: 'Bộ đề 006', file: 'test006' },
  { id: 'test007.1', name: 'AWS SAA-C03 - Phần 1', file: 'test007.1', category: 'AWS' },
  { id: 'test007.2', name: 'AWS SAA-C03 - Phần 2', file: 'test007.2', category: 'AWS' },
  { id: 'test007.3', name: 'AWS SAA-C03 - Phần 3', file: 'test007.3', category: 'AWS' },
  { id: 'test007.4', name: 'AWS SAA-C03 - Phần 4', file: 'test007.4', category: 'AWS' },
  { id: 'test007.5', name: 'AWS SAA-C03 - Phần 5', file: 'test007.5', category: 'AWS' },
  { id: 'test007.6', name: 'AWS SAA-C03 - Phần 6', file: 'test007.6', category: 'AWS' }
]

// Helper function to load a specific test
export function getTest(testId) {
  return tests[testId] || null
}

