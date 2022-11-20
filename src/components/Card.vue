<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="bg-neutral-white">
        <img
          src="https://d17mh033okktwq.cloudfront.net/uploads/d6537465-3395-45be-99e8-9be670d18ba6/original/prueba1."
        />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-h2">Bulbasaur</div>
      <div class="text-body3"># 001</div>
    </q-card-section>

    <q-card-section horizontal align="left" class="q-mb-md">
      <div class="text-body3 q-pr-sm q-pl-md">
        Move <span class="text-body4">83</span>
      </div>
      <div class="text-body3">
        Experience <span class="text-body4">64</span>
      </div>
    </q-card-section>

    <q-card-actions horizontal align="left" class="q-pt-none">
      <q-chip size="18px" icon="grass" class="text-body3"> Grass </q-chip>
      <q-chip size="18px" icon="bug_report" class="text-body3"> Bug </q-chip>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
