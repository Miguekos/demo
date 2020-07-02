<template>
  <q-page>
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
            <!--            Seguimiento-->
          </q-item-label>
          <!--          {{this.columnsexport}}-->
          <q-separator color="red-4" inset />
        </q-item-section>
        <q-item-section class="text-red text-bold" side top right>
          <q-icon name="archive" />
        </q-item-section>
      </q-item>
      <q-item dense v-else class="native-mobile-only" clickable v-ripple>
        <q-item-section
          class="text-red text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6"> </q-item-label>
          <q-separator color="red-4" inset />
        </q-item-section>
        <q-item-section class="text-red text-bold" side top right>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <!-- <q-input
            v-model="search"
            dense
            standout="bg-red-4 text-white"
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

    <!--     {{ getSeguiCuidate }}-->
    <!--    {{ columnsexport }}-->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getSeguiCuidate"
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
        <q-tr :props="props" clickable @click="detalleCliente(props.row)">
          <q-td key="nombre" v-ripple:white :props="props">
            <q-item-section>
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-item-label caption>
                <b class="text-red-5">Area:</b>
                {{ props.row.area }}
              </q-item-label>
            </q-item-section>
          </q-td>
          <q-td key="created_at.$date" v-ripple:white :props="props"
            >{{ formatDate(props.row.created_at.$date) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- <q-list separator>
      <q-item
        v-for="(item, index) in getSeguiCuidate"
        :key="index"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ item.nombre }}</q-item-label>
          <q-item-label caption>
            <b class="text-red-5">Cel:</b> {{ item.telf }}</q-item-label
          >
        </q-item-section>
        <q-item-section side right>
          <q-item-label>{{ formatDate(item.created_at.$date) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>-->
  </q-page>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date, exportFile, LocalStorage } from "quasar";

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
  computed: {
    ...mapGetters("segui", ["getSeguiCuidate"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchSG")
  },
  data() {
    return {
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
      columns: [
        {
          name: "nombre",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "created_at.$date",
          align: "right",
          label: "fecha",
          field: "created_at.$date",
          sortable: true
        }
      ],
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("segui", ["callSeguiCuidate"]),
    crearDataExport() {
      const arraysJson = this.getSeguiCuidate[0];
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
          this.getSeguiCuidate.map(row =>
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

      const status = exportFile("table-seguimiento.csv", content, "text/csv");

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
      this.$store.commit("segui/setDialogDetalleSeguiData", arg);
      setTimeout(() => {
        this.$store.commit("segui/setDialogSeguiDetalle", true);
        this.$q.loading.hide();
      }, 500);
    },
    formatDate(arg) {
      // console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    }
  },
  async created() {
    this.$q.loading.show();
    this.loading = true;
    // console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callSeguiCuidate();
    // await this.crearDataExport();
    // this.dataexport = this.getSeguiCuidate();
    // this.$store.commit("general/setAtras", false);
    // this.$store.commit("general/setSearch", true);
    // this.$q.addressbarColor.set("#0056a1");
    this.$q.loading.hide();
  }
};
</script>
