<template>
  <q-layout>
    <q-header>
      <q-toolbar class="bg-neutral">
        <BtnBackButton icon="close" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-px-lg q-pb-lg flex justify-between column">
        <div>
          <h1 class="q-mb-lg">Filter pokemon list</h1>

          <q-select
            class="q-mb-lg"
            filled
            v-model="movesFilter"
            :options="pokemonMovesOptions"
            label="Select movement number"
          />
          <q-select
            class="q-mb-lg"
            filled
            v-model="baseExperienceFilter"
            :options="pokemonExperienceOptions"
            label="Select experience level"
          />
          <q-select
            filled
            v-model="pokemonTypesFilter"
            multiple
            :options="uniquePokemonTypes"
            use-chips
            label="Pokemon type"
          />
        </div>

        <div class="flex row no-wrap">
          <q-btn
            unelevated
            color="red-2"
            class="full-width text-black"
            label="Cancel"
            @click="clearFilters"
          />
          <div class="q-px-sm"></div>
          <q-btn
            unelevated
            color="primary"
            class="full-width"
            label="Filter"
            @click="applyFilters"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePokemons } from "composables/usePokemons";
import { usePokemonStore } from "stores/pokemon";
import BtnBackButton from "components/BtnBackButton.vue";

const router = useRouter();
const { uniquePokemonTypes, pokemonMovesOptions, pokemonExperienceOptions } =
  usePokemons();
const pokemonStore = usePokemonStore();
const savedMovesFilter = pokemonStore.filters.findFilters("moves")?.[0]?.value;
const savedBaseExperienceFilter =
  pokemonStore.filters.findFilters("base_experience")?.[0]?.value;
const savedPokemonTypesFilter = pokemonStore.filters
  .findFilters("types")
  ?.map((e) => e.value);
const movesFilter = ref(savedMovesFilter ?? null);
const baseExperienceFilter = ref(savedBaseExperienceFilter ?? null);
const pokemonTypesFilter = ref(savedPokemonTypesFilter ?? []);

const clearFilters = () => {
  movesFilter.value = null;
  baseExperienceFilter.value = null;
  pokemonTypesFilter.value = [];
  applyFilters();
};

const applyFilters = () => {
  const filters = [];

  if (movesFilter.value !== null) {
    filters.push({ key: "moves", value: movesFilter.value });
  }

  if (baseExperienceFilter.value !== null) {
    filters.push({ key: "base_experience", value: baseExperienceFilter.value });
  }

  for (const typeName of pokemonTypesFilter.value) {
    filters.push({ key: "types", value: typeName });
  }

  pokemonStore.filters.setFilters(filters);

  router.back();
};
</script>
<style></style>
