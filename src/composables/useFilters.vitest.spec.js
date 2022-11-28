import { describe, expect, it } from "vitest";
import { useFilters } from "./useFilters";

describe("Test useFilters composable", () => {
  it("should initialize with filters", () => {
    const { currentFilters } = useFilters({
      currentFilters: [{ key: "test", value: "test" }],
    });

    expect(currentFilters.value).toHaveLength(1);
    expect(currentFilters.value).toMatchObject([
      { key: "test", value: "test" },
    ]);
  });

  it("should set 'currentFilters' as an empty array on call the 'reset' method", () => {
    const { currentFilters, reset } = useFilters({
      currentFilters: [{ key: "test", value: "test" }],
    });

    expect(currentFilters.value).toHaveLength(1);
    expect(currentFilters.value).toMatchObject([
      { key: "test", value: "test" },
    ]);

    reset();

    expect(currentFilters.value).toHaveLength(0);
  });

  it("should set change 'currentFilters' value when call the 'setFilters' method", () => {
    const { currentFilters, setFilters } = useFilters();

    expect(currentFilters.value).toHaveLength(0);

    setFilters([{ key: "test", value: "test" }]);

    expect(currentFilters.value).toHaveLength(1);
    expect(currentFilters.value).toMatchObject([
      { key: "test", value: "test" },
    ]);
  });

  it("should return an array of filters filtered by 'key' when call the 'findFilters' method", () => {
    const { findFilters } = useFilters({
      currentFilters: [
        { key: "a1", value: "test" },
        { key: "a2", value: "test" },
        { key: "a2", value: "test2" },
      ],
    });

    const a1Filters = findFilters("a1");

    expect(a1Filters).toHaveLength(1);
    expect(a1Filters).toMatchObject([{ key: "a1", value: "test" }]);

    const a2Filters = findFilters("a2");

    expect(a2Filters).toHaveLength(2);
    expect(a2Filters).toMatchObject([
      { key: "a2", value: "test" },
      { key: "a2", value: "test2" },
    ]);

    const a3Filters = findFilters("a3");

    expect(a3Filters).toHaveLength(0);
  });

  it("should call the callback when call the 'setFilters' method", () => {
    function callback(filters) {
      expect(filters).toHaveLength(1);
      expect(filters).toMatchObject([{ key: "test", value: "test" }]);
    }

    const { setFilters } = useFilters({
      onChangeFilters: callback,
    });

    setFilters([{ key: "test", value: "test" }]);
  });
});
