<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="urlImagen" />
          </q-avatar>
        </q-item-section>
        <!--        {{ getDialogDetalleSeguiData }}-->
        <q-item-section>
          <q-item-label>{{ getDialogDetalleSeguiData.name }}</q-item-label>
          <q-item-label caption>
            {{ getDialogDetalleSeguiData.telefono }}
          </q-item-label>
        </q-item-section>
        <q-item-section side right>
          <q-icon color="red-5" name="whatshot" />
          {{ getDialogDetalleSeguiData.temp }}°
        </q-item-section>
      </q-item>
      <!--      {{ getDialogDetalleSeguiData }}-->

      <q-separator />

      <q-card-section class="q-pa-xs">
        <q-list separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                Síntomas:
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-for="(items, index) in getDialogDetalleSeguiData.sintomas"
                :key="index"
              >
                {{ items }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                Medicación:
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-for="(items, index) in getDialogDetalleSeguiData.medicacion"
                :key="index"
              >
                {{ items }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                Fecha de diagnóstico:
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ getDialogDetalleSeguiData.dateDiag }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>
                Fecha de registro:
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ getDialogDetalleSeguiData.dateReport }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <!--          <q-item clickable v-ripple>-->
          <!--            <q-item-section> </q-item-section>-->
          <!--          </q-item>-->
        </q-list>
      </q-card-section>
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-btn flat @click="cerrarDialog()" color="red-5">Cerrar</q-btn>
          </q-item-section>
          <q-item-section v-if="role != 2">
            <q-btn flat @click="llamar()" color="green">Llamar</q-btn>
          </q-item-section>
          <q-item-section v-if="getDialogDetalleSeguiData.seguimiento == 1">
            <q-btn flat @click="irControl()" color="amber-5">Control</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-btn flat @click="cerrarDialog()" color="red-5">Cerrar</q-btn>
          </q-item-section>
          <q-item-section>
            <q-btn flat color="indigo-5">Descargar</q-btn>
          </q-item-section>
        </q-item>
      </q-list>-->
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("segui", ["getDialogDetalleSeguiData"]),
    urlImagen() {
      return `${this.infoUrl}/uploads/${this.getDialogDetalleSeguiData.profile}`;
    }
  },
  data() {
    return {
      role: null,
      infoUrl: "",
      basic: false,
      fixed: false,
      lorem: "Lorem"
    };
  },
  methods: {
    irControl() {
      console.log("control");

      this.$store.commit("segui/setDialogSeguiDetalle", false);
      this.$router.push(`/control/${this.getDialogDetalleSeguiData._id.$oid}`);
    },
    llamar() {
      this.$store.commit("segui/setDialogSeguiDetalle", false);
      window.open(`tel:+51${this.getDialogDetalleSeguiData.telefono}`);
    },
    cerrarDialog() {
      this.$store.commit("segui/setDialogSeguiDetalle", false);
    },
    formatearResult(arg) {
      // console.log(arg);
      let result;
      if (arg) {
        result = "SI";
      } else {
        result = "NO";
      }
      return result;
    }
  },
  mounted() {
    this.infoUrl = process.env.Imagen_URL;
    this.role = this.$q.localStorage.getAll().role;
  }
};
</script>
