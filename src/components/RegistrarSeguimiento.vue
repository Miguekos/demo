<template>
  <q-page padding>
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
          <q-item-label class="text-center text-h6">Mis registros</q-item-label>
          <q-separator color="amber-4" inset/>
        </q-item-section>
        <q-item-section class="text-amber text-bold" side top right>
          <q-icon name="archive"/>
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
          <q-item-label class="text-center text-h6">Mis Registros</q-item-label>
          <q-separator color="amber-4" inset/>
        </q-item-section>
        <q-item-section
          class="text-amber text-bold"
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
            standout="bg-amber-4 text-white"
            type="search"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>-->
          <Search/>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- {{ getClientesS }} -->
    <q-table
      hide-bottom
      hide-header
      flat
      :data="getClienteOne"
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
        <q-tr :props="props">
          <q-td key="nombre" :props="props">
            <q-item-section
              v-ripple:white
              clickable
              @click="detalleCliente(props.row)"
            >
              <q-item-label>{{ props.row.nombre }}</q-item-label>
              <q-item-label caption>
                <b class="text-red-5">temp:</b>
                {{ props.row.temp }}°
              </q-item-label>
            </q-item-section>
          </q-td>
          <q-td key="created_at.$date" v-ripple:white :props="props"
          >{{ formatDate(props.row.created_at.$date) }}
          </q-td>
          <q-td
            key="email"
            :props="props"
            v-ripple:white
            clickable
            @click="funcUpdateTemp(props.row)"
          >
            <q-btn
              size="xs"
              round
              color="amber-5"
              text-color="white"
              icon="whatshot"
            />
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
            <b class="text-amber-5">Cel:</b> {{ item.telf }}</q-item-label
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
    import {Fechas} from "src/directives/formatFecha";
    import {QSpinnerGears} from "quasar";
    import {mapGetters, mapActions, mapState} from "vuex";
    import {date, exportFile, LocalStorage} from "quasar";

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
            ...mapGetters("client", ["getClienteOne"])
            // ...mapState("general", ["formatearFecha"])
        },
        components: {
            Search: () => import("./SearchMR")
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
                        name: "notif1",
                        label: "¿Sensación de alza térmica o fiebre?",
                        field: row => (row.notif1 ? "Si" : "No")
                    },
                    {
                        name: "notif2",
                        label: "¿Tos, estornudos o dificultad para respirar?",
                        field: row => (row.notif2 ? "Si" : "No")
                    },
                    {
                        name: "notif3",
                        label: "¿Expectoración o flema amarilla o verdosa?",
                        field: row => (row.notif3 ? "Si" : "No")
                    },
                    {
                        name: "notif4",
                        label: "¿Contacto con persona(s) con un caso confirmado de COVID-19?",
                        field: row => (row.notif4 ? "Si" : "No")
                    },
                    {
                        name: "notif5",
                        label: "¿Estás tomando alguna medicación?",
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
                        field: row => row.nombre
                    },
                    {
                        name: "dni",
                        label: "DNI",
                        field: "dni"
                    },
                    {
                        name: "telf",
                        label: "Celular",
                        field: "telf"
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
                        name: "correo",
                        label: "Correo",
                        field: "correo"
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
            ...mapActions("client", ["callClienteOne", "updateCliente"]),
            crearDataExport() {
                const arraysJson = this.getClienteOne[0];
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
            funcUpdateTemp(arg) {
                // console.log(arg);
                this.$q
                    .dialog({
                        title: "Temperatura",
                        message: "¿Cuál es tu temperatura?",
                        prompt: {
                            model: "",
                            type: "number" // optional
                        },
                        cancel: true,
                        persistent: true
                    })
                    .onOk(data => {
                        this.$q.loading.show();
                        // console.log(">>>> OK, received", data);
                        let jsonUpdate = {
                            temp: data,
                            _id: arg._id.$oid
                        };
                        // console.log(jsonUpdate);
                        this.updateCliente(jsonUpdate)
                            .then(async resp => {
                                this.$q.notify({
                                    message: "¡Actualizamos tu temperatura!",
                                    color: "green",
                                    position: "top"
                                });
                                // await this.callClienteOne(LocalStorage.getAll().UserDetalle.dni);
                                await this.callClienteOne({
                                    dni: this.$q.localStorage.getAll().UserDetalle.dni,
                                    fi: this.$store.state.utils.fi,
                                    ff: this.$store.state.utils.ff
                                });


                                this.$q.loading.hide();
                            })
                            .catch(err => {
                                this.$q.notify({
                                    message: "Oh oh, algo salio mal",
                                    color: "negative",
                                    position: "top"
                                });
                                this.$q.loading.hide();
                            });
                    })
                    .onCancel(() => {
                        this.$q.loading.hide();
                        // console.log('>>>> Cancel')
                    })
                    .onDismiss(() => {
                        this.$q.loading.hide();
                        // console.log('I am triggered on both OK and Cancel')
                    });
            },
            exportTable() {
                // naive encoding to csv format
                const content = [this.columnsexport.map(col => wrapCsvValue(col.label))]
                    .concat(
                        this.getClienteOne.map(row =>
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

                const status = exportFile("table-sanos.csv", content, "text/csv");

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
                return Fechas.Custom(arg);
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
            // console.log(LocalStorage.getAll().UserDetalle.dni);
            // await this.callClienteOne(LocalStorage.getAll().UserDetalle.dni);
            await this.callClienteOne({
                dni: this.$q.localStorage.getAll().UserDetalle.dni,
                fi: this.$store.state.utils.fi,
                ff: this.$store.state.utils.ff
            });
            // this.dataexport = this.getClientesS();
            // this.$store.commit("general/setAtras", false);
            // this.$store.commit("general/setSearch", true);
            // this.$q.addressbarColor.set("#0056a1");
            this.$q.loading.hide();
        }
    };
</script>
