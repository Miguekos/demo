<template>
  <q-page>
    <q-list>
      <q-form @submit="onSubmit">
        <q-item-label class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Editar perfil de {{ $store.state.users.UsersOne.name }}
          </q-item-label>
          <q-separator spaced />
          <q-list>
            <q-item
              @click="alert = true"
              clickable
              v-ripple
              class="justify-center"
            >
              <q-avatar size="100px" font-size="52px">
                <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
                <img
                  :src="
                    `https://api.apps.com.pe/fileserver/uploads/${$store.state.users.UsersOne.profile}`
                  "
                />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <!-- <q-item-label>{{ userdatil.name }}</q-item-label>
                <q-item-label caption>{{ userdatil.email }}</q-item-label>-->
                <q-item-label>{{ getUserOne.name }}</q-item-label>
                <q-item-label caption>{{ getUserOne.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  disable
                  dense
                  color="red-5"
                  filled
                  v-model="usersDetalle.name"
                  label="Nombres y Apellidos"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  disable
                  dense
                  color="red-5"
                  disabled
                  filled
                  v-model="usersDetalle.dni"
                  label="DNI/C.E"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.telefono"
                  label="Celular"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.edad"
                  label="Edad"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.sexo"
                  label="Sexo"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.departamento"
                  label="Departamento"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.cargo"
                  label="Cargo"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.sueldo"
                  label="Sueldo"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  disabled
                  v-model="usersDetalle.email"
                  value="miguekos1233@gmail.com"
                  label="Correo"
                />
              </q-item-section>
            </q-item>
            <q-item v-if="roleUser === 1" class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-select
                  filled
                  v-model="usersDetalle.role"
                  :options="options"
                  label="Role"
                  emit-value
                  map-options
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="red-5"
                  filled
                  v-model="pwd"
                  label="Nuevo Password"
                />
              </q-item-section>
            </q-item>
            <q-item v-if="roleUser == 1" class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-btn color="red-5" @click="Salir()" label="Salir" />
              </q-item-section>
              <q-item-section class="text-center text-bold">
                <q-btn color="green-5" type="submit" label="Actualizar" />
              </q-item-section>
            </q-item>
            <q-item v-if="roleUser == 3" class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-btn color="red-5" @click="Salir()" label="Salir" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
      </q-form>
    </q-list>
    <q-dialog v-model="alert">
      <q-card>
        <q-uploader
          color="red-5"
          bordered
          :factory="factoryFn"
          style="max-width: 300px"
        />

        <!-- <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>-->
      </q-card>
    </q-dialog>
    <q-dialog v-model="registarCuidate">
      <q-card>
        <registarCuidate :id="this.idRegitro" />
      </q-card>
    </q-dialog>

    <!--    {{ $data }}-->
  </q-page>
</template>
<script>
import { axiosInstanceImagen } from "boot/axios";
import { mapState, mapActions, mapGetters } from "vuex";
import { LocalStorage } from "quasar";

export default {
  components: {
    registarCuidate: () => import("../../components/RegistrarCuidateDoc")
  },
  computed: {
    ...mapGetters("users", ["getUserOne"]),
    urlImagen() {
      // return `${this.infoUrl}/uploads/${profile}`;
      // return `https://api.apps.com.pe/fileserver/uploads/${this.$store.state.users.UsersOne.profile}`;
    },
    isUploading() {
      return this.uploading !== null;
    },
    canUpload() {
      return this.files !== null;
    }
  },
  data() {
    return {
      options: [
        {
          label: "Admin",
          value: 1
        },
        {
          label: "User",
          value: 2
        },
        {
          label: "Medico",
          value: 3
        }
      ],
      idRegitro: null,
      registarCuidate: false,
      roleUser: null,
      files: null,
      uploadProgress: [],
      uploading: null,
      certificado: null,
      infoUrl: "",
      alert: false,
      file: [],
      usersDetalle: [],
      text: "",
      _id: null,
      name: "",
      email: "",
      dni: "",
      telefono: "",
      pwd: "",
      selected_file: "",
      check_if_document_upload: false,
      mobileData: true,
      bluetooth: false
    };
  },
  methods: {
    ...mapActions("users", ["callUserOne", "updateUser", "updateImage"]),
    abrirDialogReg() {
      console.log(this.usersDetalle._id.$oid);
      this.idRegitro = this.usersDetalle._id.$oid;
      this.registarCuidate = true;
    },
    Salir() {
      this.$router.push("/usuarios");
    },
    async onSubmit() {
      let jsonUpdate = {
        ...this.usersDetalle,
        pwd: this.pwd ? this.pwd : "",
        role: this.role ? this.role : this.usersDetalle.role
      };
      // console.log(jsonUpdate);
      await this.updateUser(jsonUpdate)
        .then(resp => {
          this.$q.notify({
            message: "¡Se actualizo tu perfil correctamente!",
            position: "top",
            color: "green-5"
          });
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
    async updateFoto(arg) {
      // console.log("NOmbre de la imagen", arg);
      this.usersDetalle.profile = arg;
      let idUser = LocalStorage.getAll().idUser;
      let jsonUpdate = {
        profile: arg,
        _id: this.$route.params.id
      };
      // console.log(jsonUpdate);
      this.updateImage(jsonUpdate)
        .then(async resp => {
          // console.log("antes de actualizar");
          this.alert = false;
          this.$q.notify({
            message: "¡Se actualizo tu foto de perfil!",
            position: "top",
            color: "green-5"
          });
          this.callUserOne(this.$route.params.id);
          // await this.ordenarCampos();
          if (idUser == this.$route.params.id) {
            LocalStorage.remove("UserDetalle");
            setTimeout(() => {
              LocalStorage.set("UserDetalle", this.getUserOne);
            }, 1000);
          } else {
            console.log("Se actualizo");
          }
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
    ordenarCampos() {
      this.usersDetalle = {
        ...this.getUserOne
      };
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
    this._id = this.$route.params.id;
    // console.log(this.$route.params.id);
    await this.callUserOne(this.$route.params.id);
    this.roleUser = LocalStorage.getAll().role;
    await this.ordenarCampos();
    this.infoUrl = process.env.Imagen_URL;
  },
  beforeDestroy() {
    clearTimeout(this.uploading);
  }
};
</script>
