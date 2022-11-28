import { ref } from "vue";
import { useQuasar } from "quasar";
import { defineStore } from "pinia";
import { usePagination } from "composables/usePagination";
import { usePokemons } from "composables/usePokemons";
import useFilters from "composables/useFilters";

export const usePokemonStore = defineStore("pokemon", () => {
  const $q = useQuasar();
  const { fetchByName, fetchList } = usePokemons();
  const initialized = ref(false);
  const loading = ref(false);
  const error = ref(false);
  const pokemons = ref([]);
  const pokemon = ref(null);
  const filterName = ref(null);

  const makeAsyncRequest = async (request) => {
    $q.loading.show();
    loading.value = true;
    error.value = false;

    try {
      return await request;
    } catch (err) {
      error.value = true;
      throw err;
    } finally {
      loading.value = false;
      $q.loading.hide();
    }
  };

  const initialize = async ({ filterName } = {}) => {
    if (!initialized.value) {
      if (filterName) {
        await filterByName(filterName);
      } else {
        await getPage(pagination.currentPage.value);
      }

      initialized.value = true;
    }
  };

  const getPage = async (page = 1) => {
    pokemons.value = [];

    const limit = pagination.itemsPerPage.value;
    const offset = (page - 1) * limit;

    const pageData = await makeAsyncRequest(
      fetchList(filters.currentFilters.value, limit, offset)
    );

    pagination.totalItems.value = pageData.count;
    pokemons.value = pageData.results;
  };

  const filterByName = async (name) => {
    if (!name) return;

    filterName.value = name.trim().toLowerCase();

    filters.reset();
    pagination.reset();
    pokemons.value = [
      await makeAsyncRequest(fetchByName(name.trim().toLowerCase())),
    ];
  };

  const getByName = async (name) => {
    if (!name) return;

    pokemon.value = await makeAsyncRequest(
      fetchByName(name.trim().toLowerCase())
    );
  };

  const reset = () => {
    filters.reset();
    pagination.reset();
    initialized.value = false;
    filterName.value = null;
    initialize();
  };

  const handleFiltersChange = () => {
    pagination.reset();
    initialized.value = false;
    filterName.value = null;
    getPage();
  };

  const pagination = usePagination({ onChangePage: getPage });
  const filters = useFilters({
    onChangeFilters: handleFiltersChange,
  });

  return {
    pokemons,
    pagination,
    filters,
    pokemon,
    loading,
    error,
    initialize,
    getPage,
    filterByName,
    getByName,
    reset,
  };
});
