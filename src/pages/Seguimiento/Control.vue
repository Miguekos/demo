<template>
  <div>
    <q-list>
      <q-item dense clickable v-ripple>
        <q-item-section
          class="text-red text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6">{{
            getSeguiObserva.name
          }}</q-item-label>
          <q-separator color="red-4" inset />
        </q-item-section>
        <!--          <q-item-section class="text-red text-bold" side top right>-->
        <!--            <q-icon name="archive" />-->
        <!--          </q-item-section>-->
      </q-item>
    </q-list>
    <q-list>
      <q-item class="q-pb-xs">
        <q-item-section>
          <q-select
            color="red-5"
            label="Sintomas"
            filled
            v-model="sintomas"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pb-xs">
        <q-item-section>
          <q-select
            color="red-5"
            label="Medicacion"
            filled
            v-model="medicacion"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            color="red-5"
            v-model="detalle"
            label="Comentario"
            filled
            autogrow
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn @click="update" color="green-5">Dar de Alta</q-btn>
        </q-item-section>
        <q-item-section>
          <q-btn @click="update" color="red-5">Confirmar</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list separator>
      <q-item>
        <q-item-section class="text-center">
          <q-card
            v-for="(items, index) in getSeguiObserva.observa"
            :key="index"
            style="margin: 10px 0px 10px 0px"
          >
            <q-list bordered separator>
              <q-card-section class="text-center">
                <q-item-label class="text-bold">{{
                  items.nombre
                }}</q-item-label>
                <q-item-label caption>{{
                  formatFecha(items.fecha)
                }}</q-item-label>
              </q-card-section>
              <!--              <q-item clickable v-ripple>-->
              <!--                <q-item-section>-->
              <!--                  <q-item-label>{{ items.nombre }}</q-item-label>-->
              <!--                </q-item-section>-->
              <!--                <q-item-section>-->
              <!--                  <q-item-label caption>{{-->
              <!--                    formatFecha(items.fecha)-->
              <!--                  }}</q-item-label>-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->
              <q-item clickable v-ripple>
                <q-item-section class="text-left">
                  <q-item-label class="text-bold">Sintomas:</q-item-label>
                </q-item-section>
                <q-item-section class="text-left">
                  <q-item-label class="text-bold">Medicamentos:</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section class="text-left">
                  <q-item-label
                    v-for="(sintoma, index) in items.sintomas"
                    :key="index"
                  >
                    - {{ sintoma }}</q-item-label
                  >
                </q-item-section>
                <q-item-section class="text-left">
                  <q-item-label
                    v-for="(medicamentos, index) in items.medicacion"
                    :key="index"
                  >
                    - {{ medicamentos }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-section class="text-center">
              <q-item-label class="text-bold">Observación:</q-item-label>
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
    // ...mapState("segui", ["seguiObserva"]),
    ...mapGetters("segui", ["getSeguiFilter", "getSeguiObserva"])
  },
  data() {
    return {
      sintomas: null,
      medicacion: null,
      detalle: null,
      arrayObserva: []
    };
  },
  methods: {
    ...mapActions("segui", ["updateRegistroSegui", "callRegistroSegui"]),
    async update() {
      if (this.detalle != null) {
        this.$store.commit("segui/addObserva", {
          observa: {
            nombre: this.arrayObserva.name,
            fecha: new Date(),
            detalle: this.detalle,
            color: "red-5",
            sintomas: this.sintomas,
            medicacion: this.medicacion
          },
          sintomas: this.sintomas,
          medicacion: this.medicacion
        });
        try {
          const updateResponse = await this.updateRegistroSegui(
            this.getSeguiObserva
          );
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
    // this.$store.commit("segui/addSeguiObserva", this.getSeguiFilter);
    const dataSG = await this.getSeguiFilter;
    this.arrayObserva = dataSG;
    this.sintomas = dataSG.sintomas;
    this.medicacion = dataSG.medicacion;
  }
};
</script>

<style scoped></style>
