<template>
  <div class="flex flex-center column">
    <h2 class="text-red text-center q-my-sm" v-html="title"></h2>
    <p
      v-if="subtitle"
      class="text-center text-subtitle2 q-mb-lg"
      v-html="subtitle"
    ></p>
    <q-btn
      v-if="retryableAction"
      round
      color="white"
      text-color="red"
      icon="replay"
      @click="retryableAction"
    />
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  retryableAction: Function,
});
</script>
<style lang=""></style>
