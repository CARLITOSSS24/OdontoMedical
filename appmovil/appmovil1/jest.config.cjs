/** @type {import('jest').Config} */
module.exports = {
  rootDir: ".",
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  // Cambia de [".js", ".jsx"] a [".jsx"]
  extensionsToTreatAsEsm: ['.jsx'],
  roots: [
    "<rootDir>/Backend/API-ODO/src",
    "<rootDir>/Frontend/vite-project/src",
  ],
  moduleNameMapper: {
    "^@frontend/(.*)$": "<rootDir>/Frontend/vite-project/src/$1",
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

};
