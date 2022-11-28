import { describe, expect, it } from "vitest";
import {
  parseHectogramsToKgs,
  parseHectogramsToPounds,
  parseDecimetresToCentimeters,
} from "./index";

describe("Test utils functions", () => {
  describe("'parseHectogramsToKgs' test cases", () => {
    it("should return number with only one decimal", () => {
      const kgs = parseHectogramsToKgs(70.9132);

      expect(kgs).toEqual("7.1");
    });

    it("should return '7.0' kgs when pass '70' hectograms", () => {
      const kgs = parseHectogramsToKgs(70.5);

      expect(kgs).toEqual("7.0");
    });
  });

  describe("'parseHectogramsToPounds' test cases", () => {
    it("should return number with only one decimal", () => {
      const pounds = parseHectogramsToPounds(70.9132);

      expect(pounds).toEqual("15.6");
    });

    it("should return '15.5' pounds when pass '70' hectograms", () => {
      const pounds = parseHectogramsToPounds(70.5);

      expect(pounds).toEqual("15.5");
    });
  });

  describe("'parseDecimetresToCentimeters' test cases", () => {
    it("should return string value", () => {
      const cms = parseDecimetresToCentimeters(12312);

      expect(cms).toBeTypeOf("string");
    });

    it("should return number without decimals limit", () => {
      const cms = parseDecimetresToCentimeters(17.123123123);

      expect(cms).toEqual("171.23123123");
    });

    it("should return '170' cms when pass '17' decimetres", () => {
      const cms = parseDecimetresToCentimeters(17);

      expect(cms).toEqual("170");
    });
  });
});
