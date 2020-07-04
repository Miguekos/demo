<template>
  <q-page>
    <q-tabs v-model="tab" dense align="justify">
      <q-tab class="text-red-5" name="seguimiento" label="Seguimiento" />
      <q-tab class="text-green-5" name="dealta" label="De Alta" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="seguimiento">
        <Seguimiento />
      </q-tab-panel>

      <q-tab-panel name="dealta">
        <DeAlta />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "seguimiento"
    };
  },
  components: {
    Seguimiento: () => import("./Seguimiento"),
    DeAlta: () => import("./DeAlta")
  }
};
</script>

<style scoped>
.q-tab-panel {
  padding: 10px 0px 0px 0px;
}
</style>
