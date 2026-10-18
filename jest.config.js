/** @type {import('jest').Config} */
export default {
  displayName: 'rn-playground-blocks',
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }] },
  testMatch: ['**/*.spec.ts'],
};
