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
          <!--          <q-input-->
          <!--            v-model="search"-->
          <!--            dense-->
          <!--            standout="bg-amber-4 text-white"-->
          <!--            type="search"-->
          <!--            placeholder="Buscar"-->
          <!--          >-->
          <!--            <template v-slot:append>-->
          <!--              <q-icon name="search" />-->
          <!--            </template>-->
          <!--          </q-input>-->
          <q-input
            dense
            standout="bg-indigo-4 text-white"
            type="search"
            placeholder="Buscar por name"
            v-model="filter"
          >
            <!--      <template v-slot:before>-->
            <!--        <q-icon name="search" />-->
            <!--      </template>-->
            <template v-slot:append>
              <q-icon
                v-if="filter !== ''"
                name="close"
                @click="filter = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
          <!--          <Search />-->
        </q-item-section>
      </q-item>
    </q-list>

    <!--       {{ getSeguimientos }}-->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getSeguimientos"
      :columns="columnsOne"
      row-key="created_at.$date"
      :pagination.sync="pagination"
      :filter="filter"
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
          </q-td>
          <q-td key="created_at.$date" v-ripple:white :props="props">{{
            formatDate(props.row.created_at.$date)
          }}</q-td>
          <!--            <q-td-->
          <!--              key="email"-->
          <!--              :props="props"-->
          <!--              v-ripple:white-->
          <!--              clickable-->
          <!--              file-->
          <!--              @click="funcUpdateTemp(props.row)"-->
          <!--            >-->
          <!--              <q-btn-->
          <!--                size="xs"-->
          <!--                round-->
          <!--                color="indigo-5"-->
          <!--                text-color="white"-->
          <!--                icon="whatshot"-->
          <!--              />-->
          <!--            </q-td>-->
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
var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function(str) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  };
})();
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

  return `"${normalize(formatted)}"`;
}
export default {
  name: "DetallesCuidate",
  // mixins: [myMixin],
  computed: {
    ...mapGetters("segui", ["getSeguimientos"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    // Search: () => import("./SearchCU")
  },
  data() {
    return {
      filter: "",
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
          name: "sexo",
          label: "Sexo",
          field: "sexo"
        },
        {
          name: "area",
          label: "Area",
          field: "area"
        },
        {
          name: "edad",
          label: "Edad",
          field: "edad"
        },
        {
          name: "departamento",
          label: "Departamento",
          field: "departamento"
        },
        {
          name: "sueldo",
          label: "Sueldo",
          field: row =>
            this.$q.localStorage.getAll().idUser == 1
              ? row.sueldo
              : "No permitido"
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
    ...mapActions("segui", ["callRegistroSegui"]),
    crearDataExport() {
      const arraysJson = this.getSeguimientos[0];
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
          this.getSeguimientos.map(row =>
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
    // const userData = LocalStorage.getAll().UserDetalle;
    // console.log(userData.id.$oid);
    await this.callRegistroSegui("all");
    // this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
