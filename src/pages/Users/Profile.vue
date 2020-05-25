<template>
  <q-page>
    <q-list>
      <q-form @submit="onSubmit">
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Editar Perfil</q-item-label
          >
          <q-separator spaced />
          <q-list>
            <q-item clickable v-ripple class="justify-center">
              <q-avatar size="100px" font-size="52px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <!-- <q-item-label>{{ userdatil.name }}</q-item-label>
              <q-item-label caption>{{ userdatil.email }}</q-item-label> -->
                <q-item-label>{{ getUserOne.name }}</q-item-label>
                <q-item-label caption> {{ getUserOne.email }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
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
                  v-model="usersDetalle.email"
                  value="miguekos1233@gmail.com"
                  label="Correo"
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
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-btn color="red-5" @click="Salir()" label="Salir" />
              </q-item-section>
              <q-item-section class="text-center text-bold">
                <q-btn color="green-5" type="submit" label="Actualizar" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
      </q-form>
    </q-list>
  </q-page>
</template>
<script>
import { axiosInstance } from "boot/axios";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters("users", ["getUserOne"])
  },
  data() {
    return {
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
    ...mapActions("users", ["callUserOne", "updateUser"]),
    Salir() {
      this.$router.push("/");
    },
    async onSubmit() {
      let jsonUpdate = {
        ...this.usersDetalle,
        pwd: this.pwd ? this.pwd : ""
      };
      console.log(jsonUpdate);
      await this.updateUser(jsonUpdate)
        .then(resp => {
          this.$q.notify({
            message: "¡Se actualizo tu perfil correctamente!",
            position: "top",
            color: "green-5"
          });
        })
        .catch(err => {
          console.log(err);
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
      console.log(file);
      let total;
      var formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", file[0]);
      console.log(formData);
      axiosInstance
        .post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          console.log(resp.data);
          total = resp.data;
        })
        .catch(err => {
          console.log(err);
          total = err;
        });
      return total;
    },
    factoryFnNew(files) {
      // returning a Promise
      console.log(files);
      let formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", files[0]);
      return new Promise(resolve => {
        // simulating a delay of 2 seconds
        setTimeout(() => {
          resolve({
            url: "http://localhost:9876/fileupload",
            methods: "POST",
            headers: [
              {
                "Content-Type": "multipart/form-data"
              }
            ],
            data: {
              formData
            }
          });
        }, 100);
      });
    }
  },
  async created() {
    this._id = this.$route.params;
    console.log(this.$route.params.id);
    await this.callUserOne(this.$route.params.id);
    await this.ordenarCampos();
  }
};
</script>
