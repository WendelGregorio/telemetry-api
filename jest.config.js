module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
};
