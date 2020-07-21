<template>
  <div class="q-pa-md q-gutter-sm">
    <ConSintomas v-if="role == 3" @click="delCS" :info="getNotiCS" />
    <Cuidate v-if="role == 3" @click="delCuidate" :info="getNotiCuidate" />
    <Alertas v-if="role != 3" @click="delAlerta" :info="getAlertas" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      role: null
    };
  },
  computed: {
    ...mapGetters("utils", ["getNotiCS", "getNotiCuidate", "getAlertas"])
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
      "delNotiCuidate",
      "callAlertas"
    ]),
    delCS(val) {
      console.log(val);
    },
    delCuidate(val) {
      console.log(val);
    },
    delAlerta(val) {
      console.log(val);
    }
  },
  async created() {
    this.role = this.$q.localStorage.getAll().role;
    if (this.role == 3) {
      await this.notificacionesConSintomas();
      await this.notificacionesCuidate();
    }
    if (this.role != 3) {
      await this.callAlertas();
    }
  }
};
</script>

<style scoped></style>
