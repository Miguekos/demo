<template>
  <q-page padding>
    <q-list>
      <q-item dense clickable v-ripple>
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
        <q-item-section class="text-grey text-bold" side top right>
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
      :data="getAsistUser"
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
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date, LocalStorage } from "quasar";
export default {
  preFetch({ store, redirect }) {
    let logginIn = LocalStorage.getAll().loggin;
    let role = LocalStorage.getAll().role;
    if (logginIn && role == 4) {
      // console.log("WELCOME");
    } else {
      redirect("/");
    }
  },
  computed: {
    ...mapGetters("asist", ["getAsistUser"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    DetalleMaps: () => import("../../components/DetalleAsist")
    // Search: () => import("./Search"),
    // Registro: () => import("src/components/dielogRegistro"),
    // registarCuidate: () => import("../../components/RegistrarCuidateDoc")
  },
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
    ...mapActions("asist", ["callAsistUser"]),
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
    await this.callAsistUser(this.$q.localStorage.getAll().UserDetalle);
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
