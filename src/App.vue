<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    // ...mapActions("client", ["callClienteReport"])
  },
  async created() {
    // console.log("App");
    this.$q.addressbarColor.set("#FFFFFF");
    console.log("CuidAPPte CAYMAN");
    // await this.callClienteReport();
    // #004d40
  }
};
</script>
