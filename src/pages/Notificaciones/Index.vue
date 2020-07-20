<template>
  <div class="q-pa-md q-gutter-sm">
    <ConSintomas :info="getNotiCS" />
    <Cuidate :info="getNotiCuidate" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapGetters("utils", ["getNotiCS", "getNotiCuidate"])
  },
  components: {
    ConSintomas: () => import("./ConSintomas"),
    Cuidate: () => import("./Cuidate")
  },
  methods: {
    ...mapActions("utils", [
      "notificacionesConSintomas",
      "notificacionesCuidate",
        "delNotiConSintomas",
        "delNotiCuidate"
    ])
  },
  async created() {
    if (this.$q.localStorage.getAll().role == 3) {
      // await this.notificacionesConSintomas();
      // await this.notificacionesCuidate();
    }
  }
};
</script>

<style scoped></style>
