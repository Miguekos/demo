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
            <!--            Personal con síntomas-->
          </q-item-label>
          <q-separator color="red-5" inset />
        </q-item-section>
        <q-item-section class="text-red-5 text-bold" side top right>
          <q-icon name="archive" />
        </q-item-section>
      </q-item>
      <q-item dense v-else clickable v-ripple>
        <q-item-section
          class="text-red text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6"
            >Personal con síntomas</q-item-label
          >
          <q-separator color="red-5" inset />
        </q-item-section>
        <q-item-section
          class="text-red-5 text-bold"
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
    <!--    <q-list>-->
    <!--      <q-item>-->
    <!--        <q-item-section>-->
    <!--          <q-input dense filled v-model="fechaIncio">-->
    <!--            <template v-slot:append>-->
    <!--              <q-icon name="event" class="cursor-pointer">-->
    <!--                <q-popup-proxy-->
    <!--                  ref="qDateProxyIni"-->
    <!--                  transition-show="scale"-->
    <!--                  transition-hide="scale"-->
    <!--                >-->
    <!--                  <q-date-->
    <!--                    mask="DD/MM/YYYY"-->
    <!--                    v-model="fechaIncio"-->
    <!--                    @input="() => cargarIniDate()"-->
    <!--                  />-->
    <!--                </q-popup-proxy>-->
    <!--              </q-icon>-->
    <!--            </template>-->
    <!--          </q-input>-->
    <!--        </q-item-section>-->
    <!--        <q-item-section>-->
    <!--          <q-input dense filled v-model="fechaFin">-->
    <!--            <template v-slot:append>-->
    <!--              <q-icon name="event" class="cursor-pointer">-->
    <!--                <q-popup-proxy-->
    <!--                  ref="qDateProxyFin"-->
    <!--                  transition-show="scale"-->
    <!--                  transition-hide="scale"-->
    <!--                >-->
    <!--                  <q-date-->
    <!--                    mask="DD/MM/YYYY"-->
    <!--                    v-model="fechaFin"-->
    <!--                    @input="() => cargarFinDate()"-->
    <!--                  />-->
    <!--                </q-popup-proxy>-->
    <!--              </q-icon>-->
    <!--            </template>-->
    <!--          </q-input>-->
    <!--        </q-item-section>-->
    <!--      </q-item>-->
    <!--    </q-list>-->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getClientesCS"
      :columns="columns"
      row-key="created_at.$date"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props" clickable @click="detalleCliente(props.row)">
          <q-td key="name" v-ripple:white :props="props">
            <q-item-section>
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-item-label caption>
                <b class="text-green-5">Cel:</b>
                {{ props.row.telefono }}
              </q-item-label>
            </q-item-section>
          </q-td>
          <q-td key="created_at.$date" v-ripple:white :props="props">{{
            formatDate(props.row.created_at.$date)
          }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-list separator>
      <q-item
        v-for="(item, index) in getClientesCS"
        :key="index"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>
            <b class="text-red-5">Cel:</b> {{ item.telefono }}</q-item-label
          >
        </q-item-section>
        <q-item-section side right>
          <q-item-label>{{ formatDate(item.created_at.$date) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>-->
  </div>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date, exportFile, LocalStorage } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
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
  preFetch({ store, redirect }) {
    let logginIn = LocalStorage.getAll().loggin;
    let role = LocalStorage.getAll().role;
    if (logginIn && role == 1) {
      // console.log("WELCOME");
    } else {
      redirect("/");
    }
  },
  computed: {
    ...mapGetters("client", ["getClientesCS"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchCS")
  },
  data() {
    return {
      fi: formattedString,
      ff: formattedString,
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columnsexport: [
        {
          name: "notif1",
          label: "Sensación de alza térmica o fiebre?",
          field: row => (row.notif1 ? "Si" : "No")
        },
        {
          name: "notif2",
          label: "Tos, estornudos o dificultad para respirar?",
          field: row => (row.notif2 ? "Si" : "No")
        },
        {
          name: "notif3",
          label: "Expectoración o flema amarilla o verdosa?",
          field: row => (row.notif3 ? "Si" : "No")
        },
        {
          name: "notif4",
          label: "Contacto con persona(s) con un caso confirmado de COVID-19?",
          field: row => (row.notif4 ? "Si" : "No")
        },
        {
          name: "notif5",
          label: "Estás tomando alguna medicación?",
          field: row => (row.notif5 ? "Si" : "No")
        },
        {
          name: "estados",
          label: "Estados",
          field: row => (row.estados === "00" ? "Sano" : "Con Sintomas")
        },
        {
          name: "nombre",
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
          name: "created_at.$date",
          label: "Fecha de Registro",
          field: row => row.created_at.$date,
          format: val => `${this.formatDate(val)}`
        }
      ],
      columns: [
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
          sortable: true
        }
      ],
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("client", ["callClienteCS"]),
    crearDataExport() {
      const arraysJson = this.getClientesCS[0];
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
    exportTable() {
      // naive encoding to csv format
      const content = [this.columnsexport.map(col => wrapCsvValue(col.label))]
        .concat(
          this.getClientesCS.map(row =>
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

      const status = exportFile("table-consintomas.csv", content, "text/csv");

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
    formatDate(arg) {
      // console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    }
  },
  async created() {
    // this.$q.loading.show();
    // console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callClienteCS();
    // await this.crearDataExport();
    // this.$store.commit("general/setAtras", false);
    // this.$store.commit("general/setSearch", true);
    // this.$q.addressbarColor.set("#0056a1");
    // this.$q.loading.hide();
    // this.$q.loading.hide();
  }
};
</script>
