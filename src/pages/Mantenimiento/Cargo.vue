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
          <TablaMantenimiento
            @click="eliminar"
            :info="getCargo"
            v-if="seeTable"
          />
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
    ...mapActions("utils", ["callCargo", "addCargo", "delCargo"]),
    async eliminar(val) {
      console.log("eliinar", val._id.$oid);
      try {
        const resp = await this.delCargo(val._id.$oid);
        this.$q.notify({
          // progress: true,
          message: "¡Se elimino correctamente!",
          // icon: "favorite_border",
          icon: "close",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
        await this.callCargo();
        this.seeTable = true;
      } catch (e) {
        console.log(e);
        this.$q.notify({
          // progress: true,
          message: "¡Oh oh, tenemos un error!",
          // icon: "favorite_border",
          icon: "insert_emoticon",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
    },
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
