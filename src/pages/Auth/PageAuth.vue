<template>
  <div class="my-font">
    <form @submit.prevent="submitForm">
      <q-list>
        <q-item class="q-pb-lg">
          <q-item-section class="flex flex-center">
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              autoplay
              transition-prev="fade"
              transition-next="fade"
            >
              <q-carousel-slide
                :name="1"
                img-src="~assets/17192-coronavirus-blood-health-heart-hypertension-medical-pressure-pulse.gif"
              ></q-carousel-slide>
              <q-carousel-slide
                :name="2"
                img-src="~assets/14916-prueba-doctores-freepik.gif"
              ></q-carousel-slide>
              <q-carousel-slide
                :name="3"
                img-src="~assets/18389-social-distancing.gif"
              ></q-carousel-slide>
              <q-carousel-slide
                :name="4"
                img-src="~assets/17899-hand-sanitizer.gif"
              ></q-carousel-slide>
            </q-carousel>
            <!--            <q-img-->
            <!--              color="grey"-->
            <!--              style="height: 110px; max-width: 120px;"-->
            <!--              alt="Roseline logo"-->
            <!--              src="~assets/17192-coronavirus-blood-health-heart-hypertension-medical-pressure-pulse.gif"-->
            <!--            />-->
            <q-item-label header class="q-pt-xs text-grey text-h6 text-bold my-roboto">
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
              Hola, puedes iniciar sesión
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
              label="Iniciar Sesión"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="q-pt-lg">
        <q-item>
          <q-item-section>
            <q-item-label v-ripple:white @click="modalRecoverPass()"
              >Olvidaste tu contraseña</q-item-label
            >
          </q-item-section>
          <q-item-section> </q-item-section>
        </q-item>
      </q-list>
    </form>
    <q-dialog> </q-dialog>
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
      slide: 1,
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
    ...mapActions("auth", ["login", "recuperar"]),
    modalRecoverPass() {
      this.$q
        .dialog({
          title: "Recuperar contraseña",
          message:
            "¡Un correo será enviado con la contraseña generada, no olvides verificar tu bandeja de spam!",
          prompt: {
            model: "",
            isValid: val => val.length > 2, // << here is the magic
            type: "text", // optional
            label: "Correo",
            outlined: true
          },
          color: "red-5",
          cancel: true,
          persistent: true,
          transitionShow: "slide-down",
          transitionHide: "slide-up"
        })
        .onOk(async data => {
          console.log(">>>> OK, received", data);
          const res = await this.recuperar(data);
          console.log(res);
          if (res.codRes == "00") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo enviado!",
              // icon: "favorite_border",
              icon: "email",
              color: "white",
              textColor: "green-5",
              position: "top"
            });
          } else if (res.codRes == "01") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo no existe!",
              // icon: "favorite_border",
              icon: "unsubscribe",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          } else {
            this.$q.notify({
              // progress: true,
              message: "¡Error controlado!",
              // icon: "favorite_border",
              icon: "cancel_presentation",
              color: "white",
              textColor: "red-5",
              position: "top"
            });
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
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
              LocalStorage.set("fechaInicioSession", new Date());
              this.$store.commit("auth/setAuth", true);
              this.$store.commit("auth/setRole", resp.role);
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
                color: "white",
                textColor: "amber-5",
                position: "top"
              });
              this.loadlogin = false;
            }
          })
          .catch(err => {
            // console.log(err);
            this.loadlogin = false;
            this.$q.notify({
              message: "Error en la red",
              color: "white",
              textColor: "red-5",
              position: "top"
            });
          });
        // console.log("login the user");
      }
    }
  }
};
</script>
<style>
.q-carousel {
  background-color: #fff;
  height: 197px;
  width: 184px;
}
#q-app > div > form > div:nth-child(1) > div > div > div.q-carousel.q-panel-parent.q-carousel--without-padding.q-carousel--navigation-bottom > div.q-carousel__control.q-carousel__navigation.no-wrap.absolute.flex.q-carousel__navigation--buttons.q-carousel__navigation--bottom {
  display: none;
}
</style>
