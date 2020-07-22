<template>
  <div class="q-pa-md q-gutter-sm">
    <!--    {{ info }}-->
    <q-banner
      v-for="(items, index) in info"
      :key="index"
      dense
      class="text-white"
      v-bind:class="`bg-${items.color}`"
      transition-hide="flip-left"
    >
      Hola: {{ items.de.name }} te comenta que:
      <span class="text-bold">{{ items.comentario }}</span>
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          :loading="loadboton"
          @click="Descartar(items)"
          label="Descartar"
        />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["info"],
  name: "Cuidate",
  data() {
    return {
      loadboton: false
    };
  },
  methods: {
    ...mapActions("utils", ["updateAlertas", "callAlertas"]),
    async Descartar(val) {
      this.loadboton = true;
      console.log(val.dni);
      await this.updateAlertas(val._id.$oid);
      await this.callAlertas(val.dni);
      this.loadboton = false;
    }
  }
};
</script>

<style scoped></style>
