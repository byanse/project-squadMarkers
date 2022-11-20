<template>
  <q-item class="bg-image">
    <div class="q-px-md q-pt-xl q-pb-lg">
      <h2 class="q-mb-lg text-white">
        What pokemon are you <br />
        looking for?
      </h2>

      <div class="row">
        <div class="col-grow">
          <q-input
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
          to="/filters"
          class="q-ml-lg"
          color="neutral-white"
        />
      </div>
    </div>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Banner",
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
