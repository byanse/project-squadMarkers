import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export function usePagination({
  currentPage: initialPage,
  totalItems: total,
  itemsPerPage: limit,
  onChangePage,
} = {}) {
  const router = useRouter();
  const route = useRoute();
  const {
    query: { page },
  } = route;
  const currentPage = ref(initialPage || (page ? +page : undefined) || 1);
  const totalItems = ref(total || 0);
  const itemsPerPage = ref(limit || 5);

  function reset() {
    currentPage.value = 1;
    totalItems.value = 0;
    itemsPerPage.value = 5;
  }

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
  );

  watch(currentPage, (currentValue) => {
    router.replace({ query: { page: currentValue } });

    if (onChangePage) onChangePage(currentValue);
  });

  return { currentPage, totalPages, totalItems, itemsPerPage, reset };
}

export default usePagination;
