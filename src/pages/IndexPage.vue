<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <q-item>
      <Block :title="title" />
    </q-item>
    <q-item>
      <Buttons :label="label" />
    </q-item>
    <q-item>
      <Banner />
    </q-item>
    <q-item>
      <PokeBanner />
    </q-item>
    <q-item>
      <Card />
    </q-item>
    <q-item>
      <TabPanel />
    </q-item>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Block from "src/components/Block.vue";
import Buttons from "src/components/Buttons.vue";
import Banner from "src/components/Banner.vue";
import PokeBanner from "src/components/PokeBanner.vue";
import Card from "src/components/Card.vue";
import TabPanel from "src/components/TabPanel.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    Block,
    Buttons,
    Banner,
    PokeBanner,
    Card,
    TabPanel,
  },

  setup() {
    return {
      title: "Sludge boom",
      label: "Filter",
    };
  },
});
</script>
