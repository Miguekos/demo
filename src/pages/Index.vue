<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <!-- <div>
      <img alt="Quasar logo" src="~assets/sad.svg" />
    </div> -->
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
