<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense class="bg-primary text-white">
      Unfortunately, the credit card did not go through, please try again.
      <template v-slot:action>
        <q-btn flat color="white" label="Descartar" />
        <q-btn flat color="white" label="LLamar" />
      </template>
    </q-banner>

    <q-banner dense class="bg-primary text-white">
      Unfortunately, the credit card did not go through, please try again.
      <template v-slot:action>
        <q-btn flat color="white" label="Descartar" />
        <q-btn flat color="white" label="LLamar" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
  name: "Index"
};
</script>

<style scoped></style>
