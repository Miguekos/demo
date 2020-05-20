<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <div class="flex flex-center">
      <img alt="logo" src="~assets/logoEmpresa.jpeg" />
    </div>
    <div class="full-width">
      <Listas />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    Listas: () => import("components/Listas")
  }
};
</script>
