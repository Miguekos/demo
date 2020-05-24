<template>
  <div class="q-pa-xs">
    <q-list>
      <q-item bordered>
        <q-item-label class="text-left text-h6 q-pa-xs text-bold text-black"
          >Reportes
        </q-item-label>
      </q-item>
      <q-separator />
      <q-item class="justify-around" style="height: 150px;">
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Total</q-item-label>
          <q-circular-progress
            show-value
            :value="getClienteReport.clientes"
            size="80px"
            :thickness="0.13"
            color="green"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ getClienteReport.clientes }}%
          </q-circular-progress>
        </q-item-section>
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Sanos</q-item-label>
          <q-circular-progress
            show-value
            :value="getClienteReport.clientesCS"
            size="80px"
            :thickness="0.13"
            color="indigo"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ getClienteReport.clientesCS }} %
          </q-circular-progress>
        </q-item-section>
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Con Sintomas</q-item-label>
          <q-circular-progress
            show-value
            :value="getClienteReport.clientesS"
            size="80px"
            :thickness="0.13"
            color="red"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ getClienteReport.clientesS }} %
          </q-circular-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <q-item>
      <q-item-section>Reportes por áreas</q-item-section>
    </q-item>
    <q-separator />
    <q-list style="height: 240px;">
      <Graficas :info="getClienteReport" />
    </q-list>

    <q-list separator>
      <q-item>
        <q-item-section
          >Reportes por colaboradores en el ultimos mes</q-item-section
        >
      </q-item>
      <q-separator />
      <q-item v-for="(item, index) in getClientes" :key="index">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ item.nombre }}</q-item-section>
        <q-item-section side center>
          <q-item-label>
            {{ item.dni }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      value: 81,
      total: 64,
      sanos: 40,
      consintomas: 90
    };
  },
  computed: {
    ...mapGetters("client", ["getClienteReport", "getClientes"])
  },
  methods: {
    ...mapActions("client", ["callClienteReport", "callCliente"]),
    onLeft() {},
    onRight() {},
    showLoading() {
      this.$q.loading.show();

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    }
  },
  components: {
    Graficas: () => import("components/Charts")
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  created() {
    // this.$q.loading.show();
    this.showLoading();
    this.callClienteReport();
    this.callCliente();
    // this.$q.loading.hide()
  }
};
</script>
