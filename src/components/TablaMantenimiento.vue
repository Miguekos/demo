<template>
  <div>
    <q-table
      :data="info"
      :columns="columns"
      row-key="fecha"
      :pagination="initialPagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <!--          <q-td key="fecha" :props="props">-->
          <!--            {{ formatFecha(props.row.created_at.$date) }}-->
          <!--          </q-td>-->
          <q-td key="acciones" :props="props">
            <q-btn
              @click="eliminar(props.row)"
              icon="delete"
              color="red"
              round
              size="xs"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { MixinDefault } from "src/mixins/mixin";
import { mapActions } from "vuex";
export default {
  props: {
    info: Array
  },
  mixins: [MixinDefault],
  name: "TablaMantenimiento",
  data() {
    return {
      initialPagination: {
        sortBy: "fecha",
        descending: true,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          style: "width: 100px"
        },
        // {
        //   name: "fecha",
        //   label: "Fecha",
        //   field: row => row.registro,
        //   format: val => `${val}`,
        //   sortable: true,
        //   style: "width: 100px"
        // },
        {
          name: "acciones",
          label: "Acciones",
          field: row => row.registro,
          format: val => `${val}`,
          sortable: true,
          style: "width: 100px"
        }
      ]
    };
  },
  methods: {
    eliminar(val) {
      this.$emit("click", val);
      console.log(val);
    }
  }
};
</script>

<style>
#q-app
  > div
  > div.q-page-container
  > div
  > div:nth-child(2)
  > div
  > div
  > div:nth-child(3)
  > div
  > main {
  min-height: 300px;
}
</style>
