<template>
  <div id="q-app" v-bind:style="bgc">
    <router-view />
    <!--    <input type="text" v-on:input="bgc.backgroundColor = $event.target.value" />-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { LocalStorage } from "quasar";
export default {
  name: "App",
  data() {
    return {
      description:
        "Type any colour name, rgb, hex or hsl in the input below and see what happens!",
      bgc: {
        backgroundColor: "#ffffff"
      }
    };
  },
  methods: {
    ...mapActions("utils", [
      "notificacionesConSintomas",
      "notificacionesCuidate",
      "callAlertas"
    ])
  },
  async created() {
    console.log("App - 4");
    this.$q.addressbarColor.set("#FFFFFF");
    console.log("CuidAPPte v2.1");
    if (this.$q.localStorage.getAll().role == 3) {
      // await this.notificacionesConSintomas();
      // await this.notificacionesCuidate();
    }
    // await this.callClienteReport();
    // #004d40
  }
};
</script>
