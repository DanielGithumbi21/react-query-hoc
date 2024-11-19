module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testRegex: "/__tests__/.*\\.(test|spec)\\.(tsx?|jsx?)$",
};
