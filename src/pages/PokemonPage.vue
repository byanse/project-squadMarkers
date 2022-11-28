<template>
  <q-layout>
    <q-header>
      <div class="bg-neutral" v-if="!error && !loading && pokemon">
        <q-toolbar>
          <BtnBackButton />
        </q-toolbar>
        <q-toolbar class="column">
          <q-toolbar-title class="text-center text-neutral-black"
            ><h1 class="text-capitalize">
              {{ pokemon.name }}
              <span class="text-subtitle2"> #{{ pokemon.id }} </span>
            </h1>
          </q-toolbar-title>

          <div class="text-center">
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              width="140"
              height="140"
              :alt="pokemon.name"
            />
          </div>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container class="bg-white">
      <q-page>
        <div class="flex column flex-center" v-if="error && !loading">
          <h2 class="text-red text-center">
            No pudimos encontrar el pokemon <b>{{ searchName }}</b> :(
            <br />
            Asegurate de estar escribiendo bien el nombre!
          </h2>
          <q-btn
            round
            color="white"
            text-color="red"
            icon="replay"
            @click="reset"
          />
        </div>

        <div v-if="!error && !loading && pokemon">
          <q-tabs
            v-model="currentTab"
            align="left"
            narrow-indicator
            class="q-mb-lg"
            active-color="primary"
          >
            <q-tab no-caps name="about" label="About" />
            <q-tab no-caps name="moves" label="Moves" />
          </q-tabs>

          <q-tab-panels
            v-model="currentTab"
            animated
            transition-prev="scale"
            transition-next="scale"
          >
            <q-tab-panel name="about">
              <div class="row">
                <div>
                  <p class="text-body1 text-neutral-dark">Species:</p>
                  <p class="text-body1 text-neutral-dark">Height:</p>
                  <p class="text-body1 text-neutral-dark">Weight:</p>
                  <p class="text-body1 text-neutral-dark">Abilities:</p>
                  <p class="text-body1 text-neutral-dark">Experience:</p>
                  <p class="text-body1 text-neutral-dark">Type:</p>
                </div>
                <div class="col-grow q-ml-sm">
                  <p class="text-body2">{{ pokemon.species.name }}</p>
                  <p class="text-body2">
                    {{ pokemon.height }}dm ({{ heightCm }}cm)
                  </p>
                  <p class="text-body2">
                    {{ weigthKg }}kg ({{ weigthPounds }}lbs)
                  </p>
                  <div>
                    <span
                      v-for="(ability, index) in pokemon.abilities"
                      :key="index"
                    >
                      <span
                        v-if="!ability.is_hidden"
                        class="q-pa-xs text-white q-mr-xs"
                        :class="
                          index % 2 === 0 ? 'bg-green-14' : 'bg-deep-purple-14'
                        "
                      >
                        {{ ability.ability.name }}
                      </span>
                    </span>
                  </div>
                  <p class="text-body2">{{ pokemon.base_experience }}</p>
                  <div>
                    <q-chip
                      size="14px"
                      class="text-body3 bg-neutral text-capitalize"
                      v-for="(type, index) in pokemon.types"
                      :key="index"
                    >
                      <img
                        :src="`/src/assets/pokemon-types/${type.type.name}.svg`"
                        :alt="type.type.name + ' type'"
                      />

                      <span class="q-ml-sm">
                        {{ type.type.name }}
                      </span>
                    </q-chip>
                  </div>
                </div>
              </div>
              <h2>Base stats</h2>
              <HorizontalBarChart
                :labels="charLabels"
                :datasets="chartDataset"
              />
            </q-tab-panel>

            <q-tab-panel name="moves">
              <h2>{{ pokemon.moves.length }} moves</h2>
              <div class="row">
                <div
                  class="col-4 q-py-sm"
                  v-for="(move, index) in pokemon.moves"
                  :key="index"
                >
                  <MoveBlock :title="move.move.name" :type="index % 2" />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "stores/pokemon";
import { useRoute } from "vue-router";
import BtnBackButton from "components/BtnBackButton.vue";
import MoveBlock from "components/MoveBlock.vue";
import HorizontalBarChart from "components/HorizontalBarChart.vue";
import {
  parseHectogramsToKgs,
  parseHectogramsToPounds,
  parseDecimetresToCentimeters,
} from "utils";

const pokemonStore = usePokemonStore();
const route = useRoute();
const {
  params: { pokemonName },
} = route;

const { pokemon, error, loading } = storeToRefs(pokemonStore);

const currentTab = ref("about");
const chartDataset = ref([]);
const charLabels = [
  "Speed",
  "Sp Defense",
  "Sp Attack",
  "Defense",
  "Attack",
  "HP",
];

pokemonStore.getByName(pokemonName);

pokemonStore.$subscribe((_, state) => {
  if (state.pokemon) {
    chartDataset.value = [
      {
        backgroundColor: "#072ac8",
        data: [
          state.pokemon.stats.find((e) => e.stat.name === "speed")?.base_stat,
          state.pokemon.stats.find((e) => e.stat.name === "special-defense")
            ?.base_stat,
          state.pokemon.stats.find((e) => e.stat.name === "special-attack")
            ?.base_stat,
          state.pokemon.stats.find((e) => e.stat.name === "defense")?.base_stat,
          state.pokemon.stats.find((e) => e.stat.name === "attack")?.base_stat,
          state.pokemon.stats.find((e) => e.stat.name === "hp")?.base_stat,
        ],
      },
    ];
  }
});

const heightCm = computed(() =>
  parseDecimetresToCentimeters(pokemon?.value.height)
);

const weigthKg = computed(() => parseHectogramsToKgs(pokemon?.value.weight));

const weigthPounds = computed(() =>
  parseHectogramsToPounds(pokemon?.value.weight)
);
</script>

<style lang="scss" scoped></style>
