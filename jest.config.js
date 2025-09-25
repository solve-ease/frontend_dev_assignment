module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[tj]sx?$': 'ts-jest' },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};