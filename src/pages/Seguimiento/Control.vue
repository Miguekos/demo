<template>
  <div>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center">
            Control de: {{ getSeguimientos.name }}
            <!--            {{ getSeguiObserva }}-->
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section>
          <q-input v-model="detalle" filled autogrow />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn @click="update" color="indigo-5">Comentar</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section class="text-center">
          <q-card
            v-for="(items, index) in getSeguimientos.observa"
            :key="index"
          >
            <q-card-section>
              <q-item-label>{{ items.nombre }}</q-item-label>
              <q-item-label caption>{{
                formatFecha(items.fecha)
              }}</q-item-label>
            </q-card-section>
            <q-card-section class="text-center">
              <q-item-label>Comenta que:</q-item-label>
              {{ items.detalle }}
            </q-card-section>
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { MixinDefault } from "../../mixins/mixin";
export default {
  name: "Control",
  mixins: [MixinDefault],
  computed: {
    ...mapState("segui", ["seguiObserva"]),
    ...mapGetters("segui", ["getSeguimientos", "getSeguiObserva"])
  },
  data() {
    return {
      detalle: null,
      arrayObserva: []
    };
  },
  methods: {
    ...mapActions("segui", ["updateRegistroSegui", "callRegistroSegui"]),
    async update() {
      if (this.detalle != null) {
        this.$store.commit("segui/addObserva", {
          nombre: this.arrayObserva.name,
          fecha: new Date(),
          detalle: this.detalle,
          color: "red-5"
        });
        const jsonEnviar = {
          // ...this.arrayObserva,
          // observa: this.seguiObserva
          ...this.getSeguiObserva
        };
        try {
          const updateResponse = await this.updateRegistroSegui(jsonEnviar);
          console.log(updateResponse);
          this.detalle = null;
          await this.callRegistroSegui(this.$route.params.id);
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("No pueden existir campos vacios");
      }
    }
  },
  async created() {
    console.log(this.$route.params.id);
    await this.callRegistroSegui(this.$route.params.id);
    // this.$store.commit("segui/addSeguiObserva", this.getSeguimientos);
    this.arrayObserva = this.getSeguimientos;
  }
};
</script>

<style scoped></style>
