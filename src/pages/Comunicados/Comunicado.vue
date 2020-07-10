<template>
  <div class="q-pa-md">
    <q-list v-if="$q.screen.lt.md">
      <q-item>
        <q-item-section>
          <q-input v-model="comentario" label="Comentario"></q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <UploadFile />
        </q-item-section>
        <q-item-section side>
          <q-btn
            :loading="fileload"
            color="green"
            rounded
            @click="uploadDoc()"
            label="guardar"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list v-else>
      <q-item>
        <q-item-section>
          <q-input v-model="comentario" label="Comentario"></q-input>
        </q-item-section>
        <q-item-section>
          <UploadFile />
        </q-item-section>
        <q-item-section side>
          <q-btn
            size="sm"
            :loading="fileload"
            color="green"
            rounded
            @click="uploadDoc()"
            label="guardar"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section>
          <TablaDocs v-if="getDocs" :info="getDocs" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { axiosInstanceImagen } from "boot/axios";
import { LocalStorage } from "quasar";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    UploadFile: () => import("components/uploadFileComuni"),
    TablaDocs: () => import("./TablaComuni")
  },
  computed: {
    ...mapGetters("users", ["getUserOne"]),
    ...mapGetters("comuni", ["getDocs", "getFile"]),
    ...mapState("comuni", ["fileload"])
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      getDocsVisible: false,
      infoUser: "",
      comentario: "",
      certificadoCheck: false,
      certificado: null,
      userData: null,
      idUser: null,
      columns: [
        {
          name: "documento",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.documento,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Comentario",
          field: row => row.comentario,
          format: val => `${val}`,
          sortable: true
        },
        { name: "fat", label: "Archivo", field: "fat", sortable: true },
        { name: "carbs", label: "Acciones", field: "carbs" }
      ]
    };
  },
  methods: {
    ...mapActions("comuni", ["addDoc", "callDocs", "addFiles"]),
    async uploadDoc() {
      // console.log("NOmbre de la imagen", arg);
      // let idUser = LocalStorage.getAll().idUser;
      let jsonUpdate = {
        comentario: this.comentario,
        docs: this.getFile,
        ...this.infoUser
      };
      // console.log(jsonUpdate);
      this.addDoc(jsonUpdate)
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
          await this.callDocs(this.idUser);
          this.$store.commit("comuni/setFile", "");
          this.comentario = "";
          this.addFiles([]);
          this.$store.commit("comuni/setFileload", false);
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
    }
  },

  async created() {
    // console.log(formattedString);
    this.$q.loading.show();
    const infoUser = await LocalStorage.getAll().UserDetalle;
    this.infoUser = infoUser;
    this.idUser = LocalStorage.getAll().idUser;
    await this.callDocs(this.idUser);
    // console.log(infoUser.name);
    // this.nombre = infoUser.name;
    // this.dni = infoUser.dni;
    // this.telf = infoUser.telefono;
    // this.area = infoUser.area;
    // this.correo = infoUser.email;
    // this.url = infoUser.url;
    // this.profile = infoUser.profile;
    // console.log("infoUser", infoUser);
    const role = LocalStorage.getAll().role;
    // console.log(role);
    // if (role == 1) {
    //   this.datosPersonales = true;
    // } else {
    //   this.datosPersonales = false;
    if (this.getDocs) {
    } else {
    }
    // }
    this.$q.loading.hide();

    // this.$q.loading.show();
    // this.idUser = LocalStorage.getAll().idUser;
    // console.log(this.idUser);
    // await this.callUserOne(this.idUser);
    // this.userData = await this.getUserOne;
    // console.log("this.userData");
    // console.log(this.userData.certificado);
    // console.log(this.userData);
    // this.certificado = (await this.userData.certificado)
    //   ? this.userData.certificado
    //   : "BrochueCuidAPPtebyPandoraTI.pdf";
    // await setTimeout(async () => {
    //   console.log("luego de 2 segundos");
    //   this.certificadoCheck = true;
    //   this.$q.loading.hide();
    // }, 2000);
  }
};
</script>

<style scoped></style>
