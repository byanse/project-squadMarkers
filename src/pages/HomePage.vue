<template>
  <q-layout>
    <q-header>
      <q-item class="bg-image q-pa-none">
        <div class="q-px-md q-pt-xl q-pb-lg col-grow">
          <h2 class="q-mb-lg text-white">
            What pokemon are you <br />
            looking for?
          </h2>

          <div class="row">
            <div class="col-grow">
              <q-input
                v-model="searchName"
                filled
                bg-color="neutral"
                debounce="1000"
                placeholder="Search pokemon"
              >
                <template v-slot:append>
                  <q-icon name="search" color="neutral-white" />
                </template>
              </q-input>
            </div>

            <q-btn
              flat
              round
              icon="tune"
              class="q-ml-lg"
              color="neutral-white"
              @click="navigateToFiltersPage"
            />
          </div>
        </div>
      </q-item>
    </q-header>

    <q-page-container>
      <q-page class="flex justify-between column">
        <ErrorComponent
          v-if="error && !loading"
          :title="errorTitle"
          :subtitle="errorSubtitle"
          :retryableAction="reset"
        />

        <div class="row q-pa-md" v-if="!error && !loading">
          <q-card
            class="col-12 q-mb-md q-pa-sm"
            flat
            v-if="pokemonStore.filters.currentFilters.length > 0"
          >
            <p class="text-subtitle2">
              {{ pokemonStore.pagination.totalItems }} resultados
            </p>
          </q-card>

          <div
            class="col-12 q-mb-md"
            v-for="(pokemon, index) in pokemons"
            :key="index"
          >
            <PokemonCard
              :imgUrl="pokemon.sprites.other['official-artwork'].front_default"
              :name="pokemon.name"
              :number="pokemon.id"
              :moves="pokemon.moves.length"
              :experience="pokemon.base_experience"
              :types="pokemon.types"
            />
          </div>
        </div>

        <PaginatorComponent
          v-if="!error && !loading && pokemonStore.pagination.totalPages > 0"
          v-model="pokemonStore.pagination.currentPage"
          :total-pages="pokemonStore.pagination.totalPages"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { watch, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { usePokemonStore } from "stores/pokemon";
import PokemonCard from "components/PokemonCard.vue";
import PaginatorComponent from "components/PaginatorComponent.vue";
import ErrorComponent from "components/ErrorComponent.vue";

const pokemonStore = usePokemonStore();
const router = useRouter();
const route = useRoute();
const { query } = route;
const { pokemons, loading, error } = storeToRefs(pokemonStore);

onMounted(() => {
  const searchTerm = query.q;

  pokemonStore.initialize({ filterName: searchTerm });
});

const navigateToFiltersPage = () => {
  router.push({ name: "FiltersPage" });
};

const reset = async () => {
  await pokemonStore.reset();
};

const searchName = ref(query.q);
const errorTitle = computed(() =>
  searchName.value
    ? `No pudimos encontrar el pokemon <b>${searchName.value}</b> :(`
    : "Lo sentimos!"
);
const errorSubtitle = computed(() =>
  searchName.value
    ? `Asegurate de estar escribiendo bien el nombre!`
    : "Ha ocurrido un error, por favor recarga la página."
);

watch(searchName, (currentValue, oldValue) => {
  if (currentValue != oldValue) {
    if (currentValue) {
      pokemonStore.filterByName(currentValue);
    } else {
      reset();
    }
  }
});
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url(https://d17mh033okktwq.cloudfront.net/uploads/59a58d7f-eb28-4ee9-999e-b96f534beb50/original/prueba.);
  background-repeat: no-repeat;
  background-position: right;
}
</style>
