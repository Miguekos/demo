<template>
  <q-page>
    <q-card flat>
      <q-tabs v-model="tab" dense align="justify">
        <q-tab class="text-amber-5" name="mails" label="Mis evaluaciones" />
        <q-tab
          v-if="role === 1 || role === 3"
          class="text-green-5"
          name="alarms"
          label="Sanos"
        />
        <q-tab
          v-if="role === 1 || role === 3"
          class="text-red-5"
          name="movies"
          label="Con sintomas"
        />
        <q-tab
          v-if="role === 1"
          class="text-indigo-5"
          name="otro"
          label="En cuidate"
        />
        <q-tab
          v-if="role === 2"
          class="text-indigo-5"
          name="otro_user"
          label="Mi cuidado"
        />
        <q-tab v-if="role === 3" class="text-red-5" name="seguimiento" label="Seguimiento" />
        <q-tab v-if="role === 3" class="text-green-5" name="dealta" label="De Alta" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="q-pb-lg">
            <q-list>
              <q-item
                @click="exportTable()"
                v-if="!$q.platform.is.cordova"
                dense
                clickable
                v-ripple
              >
                <q-item-section
                  class="text-red text-bold"
                  side
                  top
                  left
                ></q-item-section>
                <q-item-section>
                  <q-item-label class="text-center text-h6">
                    <!--                    Evaluate-->
                  </q-item-label>
                  <q-separator color="amber-4" inset />
                </q-item-section>
                <q-item-section class="text-amber text-bold" side top right>
                  <q-icon name="archive" />
                </q-item-section>
              </q-item>
              <q-item
                dense
                v-else
                class="native-mobile-only"
                clickable
                v-ripple
              >
                <q-item-section
                  class="text-red text-bold"
                  side
                  top
                  left
                ></q-item-section>
                <q-item-section>
                  <q-item-label class="text-center text-h6">
                    <!--                    Evaluate-->
                  </q-item-label>
                  <q-separator color="amber-4" inset />
                </q-item-section>
                <q-item-section
                  class="text-amber text-bold"
                  side
                  top
                  right
                ></q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-input
                  v-model="search"
                  dense
                  standout="bg-amber-4 text-white"
                  type="search"
                  placeholder="Buscar"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>-->
                  <Search />
                </q-item-section>
              </q-item>
            </q-list>

            <!--      {{ getClienteOne }}-->
            <q-table
              hide-bottom
              hide-header
              flat
              :data="getClienteOne"
              :columns="columns"
              row-key="created_at.$date"
              :pagination.sync="pagination"
            >
              <!-- <template v-slot:top-right>
              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </template>-->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="nombre" :props="props">
                    <q-item-section
                      v-ripple:white
                      clickable
                      @click="detalleCliente(props.row)"
                    >
                      <q-item-label>{{ props.row.nombre }}</q-item-label>
                      <q-item-label caption>
                        <b class="text-red-5">temp:</b>
                        {{ props.row.temp }}°
                      </q-item-label>
                    </q-item-section>
                  </q-td>
                  <q-td key="created_at.$date" v-ripple:white :props="props">{{
                    formatDate(props.row.created_at.$date)
                  }}</q-td>
                  <q-td
                    key="email"
                    :props="props"
                    v-ripple:white
                    clickable
                    @click="funcUpdateTemp(props.row)"
                  >
                    <q-btn
                      size="xs"
                      round
                      color="amber-5"
                      text-color="white"
                      icon="whatshot"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <DetallesSanos />
        </q-tab-panel>

        <q-tab-panel name="movies">
          <DetallesConSintomas />
        </q-tab-panel>

        <q-tab-panel v-if="role === 1" name="otro">
          <DetallesCuidate />
        </q-tab-panel>

        <q-tab-panel v-if="role === 2" name="otro_user">
          <DetallesCuidateOne />
        </q-tab-panel>

        <q-tab-panel name="seguimiento">
          <Seguimiento />
        </q-tab-panel>

        <q-tab-panel name="dealta">
          <DeAlta />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date, exportFile, LocalStorage } from "quasar";
import { myMixin } from "../../mixins/mixin.js";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  // preFetch({ store, redirect }) {
  //   let logginIn = LocalStorage.getAll().loggin;
  //   let role = LocalStorage.getAll().role;
  //   if (logginIn && role == 1) {
  //     // console.log("WELCOME");
  //   } else {
  //     redirect("/");
  //   }
  // },
  mixins: [myMixin],
  computed: {
    ...mapGetters("client", ["getClienteOne"]),
    ...mapGetters("segui", ["getSeguimientoOne"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchMR"),
    DetallesConSintomas: () => import("./DetallesConSintomas"),
    DetallesSanos: () => import("./DetallesSanos"),
    DetallesCuidate: () => import("./DetallesCuidate"),
    DetallesCuidateOne: () => import("./DetallesCuidateOne"),
    Seguimiento: () => import("../Seguimiento/Seguimiento"),
    DeAlta: () => import("../Seguimiento//DeAlta")
  },
  data() {
    return {
      role: null,
      tab: "mails",
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("client", ["callClienteOne", "updateCliente"]),
    ...mapActions("segui", ["callOneRegistroSegui"]),
    crearDataExport() {
      const arraysJson = this.getClienteOne[0];
      let keys = [];
      let values = [];
      keys.push(Object.keys(arraysJson));
      // console.log(keys[0].length);
      // console.log(typeof keys[0].length);

      for (let index = 0; index < keys[0].length; index++) {
        // console.log(index);
        const element = keys[0][index];
        values.push({
          name: element,
          label: element,
          field: element
        });
        // console.log(element);
      }
      // console.log(values);
      this.columnsexport = values;
    },
    funcUpdateTemp(arg) {
      // console.log(arg);
      this.$q
        .dialog({
          title: "Temperatura",
          message: "¿Cuál es tu temperatura?",
          prompt: {
            model: "",
            type: "number" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.$q.loading.show();
          // console.log(">>>> OK, received", data);
          let jsonUpdate = {
            temp: data,
            _id: arg._id.$oid
          };
          // console.log(jsonUpdate);
          this.updateCliente(jsonUpdate)
            .then(async resp => {
              this.$q.notify({
                message: "¡Actualizamos tu temperatura!",
                color: "green",
                position: "top"
              });
              await this.callClienteOne(LocalStorage.getAll().UserDetalle.dni);
              this.$q.loading.hide();
            })
            .catch(err => {
              this.$q.notify({
                message: "Oh oh, algo salio mal",
                color: "negative",
                position: "top"
              });
              this.$q.loading.hide();
            });
        })
        .onCancel(() => {
          this.$q.loading.hide();
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          this.$q.loading.hide();
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columnsexport.map(col => wrapCsvValue(col.label))]
        .concat(
          this.getClienteOne.map(row =>
            this.columnsexport
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        "table-misevaluaciones.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        this.$q.notify({
          message: "Tu navegador no permite descargar...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    detalleCliente(arg) {
      this.$q.loading.show();
      // console.log(arg);
      this.$store.commit("client/setDialogDetalleData", arg);
      setTimeout(() => {
        this.$store.commit("client/setDialogDetalle", true);
        this.$q.loading.hide();
      }, 500);
    },
    detalleSeguimientoOne(arg) {
      this.$q.loading.show();
      // console.log(arg);
      this.$store.commit("segui/setDialogDetalleSeguiData", arg);
      setTimeout(() => {
        this.$store.commit("segui/setDialogSeguiDetalle", true);
        this.$q.loading.hide();
      }, 500);
    },
    formatDate(arg) {
      // console.log("Formateando Fecha");
      return Fechas.Custom(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    }
  },
  async created() {
    this.$q.loading.show();
    const userData = LocalStorage.getAll().UserDetalle;
    this.role = LocalStorage.getAll().role;
    // console.log(userData.id.$oid);
    await this.callClienteOne(userData.dni);
    // await this.callOneRegistroSegui(userData.id.$oid);
    this.$q.loading.hide();
  }
};
</script>
<style scoped>
.q-tab-panel {
  padding: 10px 0px 0px 0px;
}
</style>
