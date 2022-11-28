import { describe, expect, it } from "vitest";
import {
  usePagination,
  USE_PAGINATION_DEFAULT_CURRENT_PAGE,
  USE_PAGINATION_DEFAULT_TOTAL_ITEMS,
  USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE,
} from "./usePagination";

describe("Test usePagination composable", () => {
  it("should initialize with default props", () => {
    const { currentPage, totalPages, totalItems, itemsPerPage } =
      usePagination();

    expect(currentPage.value).toEqual(USE_PAGINATION_DEFAULT_CURRENT_PAGE);
    expect(totalPages.value).toEqual(0);
    expect(totalItems.value).toEqual(USE_PAGINATION_DEFAULT_TOTAL_ITEMS);
    expect(itemsPerPage.value).toEqual(USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE);
  });

  it("should initialize with custom props", () => {
    const { currentPage, totalPages, totalItems, itemsPerPage } = usePagination(
      {
        currentPage: 5,
        totalItems: 100,
        itemsPerPage: 10,
      }
    );

    expect(currentPage.value).toEqual(5);
    expect(totalPages.value).toEqual(10);
    expect(totalItems.value).toEqual(100);
    expect(itemsPerPage.value).toEqual(10);
  });

  it("should reset pagination with default values when call the method 'reset'", () => {
    const { currentPage, totalPages, totalItems, itemsPerPage, reset } =
      usePagination({
        currentPage: 5,
        totalItems: 100,
        itemsPerPage: 10,
      });

    expect(currentPage.value).toEqual(5);
    expect(totalPages.value).toEqual(10);
    expect(totalItems.value).toEqual(100);
    expect(itemsPerPage.value).toEqual(10);

    reset();

    expect(currentPage.value).toEqual(USE_PAGINATION_DEFAULT_CURRENT_PAGE);
    expect(totalPages.value).toEqual(0);
    expect(totalItems.value).toEqual(USE_PAGINATION_DEFAULT_TOTAL_ITEMS);
    expect(itemsPerPage.value).toEqual(USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE);
  });

  it("should call the callback when current page value changes", () => {
    function callback(newPage) {
      expect(newPage).toEqual(5);
    }

    const { currentPage } = usePagination({
      onChangePage: callback,
    });

    expect(currentPage.value).toEqual(USE_PAGINATION_DEFAULT_CURRENT_PAGE);

    currentPage.value = 5;
  });
});
