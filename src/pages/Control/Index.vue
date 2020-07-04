<template>
  <div class="q-pa-xs">
    <q-list>
      <q-item bordered>
        <q-item-label class="text-left text-h6 q-pa-xs text-bold text-black"
          >Reportes</q-item-label
        >
      </q-item>
      <q-separator />
      <q-item class="justify-around" style="height: 150px;">
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Total</q-item-label>
          <q-circular-progress
            show-value
            :value="parseInt(getClienteReport.clientes)"
            size="80px"
            :thickness="0.13"
            color="green"
            track-color="grey-3"
            class="q-ma-xs"
            >{{ getClienteReport.clientes }}</q-circular-progress
          >
        </q-item-section>
        <q-item-section
          style="align-items: center; font-size: 10px; text-align: center"
          class="text-grey"
          side
        >
          <q-item-label class="q-pb-md">
            Personal
            <br />sanos
          </q-item-label>
          <q-circular-progress
            @click="URL('/detalles')"
            show-value
            :value="getClienteReport.clientesCS"
            size="80px"
            :thickness="0.13"
            color="indigo"
            track-color="grey-3"
            class="q-ma-xs"
            >{{ getClienteReport.clientesCS }} %</q-circular-progress
          >
        </q-item-section>
        <q-item-section
          style="align-items: center; font-size: 10px; text-align: center"
          class="text-grey"
          side
        >
          <q-item-label class="q-pb-md">
            Personal
            <br />con síntomas
          </q-item-label>
          <q-circular-progress
            @click="URL('/detallecs')"
            show-value
            :value="getClienteReport.clientesS"
            size="80px"
            :thickness="0.13"
            color="red"
            track-color="grey-3"
            class="q-ma-xs"
            >{{ getClienteReport.clientesS }} %</q-circular-progress
          >
        </q-item-section>
      </q-item>
    </q-list>

    <q-item>
      <q-item-section>Reportes por estados</q-item-section>
    </q-item>
    <q-separator />
    <q-list style="height: 280px;">
      <Graficas :info="getClienteReport" />
    </q-list>

    <q-list separator>
      <q-item>
        <q-item-section
          >Reportes por colaboradores en el últimos mes</q-item-section
        >
      </q-item>
      <q-separator />
      <q-table
        :data="getClientesReporteNewCS"
        :columns="columns"
        hide-bottom
        hide-header
        row-key="ultimaFecha.$date"
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props" clickable>
            <q-td key="nombre" v-ripple:white :props="props">
              <q-item-section>
                <q-item-label>{{ props.row.nombre }}</q-item-label>
                <q-item-label caption>
                  <b class="text-grey-5">Cantidad:</b>
                  {{ props.row.count }}
                </q-item-label>
              </q-item-section>
            </q-td>
            <q-td key="ultimaFecha.$date" :props="props" v-ripple:white>{{
              formatDate(props.row.ultimaFecha.$date)
            }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-list>
  </div>
</template>
<script>
import { Fechas } from "src/directives/formatFecha";
import { mapGetters, mapActions, mapState } from "vuex";
import { LocalStorage } from "quasar";
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
  data() {
    return {
      dataDeGrafica: [],
      value: 81,
      total: 64,
      sanos: 40,
      consintomas: 90,
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: 10
      },
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
          name: "ultimaFecha.$date",
          align: "right",
          label: "fecha",
          field: "ultimaFecha.$date",
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters("client", [
      "getClienteReport",
      "getClientes",
      "getClientesReporteNewCS"
    ])
  },
  methods: {
    ...mapActions("client", [
      "callClienteReport",
      "callCliente",
      "callClienteReportOrder"
    ]),
    detalleCliente(arg) {
      this.$q.loading.show();
      console.log(arg);
      this.$store.commit("client/setDialogDetalleData", arg);
      setTimeout(() => {
        this.$store.commit("client/setDialogDetalle", true);
        this.$q.loading.hide();
      }, 500);
    },
    async URL(arg) {
      await this.$router.push(arg);
    },
    formatDate(arg) {
      // console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    },
    onLeft() {},
    onRight() {},
    showLoading() {
      this.$q.loading.show();

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 2000);
    }
  },
  components: {
    Graficas: () => import("components/ApexCharts")
    // Graficas: () => import("components/Charts")
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  async mounted() {
    this.$q.loading.show();
    // this.showLoading();
    // await this.callClienteReport();
    await this.callClienteReportOrder();
    await setTimeout(() => {
      this.$q.loading.hide();
    }, 1000);
  }
};
</script>
