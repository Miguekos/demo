<template>
  <div class="q-pa-sm">
    <q-list bordered padding>
      <q-item-label header class="text-center text-h6 q-pb-xs"
        >¿Como te sientes?</q-item-label
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
            v-model="notif1"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

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
            v-model="notif2"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

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
            v-model="notif3"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

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
            v-model="notif4"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label class="text-left"
            >¿Estás tomando alguna medicación?</q-item-label
          >
          <!-- <q-item-label caption>Allow notification</q-item-label> -->
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            size="50px"
            v-model="notif5"
            color="blue-6"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label class="text-center"
            >Todos los datos expresados en esta ficha constituyen declaración
            murada de mi parte. He sido informado(a) que de omitir o falsear
            información puedo perjudicar la salud de mis compañeros(as), y la
            mía propia, lo cual, de constituir una falta grave a la salud
            pública, asumo sus consecuencias
          </q-item-label>
          <!-- <q-item-label caption
            >Allow notification when uploading images</q-item-label
          > -->
        </q-item-section>
        <q-item-section side top>
          <q-checkbox v-model="terminos" val="blue" color="teal" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header class="text-center text-h6 q-pb-xs"
        >Datos Personales</q-item-label
      >
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-input filled dense outlined v-model="text" label="Nombre" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input filled dense outlined v-model="text" label="DNI / C.E" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            filled
            dense
            v-model="model"
            :options="options"
            label="Area"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn color="amber-7" label="Cancelar" />
        </q-item-section>
        <q-item-section>
          <q-btn color="green-6" @click="showLoading" label="Confirmar" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
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
      text: "",
      terminos: false,
      check1: true,
      check2: false,
      check3: false,
      check4: false,
      notif1: false,
      notif2: false,
      notif3: false,
      notif4: false,
      notif5: false,
      volume: 6,
      brightness: 3,
      mic: 8,
      model: null,
      options: ["Producción", "Ventas", "Administración", "Gerencia"]
    };
  },
  methods: {
    showLoading() {
      this.$q.loading.show();

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
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
  }
};
</script>
