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
      hide-bottom
      hide-header
      flat
      :data="getUsers"
      :columns="columns"
      row-key="created_at.$date"
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
          <q-td
            key="email"
            :props="props"
            clickable
            @click="eliminarUser(props.row)"
          >
            <q-btn
              size="xs"
              round
              color="red-5"
              text-color="white"
              icon="delete"
            />
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="registro()" fab icon="add" color="green" />
    </q-page-sticky>
    <q-dialog persistent v-model="dialogRegistro">
      <Registro @cerrarDialog="dialogRegistro = false" />
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
    if (logginIn && role == 1) {
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
    Registro: () => import("src/components/dielogRegistro")
  },
  data() {
    return {
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
    // console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
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
