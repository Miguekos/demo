<template>
  <q-page>
    <template>
      <div class="q-pa-md">
        <q-table :data="data" :columns="columns" row-key="name">
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
              <q-td key="fat" :props="props">
                <q-btn icon="delete" color="red" round size="xs"></q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>
  </q-page>
</template>

<script>
export default {
  props: {
    info: Array
  },
  name: "TablaMantenimiento",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Nombre",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Accion", field: "fat", sortable: true }
      ],
      data: [
        {
          name: "1",
          calories: "Administracion",
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "2",
          calories: "Ventas",
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "3",
          calories: "RRHH",
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
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
