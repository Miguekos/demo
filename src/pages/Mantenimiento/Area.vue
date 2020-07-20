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
          <TablaMantenimiento :info="getArea" v-if="seeTable" />
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
    ...mapActions("utils", ["callArea", "addArea"]),
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
