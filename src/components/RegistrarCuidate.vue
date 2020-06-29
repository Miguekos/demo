<template>
  <div class="q-pa-sm">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-list bordered>
        <q-item-label header class="text-center text-h6 q-pb-xs text-bold"
          >Cuéntanos, ¿cómo estas?
        </q-item-label>
        <q-separator spaced />

        <q-item dense class="q-pb-xs" tag="label">
          <q-item-section>
            <q-input
              borderless
              v-model="dateDiag"
              label="Fecha Diagnostico"
              mask="date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyDiag"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
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

        <q-item class="q-pb-xs" tag="label">
          <q-item-section>
            <q-input
              borderless
              v-model="dateReport"
              label="Fecha Reporte"
              mask="date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyRep"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
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

        <q-item class="q-pb-xs" tag="label">
          <q-item-section>
            <q-select
              label="Sintomas"
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

        <q-item class="q-pb-xs" tag="label">
          <q-item-section>
            <q-select
              label="Medicacion"
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

        <q-item class="q-pb-xs" tag="label">
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

        <!--        <q-item class="q-pr-xs" tag="label">-->
        <!--          <q-item-section>-->
        <!--            <q-item-label class="text-left">-->
        <!--              Todos los datos expresados en esta ficha constituyen declaración-->
        <!--              jurada de mi parte. He sido informado(a) que de omitir o falsear-->
        <!--              información puedo perjudicar la salud de mis compañeros(as), y la-->
        <!--              mía propia, lo cual, de constituir una falta grave a la salud-->
        <!--              pública, asumo sus consecuencias.-->
        <!--            </q-item-label>-->
        <!--            &lt;!&ndash; <q-item-label caption-->
        <!--            >Allow notification when uploading images</q-item-label-->
        <!--            >&ndash;&gt;-->
        <!--          </q-item-section>-->
        <!--          <q-item-section side center>-->
        <!--            <q-checkbox v-model="terminos" val="blue" color="teal"/>-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->

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

export default {
  data() {
    return {
      infoUser: null,
      observa: [],
      sintomas: null,
      medicacion: null,
      dateDiag: new Date().toISOString().substr(0, 10),
      dateReport: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    ...mapActions("segui", ["addRegistroSegui"]),
    reset() {
      this.observa = null;
      this.sintomas = null;
      this.medicacion = null;
      this.dateDiag = new Date().toISOString().substr(0, 10);
      this.dateReport = new Date().toISOString().substr(0, 10);
    },
    async onSubmit() {
      // console.log(this.observa.length);
      // console.log(this.sintomas.length);
      // console.log(this.medicacion.length);
      // console.log(this.dateDiag.length);
      // console.log(this.dateReport.length);
      if (
        this.observa.length > 0 &&
        this.sintomas.length > 0 &&
        this.medicacion.length > 0
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
              detalle: this.observa
            }
          ],
          sintomas: this.sintomas,
          medicacion: this.medicacion,
          dateDiag: this.dateDiag,
          dateReport: this.dateReport
        };
        console.log(JsonEnviar);
        try {
          const respAddClient = await this.addRegistroSegui(JsonEnviar);
          console.log(respAddClient);
          this.$q.notify({
            // progress: true,
            message: "¡Se registro tu control!",
            // icon: "favorite_border",
            icon: "insert_emoticon",
            color: "white",
            textColor: "red-5",
            position: "top"
          });
          this.reset();
          this.$router.push("/misregistros");
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
    const infoUser = await LocalStorage.getAll().UserDetalle;
    this.infoUser = infoUser;
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
