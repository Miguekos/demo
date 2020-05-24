<template>
  <q-page padding>
    <q-list>
      <q-item dense clickable v-ripple>
        <q-item-section
          class="text-red text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6">
            Sanos
          </q-item-label>
          <q-separator color="green-4" inset />
        </q-item-section>
        <q-item-section class="text-green text-bold" side top right>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <!-- <q-input
            v-model="search"
            dense
            standout="bg-green-4 text-white"
            type="search"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input> -->
          <Search />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- {{ getClientesS }} -->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getClientesS"
      :columns="columns"
      row-key="created_at.$date"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            <q-item-section>
              <q-item-label>{{ props.row.nombre }}</q-item-label>
              <q-item-label caption>
                <b class="text-green-5">Cel:</b>
                {{ props.row.telf }}</q-item-label
              >
            </q-item-section>
          </q-td>
          <q-td key="created_at.$date" :props="props">
            {{ formatDate(props.row.created_at.$date) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- <q-list separator>
      <q-item
        v-for="(item, index) in getClientesS"
        :key="index"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ item.nombre }}</q-item-label>
          <q-item-label caption>
            <b class="text-green-5">Cel:</b> {{ item.telf }}</q-item-label
          >
        </q-item-section>
        <q-item-section side right>
          <q-item-label>{{ formatDate(item.created_at.$date) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->
  </q-page>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("client", ["getClientesS"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchS")
  },
  data() {
    return {
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
    ...mapActions("client", ["callClienteS"]),
    formatDate(arg) {
      console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    }
  },
  async created() {
    this.$q.loading.show();
    this.loading = true;
    console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callClienteS();
    // this.$store.commit("general/setAtras", false);
    // this.$store.commit("general/setSearch", true);
    // this.$q.addressbarColor.set("#0056a1");
    this.$q.loading.hide();
    this.loading = false;
  }
};
</script>
