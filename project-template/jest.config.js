module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    },
    "./src/cover/**/*.ts": {
      "branches": 40,
      "statements": 40,
      "lines": 50,
    },
  }
};