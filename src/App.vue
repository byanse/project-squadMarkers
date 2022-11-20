<template>
  <router-view class="bg-neutral" />
</template>

<script setup>
import { Plugins } from "@capacitor/core";
import { useQuasar } from "quasar";
import { usePokemonStore } from "stores/pokemon";

const { SplashScreen } = Plugins;

const $q = useQuasar();
const pokemonStore = usePokemonStore();

pokemonStore.$subscribe((_, state) => {
  if (state.loadingAll || state.loadingOne) {
    $q?.loading.show();
  } else {
    $q?.loading.hide();
    SplashScreen.hide();
  }
});

pokemonStore.getPage();
</script>
