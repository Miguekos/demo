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
        <!--          <q-item-section class="text-indigo text-bold" side top right>-->
        <!--            <q-icon name="archive" />-->
        <!--          </q-item-section>-->
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
  mixins: [myMixin],
  computed: {
    ...mapGetters("segui", ["getSeguimientoOne"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./SearchCU")
  },
  data() {
    return {
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
    ...mapActions("segui", ["callOneRegistroSegui"]),
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
    const userData = LocalStorage.getAll().UserDetalle;
    console.log(userData.id.$oid);
    await this.callOneRegistroSegui(userData.id.$oid);
    // this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
