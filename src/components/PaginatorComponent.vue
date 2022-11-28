<template>
  <div>
    <q-pagination
      class="flex-center bg-white q-py-sm"
      v-model="currentPage"
      :max="totalPages"
      :max-pages="5"
      direction-links
      :boundary-links="false"
      :ellipses="false"
      @update:model-value="setCurrentPage"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    required: true,
    type: Number,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
});

const currentPage = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const setCurrentPage = (currentPage) => {
  emit("update:modelValue", currentPage);
};
</script>

<style></style>
