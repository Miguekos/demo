<template>
  <div>
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
            <!--            Cuidate-->
          </q-item-label>
          <q-separator color="indigo-4" inset />
        </q-item-section>
        <q-item-section class="text-indigo text-bold" side top right>
          <q-icon name="archive" />
        </q-item-section>
      </q-item>
      <!--        <q-item dense v-else class="native-mobile-only" clickable v-ripple>-->
      <!--          <q-item-section-->
      <!--            class="text-red text-bold"-->
      <!--            side-->
      <!--            top-->
      <!--            left-->
      <!--          ></q-item-section>-->
      <!--          <q-item-section>-->
      <!--            <q-item-label class="text-center text-h6">Cuidate</q-item-label>-->
      <!--            <q-separator color="indigo-4" inset />-->
      <!--          </q-item-section>-->
      <!--          <q-item-section-->
      <!--            class="text-indigo text-bold"-->
      <!--            side-->
      <!--            top-->
      <!--            right-->
      <!--          ></q-item-section>-->
      <!--        </q-item>-->
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

    <!--       {{ getSeguimientoOne }}-->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getSeguimientoOne"
      :columns="columnsOne"
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
          <q-td key="name" :props="props">
            <q-item-section
              v-if="role == 1"
              v-ripple:white
              clickable
              @click="detalleSeguimientoOne(props.row)"
            >
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-item-label caption>
                <b class="text-red-5">temp:</b>
                {{ props.row.temp }}°
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="role == 2" v-ripple:white clickable>
              <q-item-label>{{ props.row.name }}</q-item-label>
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
            v-if="role == 2"
            key="email"
            :props="props"
            v-ripple:white
            clickable
            file
            @click="funcUpdateTemp(props.row)"
          >
            <q-btn
              size="xs"
              round
              color="indigo-5"
              text-color="white"
              icon="whatshot"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
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
  name: "DetallesCuidate",
  // mixins: [myMixin],
  computed: {
    ...mapGetters("segui", ["getSeguimientoOne"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchCU")
  },
  data() {
    return {
      role: null,
      userData: [],
      tab: "mails",
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columnsexport: [
        {
          name: "name",
          label: "Nombre",
          field: row => row.name
        },
        {
          name: "dni",
          label: "DNI",
          field: "dni"
        },
        {
          name: "telefono",
          label: "Celular",
          field: "telefono"
        },
        {
          name: "area",
          label: "Area",
          field: "area"
        },
        {
          name: "temp",
          label: "Temperatura",
          field: "temp"
        },
        {
          name: "email",
          label: "Correo",
          field: "email"
        },
        {
          name: "observa",
          label: "Observaciones",
          field: row => row.observa,
          format: val => `${JSON.stringify(val)}`
        },
        {
          name: "dateDiag",
          label: "Fecha de diagnostico",
          field: "dateDiag"
        },
        {
          name: "dateReport",
          label: "Fecha de registro",
          field: "dateReport"
        },
        {
          name: "dealta",
          label: "De Alta",
          field: row => (row.dealta == 0 ? "No" : "Si")
        },
        {
          name: "seguimiento",
          label: "Seguimiento",
          field: row => (row.seguimiento == 0 ? "No" : "Si")
        },
        {
          name: "created_at.$date",
          label: "Fecha de Registro",
          field: row => row.created_at.$date,
          format: val => `${this.formatDate(val)}`
        }
      ],
      columnsOne: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "created_at.$date",
          align: "right",
          label: "fecha",
          field: "created_at.$date",
          style: "width: 20px",
          sortable: true
        },
        {
          name: "email",
          align: "right",
          label: "Email",
          field: "email",
          style: "width: 10px",
          sortable: true
        }
      ],
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("segui", ["callOneRegistroSegui", "updateRegistroSegui"]),
    crearDataExport() {
      const arraysJson = this.getSeguimientoOne[0];
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
      console.log(values);
      this.columnsexport = values;
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columnsexport.map(col => wrapCsvValue(col.label))]
        .concat(
          this.getSeguimientoOne.map(row =>
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

      const status = exportFile("table-cudiate.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Tu navegador no permite descargar...",
          color: "negative",
          icon: "warning"
        });
      }
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
            _id: arg._id
          };
          // console.log(jsonUpdate);
          this.updateRegistroSegui(jsonUpdate)
            .then(async resp => {
              this.$q.notify({
                message: "¡Actualizamos tu temperatura!",
                color: "green",
                position: "top"
              });
              await this.callOneRegistroSegui(this.userData.id.$oid);
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
    // this.$q.loading.show();
    this.userData = LocalStorage.getAll().UserDetalle;
    this.role = LocalStorage.getAll().role;
    console.log(this.userData.id.$oid);
    await this.callOneRegistroSegui(this.userData.id.$oid);
    // this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
