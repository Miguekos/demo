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
        <q-item-section>
          <embed
            src="https://api.apps.com.pe/fileserver/uploads/1.pdf"
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
export default {
  name: "Certificado",
  data() {
    return {
      pdf: null
    };
  },
  methods: {
    async updateFoto(arg) {
      // console.log("NOmbre de la imagen", arg);
      this.usersDetalle.certificado = arg;
      let idUser = LocalStorage.getAll().idUser;
      let jsonUpdate = {
        certificado: arg,
        _id: this.$route.params.id
      };
      // console.log(jsonUpdate);
      this.updateImage(jsonUpdate)
        .then(async resp => {
          // console.log("antes de actualizar");
          // this.alert = false;
          this.$q.notify({
            message: "¡Se actualizo tu foto de perfil!",
            position: "top",
            color: "green-5"
          });
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
  created() {
    let idUser = LocalStorage.getAll().idUser;
    console.log(idUser);
  }
};
</script>

<style scoped></style>
