<template>
  <div style="width: 100%; height: 500px">
    <q-pdfviewer v-model="visible" :src="url" type="html5" />
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "pdfviewer",
  computed: {
    url() {
      const comunicados = [
        "https://demo.apps.com.pe/img/4565-heartbeat-medical.f117afb8.gif",
        "https://api.apps.com.pe/fileserver/uploads/GRISEL_AGUILERA.pdf"
      ];
      //
      return `https://api.apps.com.pe/fileserver/uploads/${this.info[0].docs}`;
    }
  },
  data() {
    return {
      slide: "style",
      visible: true
    };
  }
};
</script>

<style scoped></style>
