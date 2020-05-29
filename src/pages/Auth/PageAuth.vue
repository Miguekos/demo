<template>
  <div>
    <form @submit.prevent="submitForm">
      <q-list style="padding-top: 80px">
        <q-item class="q-pb-lg">
          <q-item-section class="flex flex-center">
            <q-img
              color="grey"
              style="height: 110px; max-width: 120px;"
              alt="Roseline logo"
              src="~assets/lococorazon.png"
            />
            <q-item-label header class="q-pt-xs text-grey text-h6 text-bold">
              <b class="text-green">C</b>uid<b class="text-red">APP</b>te
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs text-h6 text-black text-bold">
              Iniciar sesión
            </q-item-label>
            <q-item-label class="q-pt-xs text-grey text-bold">
              Hola, puedes puedes iniciar sesión
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list class="q-pb-lg">
        <q-item>
          <q-item-section>
            <q-input
              name="email"
              ref="email"
              stack-label
              label-color="red-5"
              color="grey"
              v-model="form.email"
              label="Email"
              placeholder="Tu cuenta de correo"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              name="password"
              ref="password"
              v-model="form.password"
              stack-label
              label="Contraseña"
              label-color="red-5"
              color="grey"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Introduce tu contraseña"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <!-- <q-item>
        <q-item-section side center>
          <q-item-label>
            <q-checkbox v-model="val" />
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-left">
            De acuerdo con los Términos y condiciones y Politicas de Privacidad.
          </q-item-label>
        </q-item-section>
      </q-item> -->
      </q-list>
      <q-list>
        <q-item>
          <q-item-section>
            <q-btn
              :loading="loadlogin"
              color="red-6"
              type="submit"
              text-color="white"
              label="Iniciar Sesion"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </form>
  </div>
</template>

<script>
// import { LocalStorage } from "quasar";
import { LocalStorage } from "quasar";
import { mapActions } from "vuex";
// console.log(process.env.API);
// import { openURL } from 'quasar'
export default {
  // preFetch({ store }) {
  //   // console.log("stored autth");
  //   // console.log(store.state.auth.auth);
  //   if (!store.state.auth) {
  //     // console.log(store.state.auth);
  //     // redirect('/')
  //   }
  // },
  data() {
    return {
      loadlogin: false,
      val: false,
      text: "",
      ph: "",
      password: "",
      isPwd: true,
      dense: false,
      loading: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    submitForm() {
      this.loadlogin = true;
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        // console.log();
        this.login({
          email: this.form.email,
          pwd: this.form.password
        })
          .then(resp => {
            if (resp.codRes == "00") {
              // console.log("resp", resp);
              LocalStorage.set("loggin", true);
              LocalStorage.set("role", resp.role);
              LocalStorage.set("idUser", resp.id.$oid);
              this.$store.commit('auth/setAuth', true)
              this.$store.commit('auth/setRole', resp.role)
              const userDetalle = {
                name: resp.name,
                email: resp.email
              };
              this.$q.notify({
                // progress: true,
                message: "¡Bienvenido!",
                // icon: "favorite_border",
                icon: "insert_emoticon",
                color: "white",
                textColor: "red-5",
                position: "top"
              });
              LocalStorage.set("UserDetalle", resp);
              // console.log("loguerado Correctamente");
              this.loadlogin = false;
              this.$router.push("/");
            } else if (resp.codRes == "01") {
              // console.log("Email o Contraseña incorrecta");
              this.$q.notify({
                message: "Email o Contraseña incorrecta",
                color: "red-5"
              });
              this.loadlogin = false;
            }
          })
          .catch(err => {
            // console.log(err);
            this.loadlogin = false;
          });
        // console.log("login the user");
      }
    }
  }
};
</script>
