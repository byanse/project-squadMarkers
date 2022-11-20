<template>
  <q-item>
    <q-btn
      no-caps
      color="primary"
      label="Filter"
      padding="sm xl"
      :disable="false"
    />
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: "Buttons",
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
