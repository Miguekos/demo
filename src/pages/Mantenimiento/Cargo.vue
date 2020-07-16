<template>
  <div>
    <q-list class="text-center" separator bordered>
      <q-item>
        <q-item-section>
          Cargos
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input label="Agregar Area"></q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <TablaMantenimiento />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "Cargo",
  components: {
    TablaMantenimiento: () => import("components/TablaMantenimiento")
  }
};
</script>

<style scoped></style>
