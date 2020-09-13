<template>
  <div>
    <q-file
      @input="factoryFn()"
      color="red-12"
      v-model="nameFile"
      label="Archivo"
      accept=".pdf, .jpg, image/*"
      @rejected="onRejected"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </div>
</template>

<script>
import { axiosInstanceImagen } from "boot/axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      uploadProgress: [],
      uploading: null
    };
  },

  computed: {
    ...mapState("doc", ["files"]),
    nameFile: {
      get() {
        return this.files;
      },
      set(val) {
        this.addFiles(val);
      }
    }
  },

  methods: {
    ...mapActions("doc", ["addFiles"]),
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: "negative",
        message: `El tipo de archivo no es soportado`
      });
    },
    factoryFn() {
      this.$store.commit("doc/setFileload", true);
      console.log(this.files);
      let total;
      var formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", this.files);
      // console.log(formData);
      axiosInstanceImagen
        .post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          console.log(resp.data);
          total = resp.data;
          this.$store.commit("doc/setFile", resp.data);
          this.$store.commit("doc/setFileload", false);
        })
        .catch(err => {
          // console.log(err);
          total = err;
        });
      return total;
    }
  },

  beforeDestroy() {}
};
</script>

<style scoped></style>
