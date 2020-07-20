<template>
  <div>
    <q-btn
      :disable="activo"
      class="full-width"
      size="lg"
      v-bind="{ color, disable, label }"
      :label="_label"
      @click="onClick"
    />
    <!--    {{ dataUser }}-->
  </div>
</template>

<script>
import {
  mapGeolocationActions,
  mapGeolocationGetters
} from "quasar-app-extension-geolocation/src/store";
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      activo: false,
      pollingTimer: null,
      Varcoords: null,
      Varlatitude: null,
      Varlongitude: null,
      Varaccuracy: null,
      idUser: null,
      dataUser: null
    };
  },
  computed: {
    ...mapGetters("users", ["getUserOne"]),
    ...mapGetters("asist", ["getAsistOne"]),
    ...mapGetters("client", ["getClienteValidar"]),
    fullWidth() {
      return true;
    },
    color() {
      if (!this.isPermissionKnown || this.isPermissionPrompt) {
        return "primary";
      } else if (this.isPermissionGranted) {
        return "positive";
      } else if (this.isPermissionDenied) {
        return "negative";
      }
      return null;
    },
    disable() {
      return this.isPermissionDenied;
    },
    _label() {
      return this.label || this.hasPosition ? "Asistencia" : "Asistencia";
    },
    ...mapGeolocationGetters([
      "isPermissionKnown",
      "isPermissionGranted",
      "isPermissionPrompt",
      "isPermissionDenied",
      "hasPosition",
      "coords",
      "latitude",
      "longitude",
      "accuracy"
    ])
  },
  async created() {
    this.$q.loading.show();
    this.queryPermission();
    this.idUser = this.$q.localStorage.getItem("idUser");
    console.log(this.idUser);
    await this.callUserOne(this.idUser);
    this.dataUser = await this.getUserOne;
    console.log("dataUser", this.dataUser);
    await this.callAsistOne(this.idUser);
    await this.callClienteValidar(this.dataUser.dni);
    const evaluate = this.getClienteValidar;
    console.log("evaluate", evaluate.length);
    const asistencia = this.getAsistOne;
    if (evaluate.length > 0) {
      if (asistencia != null) {
        if (asistencia.asistenciaEntrada) {
          const fechaEntrada = asistencia.asistenciaEntrada.created_at;
          const fechaSalida = formattedString;
          let unit = "hours";
          let diff = date.getDateDiff(fechaSalida, fechaEntrada, unit);
          console.log("diff", diff);
          if (diff < 4) {
            this.activo = true;
            this.$q.notify({
              // progress: true,
              message: "¡Deben pasar al menos 4 horas!",
              // icon: "favorite_border",
              icon: "insert_emoticon",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          } else {
            if (asistencia.asistenciaSalida) {
              this.$q.notify({
                // progress: true,
                message: "¡Asistencias completadas!",
                // icon: "favorite_border",
                icon: "insert_emoticon",
                color: "white",
                textColor: "green-5",
                position: "top"
              });
              this.activo = true;
            } else {
              this.activo = false;
            }
          }
          // console.log(diff);
          // console.log(fechaEntrada);
          // console.log(fechaSalida);
        } else {
          console.log("asistencia");
        }
      } else {
        console.log("No pasa nada");
      }
    } else {
      this.activo = true;
      this.$q.notify({
        // progress: true,
        message: "¡Debes registrar tu evaluacion primero!",
        // icon: "favorite_border",
        icon: "insert_emoticon",
        color: "white",
        textColor: "red-5",
        position: "top"
      });
    }
    this.$q.loading.hide();
  },
  methods: {
    ...mapActions("users", ["callUserOne"]),
    ...mapActions("asist", ["addAsist", "callAsistOne"]),
    ...mapActions("client", ["callClienteValidar"]),
    doQueryPermission() {
      this.queryPermission().then(() => {
        if (this.isPermissionDenied) {
          // poll permission as the user might allow them in a separate tab
          this.pollingTimer = setTimeout(() => this.doQueryPermission(), 2000);
        } else if (this.pollingTimer) {
          clearTimeout(this.pollingTimer);
        }
      });
    },
    onClick() {
      this.samplePosition()
        .catch(() => {})
        .finally(() => {
          // update permissions (as the user might have enabled them)
          this.doQueryPermission();
          this.Varcoords = this.coords;
          this.Varlatitude = this.latitude;
          this.Varlongitude = this.longitude;
          this.Varaccuracy = this.accuracy;
          this.addAsist({
            ...this.dataUser,
            asistencia: {
              coords: this.coords,
              latitude: this.latitude,
              longitude: this.longitude,
              accuracy: this.accuracy,
              created_at: new Date()
            }
          })
            .then(() => {
              this.$q.notify({
                // progress: true,
                message: "¡Asistencia correcta! Ten un buen dia",
                // icon: "favorite_border",
                icon: "insert_emoticon",
                color: "white",
                textColor: "green-5",
                position: "top"
              });
              this.$router.push("/");
            })
            .catch(err => {
              this.$q.notify({
                // progress: true,
                message: "¡Oh oh, algo salio mal - reportalo!",
                // icon: "favorite_border",
                icon: "sentiment_very_dissatisfied",
                color: "white",
                textColor: "red-5",
                position: "top"
              });
            });
        });
    },
    ...mapGeolocationActions(["samplePosition", "queryPermission"])
  }
};
</script>
