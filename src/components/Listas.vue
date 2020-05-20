<template>
  <div class="q-pa-sm">
    <q-list bordered padding>
      <q-item-label header>Como te sientes</q-item-label>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>¿Tienes Congestion Nasal?</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            size="50px"
            color="blue"
            v-model="notif1"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>¿Tienes tod frecuente y tos seca?</q-item-label>
          <!-- <q-item-label caption>Allow notification</q-item-label> -->
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            size="50px"
            v-model="notif2"
            color="green"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>¿Tienes dolor / picazon de garganta?</q-item-label>
          <!-- <q-item-label caption
            >Allow notification when uploading images</q-item-label
          > -->
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            size="50px"
            color="red"
            v-model="notif3"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-item class="q-pr-xs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>¿Tienes dolores musculares?</q-item-label>
          <!-- <q-item-label caption
            >Allow notification when uploading images</q-item-label
          > -->
        </q-item-section>
        <q-item-section side top>
          <q-toggle
            size="50px"
            color="red"
            v-model="notif4"
            checked-icon="check"
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Datos Personales</q-item-label>

      <q-item>
        <q-item-section>
          <q-input filled dense outlined v-model="text" label="Nombre" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input filled dense outlined v-model="text" label="DNI / C.E" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select square outlined v-model="model" :options="options" label="Square outlined" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn color="red" label="Cancelar" />
        </q-item-section>
        <q-item-section>
          <q-btn color="green" label="Confirmar" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      check1: true,
      check2: false,
      check3: false,
      check4: false,
      notif1: true,
      notif2: true,
      notif3: false,
      notif4: false,
      volume: 6,
      brightness: 3,
      mic: 8
    };
  },
  methods: {}
};
</script>
