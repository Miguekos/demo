<template>
  <div class="q-pa-sm">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-list bordered padding>
        <div v-if="datosPersonales">
          <q-item-label header class="text-center text-h6 q-pb-xs text-bold"
            >Datos personales</q-item-label
          >
          <q-separator spaced />
          <q-item>
            <q-item-section>
              <q-input
                color="red-5"
                name="name"
                dense
                v-model="nombre"
                label="Nombres y apellidos"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                color="red-5"
                name="dni"
                dense
                v-model="dni"
                label="DNI / C.E"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                color="red-5"
                name="telf"
                dense
                v-model="telf"
                label="Celular"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                color="red-5"
                name="correo"
                dense
                v-model="correo"
                label="Correo (opcional)"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                color="red-5"
                name="area"
                dense
                v-model="area"
                :options="options"
                label="Área"
              />
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>

        <q-item-label header class="text-center text-h6 q-pb-xs text-bold"
          >¿Cómo te sientes?</q-item-label
        >
        <q-separator spaced />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >¿Sensación de alza térmica o fiebre?</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-toggle
              size="50px"
              color="blue-6"
              v-model="estados.notif1"
              true-value="true"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >¿Tos, estornudos o dificultad para respirar?</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-toggle
              size="50px"
              color="blue-6"
              v-model="estados.notif2"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >¿Expectoración o flema amarilla o verdosa?</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-toggle
              size="50px"
              color="blue-6"
              v-model="estados.notif3"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >¿Contacto con persona(s) con un caso confirmado de
              COVID-19?</q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-toggle
              size="50px"
              color="blue-6"
              v-model="estados.notif4"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >¿Estás tomando alguna medicación?</q-item-label
            >
            <!-- <q-item-label caption>Allow notification</q-item-label> -->
          </q-item-section>
          <q-item-section side>
            <q-toggle
              size="50px"
              v-model="estados.notif5"
              color="blue-6"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pr-xs" tag="label" v-ripple>
          <q-item-section>
            <q-item-label class="text-left"
              >Todos los datos expresados en esta ficha constituyen declaración
              jurada de mi parte. He sido informado(a) que de omitir o falsear
              información puedo perjudicar la salud de mis compañeros(as), y la
              mía propia, lo cual, de constituir una falta grave a la salud
              pública, asumo sus consecuencias.
            </q-item-label>
            <!-- <q-item-label caption
            >Allow notification when uploading images</q-item-label
          > -->
          </q-item-section>
          <q-item-section side center>
            <q-checkbox v-model="terminos" val="blue" color="teal" />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item>
          <q-item-section>
            <q-btn color="red-5" @click="reset()" label="Limpiar" />
          </q-item-section>
          <q-item-section>
            <q-btn color="green-6" type="submit" label="Confirmar" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
    <!-- <q-card
      v-if="submitEmpty"
      flat
      bordered
      class="text-center q-mt-md bg-grey-2"
    >
      <q-card-section>
        Debe llenar / Seleccionar todas las opciones.!
      </q-card-section>
    </q-card> -->
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { LocalStorage } from "quasar";
const alerts = [
  {
    color: "negative",
    message: "Debes verte con un medico!",
    icon: "report_problem"
  },
  // { message: "You need to know about this!", icon: "warning" },
  // { message: "Wow! Nice job!", icon: "thumb_up" },
  // { color: "teal", message: "Quasar is cool! Right?", icon: "tag_faces" },
  // {
  //   color: "purple",
  //   message: "Jim just pinged you",
  //   avatar: "https://cdn.quasar.dev/img/boy-avatar.png"
  // },
  {
    multiLine: true,
    message:
      "Recuerda lavar tus manos y evitar tocar superficies que uso comun."
  }
];
export default {
  data() {
    return {
      datosPersonales: false,
      correo: "",
      submitResult: [],
      nombre: "",
      dni: "",
      telf: "",
      area: "",
      terminos: false,
      check1: true,
      check2: false,
      check3: false,
      check4: false,
      estados: {
        notif1: false,
        notif2: false,
        notif3: false,
        notif4: false,
        notif5: false
      },
      volume: 6,
      brightness: 3,
      mic: 8,
      model: "",
      options: ["Producción", "Ventas", "Administración", "Gerencia"],
      submitEmpty: false
    };
  },
  methods: {
    ...mapActions("client", ["addCliente"]),
    reset() {
      this.nombre = "";
      this.dni = "";
      this.telf = "";
      this.area = "";
      this.terminos = false;
      this.estados.notif1 = false;
      this.estados.notif2 = false;
      this.estados.notif3 = false;
      this.estados.notif4 = false;
      this.estados.notif5 = false;
    },
    valdairEstados() {
      if (
        this.estados.notif1 ||
        this.estados.notif2 ||
        this.estados.notif3 ||
        this.estados.notif4 ||
        this.estados.notif5
      ) {
        return "01";
      } else {
        return "00";
      }
    },
    async onSubmit() {
      // console.log(this.nombre.length);
      // console.log(this.dni.length);
      // console.log(this.telf.length);
      // console.log(this.area.length);
      // console.log(typeof(this.area));
      if (
        this.nombre.length > 0 &&
        this.dni.length > 0 &&
        this.telf.length > 0 &&
        this.area.length > 0
      ) {
        this.$q.loading.show();
        let validacion = this.valdairEstados();
        if (this.terminos) {
          console.log(validacion);
          const JsonEnviar = {
            ...this.estados,
            estados: validacion,
            nombre: this.nombre,
            dni: this.dni,
            telf: this.telf,
            area: this.area,
            url: this.url,
            profile: this.profile,
            correo: this.correo
          };
          console.log(JsonEnviar);
          const respAddClient = await this.addCliente(JsonEnviar);
          console.log(respAddClient);
          if (validacion == "00") {
            this.$q.notify({
              message: "!Sigue cuidándote! Que tengas buen día.",
              color: "green-6",
              position: "top"
            });
          } else if (validacion == "01") {
            this.$q.notify({
              message: "Quédate en casa. Llama a tu jefe.",
              color: "red-6",
              position: "top"
            });
          }
        } else {
          this.$q.notify({
            message: "Debe aceptar los terminos y condiciones",
            color: "blue-6",
            position: "top"
          });
        }
        this.reset();
        this.$q.loading.hide();
      } else {
        this.$q.notify({
          message: "No dejear campos vacíos",
          color: "red-6",
          position: "top"
        });
      }
    },
    showLoading() {
      // this.$q.loading.show();

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.show();
        // this.$q.loading.hide();
        this.timer = void 0;
        this.showNotif("center");
      }, 2000);
    },
    showNotif(position) {
      const { color, textColor, multiLine, icon, message, avatar } = alerts[
        Math.floor(Math.random(alerts.length) * 10) % alerts.length
      ];
      const random = Math.random() * 100;

      const twoActions = random > 70;
      const buttonColor = color ? "white" : void 0;

      this.$q.notify({
        color,
        textColor,
        icon: random > 30 ? icon : null,
        message,
        position,
        avatar,
        multiLine,
        actions: twoActions
          ? [
              {
                label: "Responder",
                color: buttonColor,
                handler: () => {
                  /* console.log('wooow') */
                }
              },
              {
                label: "Omitir",
                color: "yellow",
                handler: () => {
                  /* console.log('wooow') */
                }
              }
            ]
          : random > 40
          ? [
              {
                label: "Responder",
                color: buttonColor,
                handler: () => {
                  /* console.log('wooow') */
                }
              }
            ]
          : null,
        timeout: Math.random() * 5000 + 3000
      });
    }
  },

  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  async created() {
    const infoUser = await LocalStorage.getAll().UserDetalle;
    console.log(infoUser.name);
    this.nombre = infoUser.name;
    this.dni = infoUser.dni;
    this.telf = infoUser.telefono;
    this.area = infoUser.area;
    this.correo = infoUser.email;
    this.url = infoUser.url;
    this.profile = infoUser.profile;
    console.log("infoUser", infoUser);
    const role = LocalStorage.getAll().role;
    console.log(role);
    if (role == 1) {
      this.datosPersonales = true;
    } else {
      this.datosPersonales = false;
    }
  }
};
</script>
