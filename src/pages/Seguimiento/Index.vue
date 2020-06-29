<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <div id="corazon" class="flex flex-center">
      <q-img
        color="grey"
        style="height: 170px; max-width: 180px;"
        alt="Roseline logo"
        src="~assets/lococorazon.png"
      />
    </div>
    <div class="full-width">
      <Listas/>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: "Seguimiento",
        components: {
            Listas: () => import("components/RegistrarSeguimiento")
        }
    }
</script>

<style scoped>

</style>
