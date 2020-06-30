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
  methods: {
  }
};

export { myMixin };
