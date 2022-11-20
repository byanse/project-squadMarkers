<template>
  <div class="q-pa-md">
    <div style="max-width: 600px">
      <q-tabs v-model="tab" align="left" narrow-indicator class="q-mb-lg">
        <q-tab class="text-primary" name="About" label="About" />
        <q-tab class="text-primary" name="Moves" label="Moves" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-purple text-white text-center"
        >
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TabPanel",
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>
