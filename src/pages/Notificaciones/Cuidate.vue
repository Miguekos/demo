<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner
      v-for="(items, index) in info"
      :key="index"
      dense
      class="bg-red text-white"
    >
      {{ items.name }} <span class="text-bold">Registro un CUIDATE</span>
      <template v-slot:action>
        <q-btn flat color="white" @click="Descartar(items)" label="Descartar" />
        <q-btn flat color="white" label="Llamar" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "Cuidate",
  methods: {
    Descartar(val) {
      this.$emit("click", val);
    }
  }
};
</script>

<style scoped></style>
