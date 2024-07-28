// https://nextjs.org/docs/app/building-your-application/testing/jest
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
