<template>
  <div v-if="initialized" id="app-router-link">
    <router-view class="bg-neutral" />
  </div>
  <div v-if="error" id="app-error">
    <ErrorComponent
      title="¡Lo sentimos!"
      subtitle="Ha ocurrido un error inesperado... Por favor, intenta de nuevo."
      :retryableAction="initialize"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { usePokemons } from "composables/usePokemons";
import ErrorComponent from "components/ErrorComponent.vue";

const $q = useQuasar();
const { initialize: initializePokemons } = usePokemons();
const initialized = ref(false);
const error = ref(false);

const props = defineProps({
  initialPromise: Function,
});

const initialize = async () => {
  $q.loading.show();
  initialized.value = false;
  error.value = false;

  try {
    // this if/else statement is for tests purposes only
    if (props.initialPromise) {
      await props.initialPromise();
    } else {
      await initializePokemons();
    }

    initialized.value = true;
  } catch (err) {
    error.value = true;
  } finally {
    $q.loading.hide();
  }
};

initialize();
</script>
