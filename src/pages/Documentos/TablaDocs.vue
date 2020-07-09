<template>
  <div>
    <q-table
      :grid="$q.screen.lt.md"
      title="Documentos"
      :data="info"
      :columns="columns"
      row-key="fecha"
      :pagination.sync="pagination"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="documento" :props="props">
            {{ props.row.documento }}
          </q-td>
          <q-td key="comentario" :props="props">
            {{ props.row.comentario }}
          </q-td>
          <q-td key="fecha" :props="props">
            {{ formatFecha(props.row.created_at.$date) }}
          </q-td>
          <q-td key="acciones" :props="props">
            <div class="q-gutter-md">
              <q-btn
                size="xs"
                round
                color="green-5"
                text-color="white"
                icon="visibility"
                @click="verPdf(props.row)"
              />
              <q-btn
                size="xs"
                round
                color="red-5"
                text-color="white"
                icon="delete"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:item="props">
        <div
          @click="verPdf(props.row)"
          class="q-pa-xs col-xs-12 cursor-pointer"
        >
          <q-card>
            <q-card-section class="text-center">
              <strong>{{ props.row.comentario }}</strong>
              <br />
              <span>{{ props.row.documento }}</span>
              <br />
              <span>{{ formatFecha(props.row.created_at.$date) }}</span>
            </q-card-section>

            <q-separator />
            <q-list>
              <q-item>
                <q-item-section @click="verPdf(props.row)">
                  <q-btn
                    v-ripple
                    size="sm"
                    color="green-5"
                    text-color="white"
                    icon="visibility"
                  />
                </q-item-section>
                <q-item-section>
                  <q-btn
                    v-ripple
                    size="sm"
                    color="red-5"
                    text-color="white"
                    icon="delete"
                  />
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

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
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
        rowsPerPage: 4
        // rowsNumber: xx if getting data from a server
      },

      columns: [
        {
          name: "documento",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.documento,
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
          field: row => row.created_at.$date,
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
    verPdf(val) {
      console.log(val.documento);
      this.visorPdf = val.documento;
      this.ver = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.info.length / this.pagination.rowsPerPage);
    }
  }
};
</script>

<style scoped></style>
