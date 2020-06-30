<template>
  <div>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center">
            Control de: {{ getSeguimientos.name }}
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
              <q-item-label caption>{{ items.fecha }}</q-item-label>
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
export default {
  name: "Control",
  computed: {
    // ...mapState("segui", ["getSeguimientos"]),
    ...mapGetters("segui", ["getSeguimientos"])
  },
  data() {
    return {
      detalle: null
    };
  },
  methods: {
    ...mapActions("segui", ["updateRegistroSegui", "callRegistroSegui"]),
    async update() {
      if (this.detalle.length > 0) {
        let jsonObserva = this.getSeguimientos.observa;
        const jsonEnviar = {
          ...this.getSeguimientos,
          observa: jsonObserva
        };
        jsonObserva.push({
          nombre: this.getSeguimientos.name,
          fecha: new Date(),
          detalle: this.detalle,
          color: "red-5"
        });
        try {
          const updateResponse = await this.updateRegistroSegui(jsonEnviar);
          console.log(updateResponse);
          this.detalle = null;
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log(e);
      }
    }
  },
  async created() {
    console.log(this.$route.params.id);
    await this.callRegistroSegui(this.$route.params.id);
  }
};
</script>

<style scoped></style>
