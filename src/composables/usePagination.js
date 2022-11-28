import { ref, computed, watch } from "vue";

export const USE_PAGINATION_DEFAULT_CURRENT_PAGE = 1;
export const USE_PAGINATION_DEFAULT_TOTAL_ITEMS = 0;
export const USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE = 5;

/**
 * @param {Object} props - The function props
 * @param {Function} props.onChangePage - The callback to be called when current page change
 * @param {number} props.currentPage - The initial page
 * @param {number} props.totalItems - The total count of items
 * @param {number} props.itemsPerPage - The count of items to be shown per page
 */
export function usePagination({
  currentPage: initialPage,
  totalItems: total,
  itemsPerPage: limit,
  onChangePage,
} = {}) {
  const currentPage = ref(initialPage || USE_PAGINATION_DEFAULT_CURRENT_PAGE);
  const totalItems = ref(total || USE_PAGINATION_DEFAULT_TOTAL_ITEMS);
  const itemsPerPage = ref(limit || USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE);

  function reset() {
    currentPage.value = USE_PAGINATION_DEFAULT_CURRENT_PAGE;
    totalItems.value = USE_PAGINATION_DEFAULT_TOTAL_ITEMS;
    itemsPerPage.value = USE_PAGINATION_DEFAULT_ITEMS_PER_PAGE;
  }

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
  );

  watch(currentPage, (currentValue) => {
    onChangePage?.(currentValue);
  });

  return { currentPage, totalPages, totalItems, itemsPerPage, reset };
}

export default usePagination;
