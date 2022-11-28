<template>
  <q-btn flat round dense :icon="icon" color="neutral-black" @click="goBack" />
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps({
  icon: {
    type: String,
    default: "arrow_back",
  },
});

const goBack = () => {
  router.back();
};
</script>
