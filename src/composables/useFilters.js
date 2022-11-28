import { ref } from "vue";

/**
 * @param {Object} props - The function props
 * @param {Function} props.onChangeFilters - The callback to be called when current filters change
 * @param {Object[]} props.currentFilters - The initial filters
 * @param {string} props.currentFilters[].key - The field's key.
 * @param props.currentFilters[].value - The field's value to be matched.
 */
export function useFilters({
  currentFilters: initFilters,
  onChangeFilters,
} = {}) {
  const currentFilters = ref(initFilters || []);

  function findFilters(key) {
    return currentFilters.value.filter((filter) => filter.key === key);
  }

  function setFilters(filters) {
    currentFilters.value = filters;
    onChangeFilters?.(filters);
  }

  function reset() {
    setFilters([]);
  }

  return { currentFilters, reset, setFilters, findFilters };
}

export default useFilters;
