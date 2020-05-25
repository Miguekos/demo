<template>
  <div class="q-pa-xs">
    <q-list>
      <q-item bordered>
        <q-item-label class="text-left text-h6 q-pa-xs text-bold text-black"
          >Reportes {{ getClienteReport }}
        </q-item-label>
      </q-item>
      <q-separator />
      <q-item class="justify-around" style="height: 150px;">
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Total</q-item-label>
          <q-circular-progress
            show-value
            :value="total"
            size="80px"
            :thickness="0.13"
            color="green"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ total }}%
          </q-circular-progress>
        </q-item-section>
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Sanos</q-item-label>
          <q-circular-progress
            @click="URL('/detalles')"
            show-value
            :value="sanos"
            size="80px"
            :thickness="0.13"
            color="indigo"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ sanos }} %
          </q-circular-progress>
        </q-item-section>
        <q-item-section style="align-items: center;" class="text-grey" side>
          <q-item-label class="q-pb-md">Con Sintomas</q-item-label>
          <q-circular-progress
            @click="URL('/detallecs')"
            show-value
            :value="consintomas"
            size="80px"
            :thickness="0.13"
            color="red"
            track-color="grey-3"
            class="q-ma-xs"
          >
            {{ consintomas }} %
          </q-circular-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <q-item>
      <q-item-section>Reportes por áreas</q-item-section>
    </q-item>
    <q-separator />
    <q-list style="height: 240px;">
      <Graficas />
    </q-list>

    <q-list separator>
      <q-item>
        <q-item-section
          >Reportes por colaboradores en el ultimos mes</q-item-section
        >
      </q-item>
      <q-separator />
      <q-slide-item @left="onLeft" @right="onRight">
        <template v-slot:left>
          <div class="row items-center"><q-icon left name="done" /> Left</div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Right content.. long <q-icon right name="alarm" />
          </div>
        </template>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Juan Lopez</q-item-section>
          <q-item-section side center>
            <q-item-label>
              2 Reportes
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-slide-item>
      <q-slide-item @left="onLeft" @right="onRight">
        <template v-slot:left>
          Left
        </template>
        <template v-slot:right>
          Right content.. long
        </template>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar6.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Patricia Lova</q-item-section>
          <q-item-section side center>
            <q-item-label>
              7 Reportes
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-slide-item>
      <q-slide-item @left="onLeft" @right="onRight">
        <template v-slot:left>
          <div class="row items-center"><q-icon left name="done" /> Left</div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Right content.. long <q-icon right name="alarm" />
          </div>
        </template>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Pedro Loco</q-item-section>
          <q-item-section side center>
            <q-item-label>
              3 Reportes
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { Loading, QSpinnerGears } from "quasar";
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
    ...mapGetters("client", ["getClienteReport"])
  },
  methods: {
    ...mapActions("client", ["callClienteReport"]),
    async URL(arg) {
      await this.$router.push(arg);
    },
    showLoading() {
      this.$q.loading.show();

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
    onLeft() {},
    onRight() {}
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  components: {
    Graficas: () => import("components/Charts")
  },
  created() {
    console.log("########################################");
    Loading.show();
    this.showLoading();
    this.callClienteReport();
    // this.$q.loading.hide();
  }
};
</script>
