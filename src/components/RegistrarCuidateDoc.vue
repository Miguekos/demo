<template>
  <div class="q-pa-sm">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-list bordered>
        <q-item-label header class="text-center text-h6 q-pb-xs text-bold"
          >Cuéntanos, ¿cómo estas?
          <!--          {{ infoUser }}-->
        </q-item-label>
        <q-separator spaced />

        <q-item dense class="q-pb-xs">
          <q-item-section>
            <q-input borderless v-model="dateDiag" label="Fecha de diagnóstico">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyDiag"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="DD/MM/YYYY"
                      :locale="myLocale"
                      v-model="dateDiag"
                      @input="() => $refs.qDateProxyDiag.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pb-xs">
          <q-item-section>
            <q-input
              disable
              borderless
              v-model="dateReport"
              label="Fecha de reporte"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyRep"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="DD/MM/YYYY"
                      :locale="myLocale"
                      v-model="dateReport"
                      @input="() => $refs.qDateProxyRep.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pb-xs">
          <q-item-section>
            <q-select
              label="Síntomas"
              borderless
              v-model="sintomas"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pb-xs">
          <q-item-section>
            <q-select
              label="Medicación"
              borderless
              v-model="medicacion"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pb-xs">
          <q-item-section>
            <q-input
              v-model="temp"
              color="red-5"
              borderless
              label="Temperatura"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-item class="q-pb-xs">
          <q-item-section>
            <q-input
              v-model="observa"
              autogrow
              color="red-5"
              borderless
              label="Observación"
            />
          </q-item-section>
        </q-item>

        <q-separator inset color="red-5" />

        <q-separator spaced />

        <q-item>
          <q-item-section>
            <q-btn
              color="red-5"
              @click="$emit('cerrarDialogCu')"
              label="Cerrar"
            />
          </q-item-section>
          <q-item-section>
            <q-btn color="green-6" type="submit" label="Confirmar" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
    <!--    {{ $data }}-->
    <!-- <q-card
      v-if="submitEmpty"
      flat
      bordered
      class="text-center q-mt-md bg-grey-2"
    >
      <q-card-section>
        Debe llenar / Seleccionar todas las opciones.!
      </q-card-section>
    </q-card>-->
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { LocalStorage } from "quasar";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");

export default {
  props: ["id"],
  computed: {
    ...mapGetters("users", ["getUserOne"])
  },
  data() {
    return {
      role: null,
      infoUser: null,
      temp: null,
      observa: [],
      sintomas: null,
      medicacion: null,
      dateDiag: null,
      dateReport: formattedString,
      myLocale: {
        /* starting with Sunday */
        days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
          "_"
        ),
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split(
          "_"
        )
      }
    };
  },
  methods: {
    ...mapActions("segui", ["addRegistroSegui"]),
    ...mapActions("users", ["callUserOne"]),
    closeDialogReg() {
      this.$emit("cerrarDialogCu");
    },
    reset() {
      this.temp = null;
      this.observa = null;
      this.sintomas = null;
      this.medicacion = null;
      this.dateDiag = formattedString;
      this.dateReport = formattedString;
    },
    async onSubmit() {
      // console.log(this.observa.length);
      // console.log(this.sintomas.length);
      // console.log(this.medicacion.length);
      // console.log(this.dateDiag.length);
      // console.log(this.dateReport.length);
      if (
        this.observa.length > 0 &&
        this.sintomas != null &&
        this.dateDiag != null &&
        this.medicacion != null
      ) {
        this.$q.loading.show();
        // let validacion = this.valdairEstados();
        // console.log(validacion);
        const JsonEnviar = {
          ...this.infoUser,
          observa: [
            {
              nombre: this.infoUser.name,
              fecha: new Date(),
              detalle: this.observa,
              temp: this.temp,
              sintomas: this.sintomas,
              medicacion: this.medicacion,
              role: this.role
            }
          ],
          temp: this.temp,
          sintomas: this.sintomas,
          medicacion: this.medicacion,
          seguimiento: 1,
          dateDiag: this.dateDiag,
          dateReport: this.dateReport
        };
        console.log(JsonEnviar);
        try {
          const respAddClient = await this.addRegistroSegui(JsonEnviar);
          console.log(respAddClient);
          this.$q.notify({
            // progress: true,
            message: "¡Se registro el control!",
            // icon: "favorite_border",
            icon: "insert_emoticon",
            color: "white",
            textColor: "red-5",
            position: "top"
          });
          this.reset();
          this.$router.push("/seguimiento");
        } catch (e) {
          console.log(e);
          this.$q.notify({
            // progress: true,
            message: "¡Oh oh, algo salio mal!",
            // icon: "favorite_border",
            icon: "close",
            color: "white",
            textColor: "red-5",
            position: "top"
          });
        }
        this.$q.loading.hide();
      } else {
        this.$q.notify({
          // progress: true,
          message: "¡No dejar campos vacios!",
          // icon: "favorite_border",
          // icon: "alert",
          color: "white",
          textColor: "blue-5",
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
    }
  },

  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  async created() {
    console.log(new Date());
    this.$q.loading.show();
    // const infoUser = await LocalStorage.getAll().UserDetalle;
    await this.callUserOne(this.id);
    this.infoUser = await this.getUserOne;
    this.role = this.$q.localStorage.getAll().role;
    // console.log(infoUser.name);
    // this.nombre = infoUser.name;
    // this.dni = infoUser.dni;
    // this.telf = infoUser.telefono;
    // this.area = infoUser.area;
    // this.correo = infoUser.email;
    // this.url = infoUser.url;
    // this.profile = infoUser.profile;
    // console.log("infoUser", infoUser);
    const role = LocalStorage.getAll().role;
    // console.log(role);
    // if (role == 1) {
    //   this.datosPersonales = true;
    // } else {
    //   this.datosPersonales = false;
    // }
    this.$q.loading.hide();
  }
};
</script>
