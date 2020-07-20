<template>
  <div>
    <q-list class="text-center" separator bordered>
      <q-item>
        <q-item-section>
          Areas
        </q-item-section>
      </q-item>
      <q-form @submit="insertArea">
        <q-item>
          <q-item-section>
            <q-input dense v-model="newcargo" label="Agregar area"></q-input>
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
            :info="getArea"
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
  name: "Area",
  computed: {
    ...mapGetters("utils", ["getArea"])
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
    ...mapActions("utils", ["callArea", "addArea", "delArea"]),
    async eliminar(val) {
      console.log("eliinar", val._id.$oid);
      try {
        const resp = await this.delArea(val._id.$oid);
        this.$q.notify({
          // progress: true,
          message: "¡Se elimino correctamente!",
          // icon: "favorite_border",
          icon: "close",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
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
    async insertArea() {
      this.loadboton = true;
      try {
        const resp = await this.addArea({
          name: this.newcargo
        });
        await this.callArea();
        this.newcargo = "";
        this.loadboton = false;
      } catch (e) {
        console.log(e);
        this.loadboton = false;
      }
    }
  },
  async created() {
    await this.callArea();
    this.seeTable = true;
  }
};
</script>

<style scoped></style>
