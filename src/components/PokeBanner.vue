<template>
  <q-item class="bg-neutral-white">
    <q-icon name="arrow_back" style="font-size: 2em" />
    <div class="q-px-xl q-pt-xl q-pb-md">
      <h2 class="q-mb-xs">Bulbasaur #01</h2>

      <div class="row">
        <div class="col-grow">
          <img
            src="https://d17mh033okktwq.cloudfront.net/uploads/d6537465-3395-45be-99e8-9be670d18ba6/original/prueba1."
            alt="poke"
          />
        </div>
      </div>
    </div>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PokeBanner",
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
