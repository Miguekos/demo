<template>
  <q-page padding>
    <q-list>
      <q-item @click="exportTable()" dense clickable v-ripple>
        <q-item-section
          class="text-grey text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6">
            Asistencias
          </q-item-label>
          <q-separator color="grey-4" inset />
        </q-item-section>
        <q-item-section class="text-red-5 text-bold" side top right>
          <q-icon name="archive" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            dense
            standout="bg-red-4 text-white"
            type="search"
            placeholder="Buscar por nombre"
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
        </q-item-section>
      </q-item>
    </q-list>
    <q-table
      v-if="DetalleMapsLoad"
      hide-bottom
      flat
      :data="getAsistAll"
      :columns="columns"
      row-key="created_at.$date"
      :pagination="pagination"
      :filter="filter"
    >
      <template v-slot:body="props">
        <q-tr :props="props" clickable>
          <q-td key="name" :props="props">
            <q-item-section clickable>
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-item-label caption> {{ props.row.email }}</q-item-label>
            </q-item-section>
          </q-td>
          <q-td
            v-if="props.row.asistenciaEntrada"
            key="asistenciaEntrada.created_at"
            :props="props"
          >
            <!--            {{ props.row }}-->
            {{ formatDate(props.row.asistenciaEntrada.created_at) }}
            <q-btn
              size="xs"
              round
              color="red-5"
              text-color="white"
              icon="map"
              @click="dialogMapsDetalle(props.row.asistenciaEntrada)"
            />
          </q-td>
          <q-td
            v-if="props.row.asistenciaSalida"
            key="asistenciaSalida.created_at"
            :props="props"
          >
            <!--            {{ props.row.asistenciaSalida.created_at }}-->
            {{ formatDate(props.row.asistenciaSalida.created_at) }}
            <q-btn
              size="xs"
              round
              color="red-5"
              text-color="white"
              icon="map"
              @click="dialogMapsDetalle(props.row.asistenciaSalida)"
            />
          </q-td>
          <!--          <q-td key="email" :props="props">-->
          <!--            <div class="q-gutter-md">-->
          <!--              <q-btn-->
          <!--                size="xs"-->
          <!--                round-->
          <!--                color="red-5"-->
          <!--                text-color="white"-->
          <!--                icon="map"-->
          <!--                @click="dialogMapsDetalle(props.row)"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </q-td>-->
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="detalleMaps">
      <q-card>
        <DetalleMaps :info="info" @cerrarDialogCu="registarCuidate = false" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { MixinDefault } from "../../mixins/mixin";
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
    ...mapGetters("asist", ["getAsistAll"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    DetalleMaps: () => import("../../components/DetalleAsist")
    // Search: () => import("./Search"),
    // Registro: () => import("src/components/dielogRegistro"),
    // registarCuidate: () => import("../../components/RegistrarCuidateDoc")
  },
  mixins: [MixinDefault],
  data() {
    return {
      filter: "",
      DetalleMapsLoad: false,
      detalleMaps: false,
      info: null,
      idRegitro: null,
      registarCuidate: false,
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      dialogRegistro: false,
      fabLeft: true,
      fabCenter: true,
      fabRight: true,
      columnsexport: [
        {
          name: "nombre",
          label: "Nombre",
          field: row => row.name
        },
        {
          name: "ingreso",
          label: "Ingreso",
          field: row => row,
          format: val =>
            val.asistenciaEntrada
              ? this.formatFecha(val.asistenciaEntrada.created_at)
              : "No marco asistencia"
        },
        {
          name: "salida",
          label: "Salida",
          field: row => row,
          format: val =>
            val.asistenciaSalida
              ? this.formatFecha(val.asistenciaSalida.created_at)
              : "No marco asistencia"
        }
      ],
      columns: [
        {
          name: "name",
          required: true,
          label: "Colaborador",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "asistenciaEntrada.created_at",
          align: "right",
          label: "Ingreso",
          field: "asistenciaEntrada.created_at.$date",
          format: val => (val ? val : null),
          sortable: true
        },
        {
          name: "asistenciaSalida.created_at",
          align: "right",
          label: "Salida",
          field: "asistenciaSalida.created_at.$date",
          format: val => (val ? val : null),
          sortable: true
        }
      ],
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("asist", ["callAsist"]),
    crearDataExport() {
      const arraysJson = this.getAsistAll[0];
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
          this.getAsistAll.map(row =>
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

      const status = exportFile("table-asistencia.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Tu navegador no permite descargar...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    dialogMapsDetalle(val) {
      this.info = val;
      this.detalleMaps = true;
    },
    abrirDialogReg(val) {
      console.log(val);
      console.log(val._id.$oid);
      this.idRegitro = val._id.$oid;
      this.registarCuidate = true;
    },
    cerrarDialogReg() {
      this.registarCuidate = false;
    },
    eliminarUser(arg) {
      // console.log(arg._id.$oid);
      this.$q
        .dialog({
          title: "Confirmar",
          message: "¿Lo quieres eliminar?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
          // this.deleteUser();
          this.deleteUser(arg._id.$oid)
            .then(async resp => {
              // console.log(resp);
              await this.callUser();
              this.$q.notify({
                // progress: true,
                message: "¡Usuario Eliminado!",
                // icon: "favorite_border",
                icon: "delete",
                color: "white",
                textColor: "red-5",
                position: "top"
              });
            })
            .catch(err => {
              // console.log(err);
              this.$q.notify({
                message: "¡Oh oh, algo salido mal!",
                position: "top"
              });
            });
          // reset();
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    finalize(reset) {
      // this.timer = setTimeout(() => {
      reset();
      // }, 1000);
    },
    registro() {
      this.dialogRegistro = true;
    },
    onClick() {
      // console.log("Clicked on a fab action");
    },
    detalleCliente(arg) {
      // console.log(arg._id.$oid);
      this.$router.push(`/profile/${arg._id.$oid}`);
    },
    formatDate(arg) {
      // console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    }
  },
  async created() {
    this.$q.loading.show();
    // this.$on("cerrarDialogReg", this.cerrarDialogReg);
    this.$on("cerrarDialogReg", function(msg) {
      console.log(msg);
    });
    console.log("cerrarDialogReg");
    // console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callAsist();
    this.DetalleMapsLoad = true;
    // this.$store.commit("general/setAtras", false);
    // this.$store.commit("general/setSearch", true);
    // this.$q.addressbarColor.set("#0056a1");
    // this.$q.loading.hide();
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
