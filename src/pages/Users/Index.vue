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
            Usuarios
          </q-item-label>
          <q-separator color="grey-4" inset />
        </q-item-section>
        <q-item-section class="text-grey text-bold" side top right>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <Search />
        </q-item-section>
      </q-item>
    </q-list>
    <q-table
      hide-header
      flat
      :data="getUsers"
      :columns="columns"
      row-key="created_at.$date"
      :pagination="pagination"
      rows-per-page-label="Cant. P/P"
    >
      <template v-slot:body="props">
        <q-tr :props="props" clickable>
          <q-td key="name" :props="props">
            <q-item-section clickable @click="detalleCliente(props.row)">
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-item-label caption> {{ props.row.email }}</q-item-label>
            </q-item-section>
          </q-td>
          <q-td key="created_at.$date" :props="props">
            {{ formatDate(props.row.created_at.$date) }}
          </q-td>
          <q-td key="email" :props="props">
            <div class="q-gutter-md">
              <q-btn
                size="xs"
                round
                color="indigo-5"
                text-color="white"
                icon="add"
                @click="abrirDialogReg(props.row)"
              />
              <q-btn
                v-if="role == 1"
                size="xs"
                round
                color="red-5"
                text-color="white"
                icon="delete"
                @click="eliminarUser(props.row)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-list separator>
      <q-item
        v-for="(item, index) in getUsers"
        :key="index"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>
            <b class="text-grey-5">Cel:</b> {{ item.telf }}</q-item-label
          >
        </q-item-section>
        <q-item-section side right>
          <q-item-label>{{ item.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->
    <q-page-sticky v-if="role == 1" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="registro()" fab icon="add" color="green" />
    </q-page-sticky>
    <q-dialog persistent v-model="dialogRegistro">
      <Registro @cerrarDialog="dialogRegistro = false" />
    </q-dialog>
    <q-dialog persistent full-width v-model="registarCuidate">
      <q-card>
        <registarCuidate
          :id="this.idRegitro"
          @cerrarDialogCu="registarCuidate = false"
        />
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
    if (logginIn && (role == 1 || role == 3)) {
      // console.log("WELCOME");
    } else {
      redirect("/");
    }
  },
  computed: {
    ...mapGetters("users", ["getUsers"])
    // ...mapState("general", ["formatearFecha"])
  },
  components: {
    Search: () => import("./Search"),
    Registro: () => import("src/components/dielogRegistro"),
    registarCuidate: () => import("../../components/RegistrarCuidateDoc")
  },
  data() {
    return {
      role: null,
      idRegitro: null,
      registarCuidate: false,
      pagination: {
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 8
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
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "created_at.$date",
          align: "right",
          label: "Fecha",
          field: "created_at.$date",
          sortable: true
        },
        {
          name: "email",
          align: "right",
          label: "Email",
          field: "email",
          sortable: true
        }
      ],
      text: "",
      loading: false,
      search: ""
    };
  },
  methods: {
    ...mapActions("users", ["callUser", "deleteUser"]),
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
      return Fechas.Corta(arg);
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
    this.role = this.$q.localStorage.getAll().role;
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callUser();
    // this.$store.commit("general/setAtras", false);
    // this.$store.commit("general/setSearch", true);
    // this.$q.addressbarColor.set("#0056a1");
    // this.$q.loading.hide();
    this.$q.loading.hide();
  }
};
</script>
