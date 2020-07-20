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
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="fecha" :props="props">
            <!--            <q-btn icon="delete" color="red" round size="xs"></q-btn>-->
            {{ formatFecha(props.row.created_at.$date) }}
          </q-td>
          <!--          <q-td key="fecha" :props="props">-->
          <!--            <q-btn icon="delete" color="red" round size="xs"></q-btn>-->
          <!--            {{ props.row.calories }}-->
          <!--          </q-td>-->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { MixinDefault } from "src/mixins/mixin";
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
          sortable: true
        },
        {
          name: "fecha",
          label: "Fecha",
          field: row => row.registro,
          format: val => `${val}`,
          sortable: true
        }
      ]
    };
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
