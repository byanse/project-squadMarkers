<template>
  <q-card class="my-card bg-green-14 text-white q-mx-sm">
    <q-card-section class="text-center">
      <img
        alt=""
        src="https://d17mh033okktwq.cloudfront.net/uploads/f239ef30-1d9c-46bf-a415-848b1510f6a1/original/prueba4."
      />
      <div class="text-subtitle2">Seed bomb</div>
    </q-card-section>
  </q-card>

  <q-card class="my-card bg-deep-purple-14 text-white q-mx-sm">
    <q-card-section class="text-center">
      <img
        alt=""
        src="https://d17mh033okktwq.cloudfront.net/uploads/7b1af7da-15f7-40ff-a872-c21b313b4357/original/prueba3."
      />
      <div class="text-subtitle2">Sludge boom</div>
    </q-card-section>
  </q-card>

  <q-card class="my-card bg-green-14 text-white q-mx-sm">
    <q-card-section class="text-center">
      <img
        alt=""
        src="https://d17mh033okktwq.cloudfront.net/uploads/f239ef30-1d9c-46bf-a415-848b1510f6a1/original/prueba4."
      />
      <div class="text-subtitle2">Power whip</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Blocks",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="sass" scoped></style>
