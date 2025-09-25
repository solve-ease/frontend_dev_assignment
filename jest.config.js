/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',   // use ts-jest for TS/TSX
    '^.+\\.(js|jsx)$': 'babel-jest' // fallback for JS/JSX
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};