<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`${getDialogDetalleData.url}${getDialogDetalleData.profile}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ getDialogDetalleData.nombre }}</q-item-label>
          <q-item-label caption>
            {{ getDialogDetalleData.telf }}
            <!-- {{ getDialogDetalleData }} -->
          </q-item-label>
        </q-item-section>
        <q-item-section side right>
          <q-icon color="red-5" name="whatshot" />
          {{ getDialogDetalleData.temp }}°
        </q-item-section>
      </q-item>
      <!-- {{getDialogDetalleData}} -->

      <q-separator />

      <q-card-section class="q-pa-xs">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center">¿Sensación de alza térmica o fiebre?</q-item-label>
              <q-item-label>
                <b class="text-uppercase">
                  {{
                  formatearResult(getDialogDetalleData.notif1)
                  }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center">¿Tos, estornudos o dificultad para respirar?</q-item-label>
              <q-item-label>
                <b class="text-uppercase">
                  {{
                  formatearResult(getDialogDetalleData.notif2)
                  }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center">¿Expectoración o flema amarilla o verdosa?</q-item-label>
              <q-item-label>
                <b class="text-uppercase">
                  {{
                  formatearResult(getDialogDetalleData.notif3)
                  }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center">
                ¿Contacto con persona(s) con un caso confirmado
                deCOVID-19?
              </q-item-label>
              <q-item-label>
                <b class="text-uppercase">
                  {{
                  formatearResult(getDialogDetalleData.notif4)
                  }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center">¿Estás tomando alguna medicación?</q-item-label>
              <q-item-label>
                <b class="text-uppercase">
                  {{
                  formatearResult(getDialogDetalleData.notif5)
                  }}
                </b>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-btn flat @click="cerrarDialog()" color="red-5">Cerrar</q-btn>
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
    ...mapGetters("client", ["getDialogDetalleData"])
  },
  data() {
    return {
      Urlinfo: "",
      basic: false,
      fixed: false,
      lorem: "Lorem"
    };
  },
  methods: {
    cerrarDialog() {
      this.$store.commit("client/setDialogDetalle", false);
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
    this.Urlinfo = process.env.API_URL;
  }
};
</script>
