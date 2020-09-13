<template>
  <div class="row q-pa-xs">
    <div class="col-xs-12 col-md-6">
      <Cargo />
    </div>
    <div class="col-xs-12 col-md-6">
      <Area />
    </div>
  </div>
</template>

<script>
import Cargo from "pages/Mantenimiento/Cargo";
import Area from "pages/Mantenimiento/Area";
export default {
  name: "IndexCargo",
  components: {
    Area: () => import("./Area"),
    Cargo: () => import("./Cargo")
  }
};
</script>

<style scoped></style>
