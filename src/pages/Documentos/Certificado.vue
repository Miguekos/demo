<template>
  <div class="q-pa-md">
    <q-list>
      <q-item align="center">
        <q-item-section>
          <q-uploader
            label="Sube el certificado"
            color="green-5"
            :factory="factoryFn"
          />
        </q-item-section>
      </q-item>
      <q-item align="center">
        <q-item-section v-if="certificadoCheck">
          <embed
            :src="`https://api.apps.com.pe/fileserver/uploads/${certificado}`"
            type="application/pdf"
            width="100%"
            height="600px"
          />

          <!--          <q-uploader :factory="factoryFn" class="full-width"/>-->
        </q-item-section>
      </q-item>
    </q-list>
    <div></div>
  </div>
</template>

<script>
import { axiosInstanceImagen } from "boot/axios";
import { LocalStorage } from "quasar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Certificado",
  computed: {
    ...mapGetters("users", ["getUserOne"])
  },
  data() {
    return {
      certificadoCheck: false,
      certificado: null,
      userData: null,
      idUser: null
    };
  },
  methods: {
    ...mapActions("users", ["callUserOne", "updateCertificado"]),
    async updateFoto(arg) {
      // console.log("NOmbre de la imagen", arg);
      this.certificado = arg;
      let idUser = LocalStorage.getAll().idUser;
      let jsonUpdate = {
        certificado: arg,
        _id: this.idUser
      };
      // console.log(jsonUpdate);
      this.updateCertificado(jsonUpdate)
        .then(async resp => {
          // console.log("antes de actualizar");
          // this.alert = false;
          this.$q.notify({
            message: "¡Se actualizo el documento!",
            // progress: true,
            // icon: "favorite_border",
            icon: "insert_emoticon",
            color: "white",
            textColor: "green-5",
            position: "top"
          });
          await this.callUserOne(this.idUser);
          // this.callUserOne(this.$route.params.id);
          // await this.ordenarCampos();
          // if (idUser == this.$route.params.id) {
          //   LocalStorage.remove("UserDetalle");
          //   setTimeout(() => {
          //     LocalStorage.set("UserDetalle", this.getUserOne);
          //   }, 1000);
          // } else {
          //   console.log("Se actualizo");
          // }
        })
        .catch(err => {
          // console.log(err);
          this.$q.notify({
            message: "¡Oh oh, no pudimos actualizar",
            position: "top",
            color: "red-5"
          });
        });
    },
    factoryFn(file) {
      // console.log(file);
      let total;
      var formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", file[0]);
      // console.log(formData);
      axiosInstanceImagen
        .post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          // console.log(resp.data);
          total = resp.data;
          this.updateFoto(total);
        })
        .catch(err => {
          // console.log(err);
          total = err;
        });
      return total;
    }
  },
  async created() {
    this.$q.loading.show();
    this.idUser = LocalStorage.getAll().idUser;
    console.log(this.idUser);
    await this.callUserOne(this.idUser);
    this.userData = await this.getUserOne;
    // console.log("this.userData");
    // console.log(this.userData.certificado);
    // console.log(this.userData);
    this.certificado = (await this.userData.certificado)
      ? this.userData.certificado
      : "BrochueCuidAPPtebyPandoraTI.pdf";
    await setTimeout(async () => {
      console.log("luego de 2 segundos");
      this.certificadoCheck = true;
      this.$q.loading.hide();
    }, 2000);
  }
};
</script>

<style scoped></style>
