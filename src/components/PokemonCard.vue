<template>
  <q-card class="my-card">
    <q-card-section class="q-pa-none">
      <div class="bg-neutral text-center">
        <img :src="imgUrl" width="170" height="170" />
      </div>
    </q-card-section>

    <q-card-section>
      <h2 class="text-capitalize">
        {{ name }}
      </h2>
      <div class="text-body3"># {{ number }}</div>
    </q-card-section>

    <q-card-section horizontal align="left" class="q-mb-md">
      <div class="text-body3 q-pr-sm q-pl-md">
        Move <span class="text-body4">{{ moves }}</span>
      </div>
      <div class="text-body3">
        Experience <span class="text-body4">{{ experience }}</span>
      </div>
    </q-card-section>

    <q-card-actions horizontal align="left" class="q-pt-none">
      <q-chip
        size="14px"
        class="text-body3 bg-neutral text-capitalize"
        v-for="(type, index) in types"
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
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PokemonCard",
  props: {
    imgUrl: String,
    name: String,
    number: Number,
    moves: Number,
    experience: Number,
    types: [Object],
  },
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
