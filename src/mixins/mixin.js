// Define un objeto _mixin_
import { Fechas } from "../directives/formatFecha";
const myMixin = {
  data() {
    return {
      initialPagination: {
        sortBy: "created_at",
        descending: true,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      columnsexport: [
        {
          name: "notif1",
          label: "Sensacion de alza termica o fiebre?",
          field: row => (row.notif1 ? "Si" : "No")
        },
        {
          name: "notif2",
          label: "Tos, estornudos o dificultad para respirar?",
          field: row => (row.notif2 ? "Si" : "No")
        },
        {
          name: "notif3",
          label: "Expectoracion o flema amarilla o verdosa?",
          field: row => (row.notif3 ? "Si" : "No")
        },
        {
          name: "notif4",
          label: "Contacto con persona(s) con un caso confirmado de COVID-19?",
          field: row => (row.notif4 ? "Si" : "No")
        },
        {
          name: "notif5",
          label: "Estas tomando alguna medicacion?",
          field: row => (row.notif5 ? "Si" : "No")
        },
        {
          name: "estados",
          label: "Estados",
          field: row => (row.estados === "00" ? "Sano" : "Con Sintomas")
        },
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
          field: row => row.area
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
      ]
    };
  },
  created: function() {
    // this.hello();
  },
  methods: {}
};

const MixinDefault = {
  data() {
    return {};
  },
  created: function() {
    // this.hello();
  },
  methods: {
    noti(val) {
      if (val === 1) {
        this.$q.notify({
          message: "Se actualizo correctamente",
          color: "white",
          textColor: "blue-5",
          position: "top"
        });
      }
      if (val === 2) {
        this.$q.notify({
          message: "Ya esta asignado a este usuario",
          color: "white",
          textColor: "blue-5",
          position: "top"
        });
      }
      if (val === 3) {
        this.$q.notify({
          message: "Oh oh, algo salio mal",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
      if (val === 4) {
        this.$q.notify({
          message: "No puedes dejar campos vacios",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
    },
    formatFecha(val) {
      return Fechas.larga(val);
    },
    formatFechaCorta(val) {
      return Fechas.Corta(val);
    },
    formatFechaCustom(val) {
      return Fechas.Custom(val);
    }
  }
};

export { myMixin, MixinDefault };
