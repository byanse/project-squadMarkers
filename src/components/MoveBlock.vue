<template>
  <q-card
    class="my-card text-white q-mx-sm"
    :class="type === 1 ? 'bg-green-14' : 'bg-deep-purple-14'"
  >
    <q-card-section class="text-center">
      <img
        :alt="title"
        :src="
          type === 1
            ? 'https://d17mh033okktwq.cloudfront.net/uploads/f239ef30-1d9c-46bf-a415-848b1510f6a1/original/prueba4.'
            : 'https://d17mh033okktwq.cloudfront.net/uploads/7b1af7da-15f7-40ff-a872-c21b313b4357/original/prueba3.'
        "
      />
      <div class="text-overline">{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoveBlock",
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="sass" scoped></style>
