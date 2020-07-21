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
            getSeguiFilter.name
          }}</q-item-label>
          <q-separator color="red-4" inset />
        </q-item-section>
        <!--          <q-item-section class="text-red text-bold" side top right>-->
        <!--            <q-icon name="archive" />-->
        <!--          </q-item-section>-->
      </q-item>
    </q-list>
    <!--    {{ getSeguiFilter }}-->

    <!--    <div v-for="(items, index) in getSeguiObservaOrden" :key="index">-->
    <!--      {{ items }}-->
    <!--      {{ index }}-->
    <!--    </div>-->
    <q-list>
      <q-item class="q-pb-xs">
        <q-item-section>
          <q-select
            color="red-5"
            label="Síntomas"
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
            label="Medicación"
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
      <q-item class="q-pb-xs">
        <q-item-section>
          <q-input
            v-model="temp"
            color="red-5"
            borderless
            filled
            label="Temperatura"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            color="red-5"
            v-model="detalle"
            label="Observación"
            filled
            autogrow
          />
        </q-item-section>
      </q-item>
      <q-item v-if="role === 3">
        <q-item-section>
          <q-btn @click="dealta" color="green-5">Dar de Alta</q-btn>
        </q-item-section>
        <q-item-section>
          <q-btn @click="update" color="red-5">Confirmar</q-btn>
        </q-item-section>
      </q-item>
      <q-item v-if="role !== 3">
        <q-item-section>
          <q-btn @click="update" color="red-5">Confirmar</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section>
          <TablaControl v-if="getSeguiFilter" :info="getSeguiFilter.observa" />
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
  components: {
    TablaControl: () => import("./TablaControl")
  },
  computed: {
    // ...mapState("segui", ["seguiObserva"]),
    ...mapGetters("segui", ["getSeguiFilter"])
  },
  data() {
    return {
      role: null,
      temp: null,
      sintomas: null,
      medicacion: null,
      detalle: null,
      arrayObserva: []
    };
  },
  methods: {
    ...mapActions("segui", ["updateRegistroSegui", "callRegistroSegui"]),
    ...mapActions("utils", ["addAlertas"]),
    async dealta() {
      this.$q
        .dialog({
          title: "¿Estas seguro que quieres dar de alta?",
          message: "Comentario",
          cancel: true,
          prompt: {
            isValid: val => val.length > 2, // << here is the magic
            model: "",
            type: "text" // optional
          },
          persistent: true,
          color: "red-5"
        })
        .onOk(async data => {
          // console.log('>>>> OK')
          try {
            const updateResponse = await this.updateRegistroSegui({
              _id: {
                $oid: this.$route.params.id
              },
              seguimiento: 0,
              dealta: 1,
              comentariodealta: data
            });
            const alertaResponse = await this.addAlertas({
              dni: this.getSeguiFilter.dni,
              comentario: data
            });
            console.log(updateResponse);
            this.detalle = null;
            this.temp = null;
            await this.callRegistroSegui(this.$route.params.id);
            this.$router.push(`/misregistros`);
          } catch (e) {
            console.log(e);
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    async update() {
      if (this.detalle != null || this.temp != null) {
        this.$store.commit("segui/addObserva", {
          observa: {
            nombre: this.arrayObserva.name,
            fecha: new Date(),
            detalle: this.detalle,
            color: "red-5",
            sintomas: this.sintomas,
            medicacion: this.medicacion,
            role: this.role,
            temp: this.temp
          },
          sintomas: this.sintomas,
          medicacion: this.medicacion
        });
        try {
          const updateResponse = await this.updateRegistroSegui(
            this.getSeguiFilter
          );
          console.log(updateResponse);
          this.detalle = null;
          await this.callRegistroSegui(this.$route.params.id);
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$q.notify({
          // progress: true,
          message: "¡No pueden existir campos vacios!",
          // icon: "favorite_border",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
    }
  },
  async created() {
    console.log(this.$route.params.id);
    await this.callRegistroSegui(this.$route.params.id);
    // this.$store.commit("segui/addSeguiObserva", this.getSeguiFilter);
    this.role = this.$q.localStorage.getAll().role;
    const dataSG = await this.getSeguiFilter;
    this.arrayObserva = dataSG;
    this.sintomas = dataSG.sintomas;
    this.medicacion = dataSG.medicacion;
  }
};
</script>

<style scoped></style>
