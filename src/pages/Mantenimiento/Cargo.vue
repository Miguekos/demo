<template>
  <div>
    <q-list class="text-center" separator bordered>
      <q-item>
        <q-item-section>
          Cargos
        </q-item-section>
      </q-item>
      <q-form @submit="insertCargo">
        <q-item>
          <q-item-section>
            <q-input dense v-model="newcargo" label="Agregar cargo"></q-input>
          </q-item-section>
          <q-item-section side>
            <q-btn
              size="sm"
              :loading="loadboton"
              color="green"
              type="submit"
              label="agregar"
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-form>
      <q-item>
        <q-item-section>
          <TablaMantenimiento :info="getCargo" v-if="seeTable" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cargo",
  computed: {
    ...mapGetters("utils", ["getCargo"])
  },
  data() {
    return {
      loadboton: false,
      seeTable: false,
      newcargo: ""
    };
  },
  components: {
    TablaMantenimiento: () => import("components/TablaMantenimiento")
  },
  methods: {
    ...mapActions("utils", ["callCargo", "addCargo"]),
    async insertCargo() {
      this.loadboton = true;
      try {
        const resp = await this.addCargo({
          name: this.newcargo
        });
        await this.callCargo();
        this.newcargo = "";
        this.loadboton = false;
      } catch (e) {
        console.log(e);
        this.loadboton = false;
      }
    }
  },
  async created() {
    await this.callCargo();
    this.seeTable = true;
  }
};
</script>

<style scoped></style>
