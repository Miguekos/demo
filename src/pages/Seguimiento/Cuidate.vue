<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <div class="flex flex-center">
      <q-img
        color="grey"
        style="height: 170px; max-width: 180px;"
        src="~assets/17897-temperature-meter.gif"
      />
    </div>
    <span>asd</span>
    <div class="full-width">
      <Listas />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Cuidate",
  components: {
    Listas: () => import("components/RegistrarCuidate")
  }
};
</script>

<style scoped></style>
