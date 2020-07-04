<template>
  <div>
    <q-btn
      class="full-width"
      size="lg"
      :="{ color, disable, label }"
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
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
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
    this.queryPermission();
    this.idUser = this.$q.localStorage.getItem("idUser");
    console.log(this.idUser);
    await this.callUserOne(this.idUser);
    this.dataUser = await this.getUserOne;
  },
  methods: {
    ...mapActions("users", ["callUserOne"]),
    ...mapActions("asist", ["addAsist"]),
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
            coords: this.coords,
            latitude: this.latitude,
            longitude: this.longitude,
            accuracy: this.accuracy
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
