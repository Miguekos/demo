<template>
  <div>
    <q-table
      grid
      :data="info"
      :columns="columns"
      row-key="fecha"
      :pagination.sync="pagination"
      hide-pagination
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 cursor-pointer">
          <q-card :class="colorRole(props.row.role)">
            <!--            <q-card-section class="text-center">-->
            <!--              <strong>{{ props.row.nombre }}</strong>-->
            <!--              <br />-->
            <!--              <strong>{{ props.row.detalle }}</strong>-->
            <!--              <br />-->
            <!--              <strong>{{ formatFecha(props.row.fecha) }}</strong>-->
            <!--            </q-card-section>-->
            <q-list>
              <q-item>
                <q-item-section>
                  <q-list>
                    <q-item class="text-center">
                      <q-item-section>
                        <q-item-label class="text-bold">{{
                          props.row.nombre
                        }}</q-item-label>
                        <q-item-label caption>{{
                          formatFecha(props.row.fecha)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-item-section>
                <q-item-section class="text-center">
                  <q-item-label class="text-bold"
                    >Observacion: <span v-if="props.row.role !== 3">Colaborador</span
                    ><span v-if="props.row.role === 3">Medico</span>
                  </q-item-label>
                  <q-item-label caption>{{ props.row.detalle }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator />
            <q-list class="text-center">
              <q-item>
                <q-item-section class="text-bold">
                  <u>Sintomas</u>
                </q-item-section>
                <q-item-section class="text-bold">
                  <u>Medicamentos</u>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label
                    v-for="(medicamentos, index) in props.row.sintomas"
                    :key="index"
                  >
                    - {{ medicamentos }}</q-item-label
                  >
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    v-for="(medicamentos, index) in props.row.medicacion"
                    :key="index"
                  >
                    - {{ medicamentos }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Bueno esto es triste... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>

    <!--    <div class="row justify-center q-mt-md">-->
    <!--      <q-pagination-->
    <!--        v-model="pagination.page"-->
    <!--        color="grey-8"-->
    <!--        :max="pagesNumber"-->
    <!--        size="sm"-->
    <!--      />-->
    <!--    </div>-->
    <div>
      <q-dialog v-model="ver">
        <q-card>
          <embed
            :src="`https://api.apps.com.pe/fileserver/uploads/${visorPdf}`"
            width="600px"
            height="600px"
          />
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { MixinDefault } from "../../mixins/mixin";
export default {
  props: {
    info: {
      Array
    }
  },
  mixins: [MixinDefault],
  data() {
    return {
      ver: false,
      visorPdf: "",
      pagination: {
        sortBy: "fecha",
        descending: true,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },

      columns: [
        {
          name: "documento",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "comentario",
          align: "center",
          label: "Comentario",
          field: row => row.comentario,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "fecha",
          label: "Fecha",
          field: row => row.fecha,
          format: val => `${this.formatFecha(val)}`,
          sortable: true
        },
        {
          name: "acciones",
          label: "Acciones",
          align: "right"
        }
      ]
    };
  },
  methods: {
    colorRole(val) {
      console.log(val);
      if (val !== 3) {
        return "bg-indigo-2";
      } else if (val === 3) {
        return "bg-green-2";
      }
    },
    verPdf(val) {
      console.log(val.documento);
      this.visorPdf = val.documento;
      this.ver = true;
    }
  },
  computed: {
    // pagesNumber() {
    //   return Math.ceil(this.info.length / this.pagination.rowsPerPage);
    // }
  }
};
</script>

<style scoped></style>
