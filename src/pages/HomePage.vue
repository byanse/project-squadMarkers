<template>
  <q-layout>
    <q-header>
      <q-item class="bg-image">
        <div class="q-px-md q-pt-xl q-pb-lg">
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
                debounce="500"
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
            />
          </div>
        </div>
      </q-item>
    </q-header>

    <q-page-container>
      <q-page>
        <div
          class="flex column flex-center"
          v-if="error && !loadingAll && !loadingOne"
        >
          <h2 class="text-red text-center">
            <span v-if="!searchName">
              Lo sentimos!
              <br />
              Ha ocurrido un error, por favor recarga la página.
            </span>
            <span v-else>
              No pudimos encontrar el pokemon <b>{{ searchName }}</b> :(
              <br />
              Asegurate de estar escribiendo bien el nombre!
            </span>
          </h2>
          <q-btn
            round
            color="white"
            text-color="red"
            icon="replay"
            @click="reset"
          />
        </div>

        <div v-if="!error && !loadingAll && !searchName">
          <div class="row">
            <div
              class="col-12 q-pa-md"
              v-for="(pokemon, index) in pokemons"
              :key="index"
            >
              <PokemonCard
                :imgUrl="
                  pokemon.sprites.other['official-artwork'].front_default
                "
                :name="pokemon.name"
                :number="pokemon.id"
                :moves="pokemon.moves.length"
                :experience="pokemon.base_experience"
                :types="pokemon.types"
              />
            </div>
          </div>

          <q-pagination
            class="flex-center bg-white q-py-sm"
            v-model="currentPage"
            :max="maxPages"
            :max-pages="5"
            direction-links
            :boundary-links="false"
            :ellipses="false"
            @update:model-value="changePage"
          />
        </div>

        <div
          v-if="!error && !loadingOne && searchName && pokemon"
          class="q-pa-md"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "stores/pokemon";
import { useRouter, useRoute } from "vue-router";
import PokemonCard from "components/PokemonCard.vue";

const pokemonStore = usePokemonStore();
const router = useRouter();
const route = useRoute();
const {
  query: { q: searchedName },
} = route;

const { pokemons, pokemon, error, loadingAll, loadingOne, maxPages } =
  storeToRefs(pokemonStore);
const { getPage, getByName } = pokemonStore;

const reset = async () => {
  router.replace({ path: "/", query: { q: "" } });
  searchName.value = "";
  currentPage.value = 1;
  pokemonStore.$reset();
  await getPage();
};

const changePage = (newPage) => {
  getPage(newPage);
};

const searchName = ref(searchedName);
const currentPage = ref(1);

if (searchedName) {
  getByName(searchedName);
}

watch(searchName, (currentValue, oldValue) => {
  if (currentValue != oldValue) {
    if (currentValue) {
      router.replace({ path: "/", query: { q: currentValue } });
      getByName(currentValue);
    } else {
      reset();
    }
  }
});
</script>

<style lang="scss" scoped></style>
