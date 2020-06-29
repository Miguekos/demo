<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <div v-if="role === 1" id="corazon" class="flex flex-center">
      <q-img
        color="grey"
        style="height: 170px; max-width: 180px;"
        alt="Roseline logo"
        src="~assets/lococorazon.png"
      />
    </div>
    <div class="full-width">
      <Listas />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Seguimiento",
  data() {
    return {
      role: 2
    };
  },
  components: {
    Listas: () => import("./Seguimiento")
  }
};
</script>

<style scoped></style>
