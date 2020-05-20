<template>
  <div class="q-pa-md">
    <q-stepper
      class="full-width"
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step :name="1" title="Dolor de Cabeza?" icon="settings" :done="step > 1">
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Si" />
          <q-btn @click="step = 2" color="primary" label="No" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Fiebre?"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Si" />
          <q-btn @click="step = 3" color="primary" label="No" class="q-ml-sm" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Dolor de Huesos?" icon="add_comment">
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Si" />
          <q-btn @click="step = 4" color="primary" label="No" class="q-ml-sm" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="Problemas para respirar?" icon="add_comment">
        <q-stepper-navigation>
          <q-btn color="primary" label="Terminar" />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1
    };
  }
};
</script>
