<template>
  <!--  <div class="q-pa-md" style="max-width: 400px">-->
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
      <q-input
        dense
        v-model="name"
        label="Nombres y Apellidos*"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Por favor escribe el Nombre'
        ]"
      />

      <q-input
        dense
        maxlength="9"
        type="number"
        v-model="dni"
        label="DNI/CE *"
        lazy-rules
        counter
        :rules="[
          val =>
            (val && val.length > 0 && val.length < 10) ||
            'Por favor escribe el DNI'
        ]"
      />

      <q-input
        dense
        type="email"
        v-model="email"
        label="Correo *"
        lazy-rules
        counter
        :rules="[
          val => (val && val.length > 0) || 'Por favor escribe el Correo'
        ]"
      />

      <q-input
        dense
        maxlength="9"
        type="number"
        counter
        v-model="telefono"
        label="Telefono *"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Por favor escribe el Telefono'
        ]"
      />

      <q-select
        color="red-5"
        name="area"
        dense
        v-model="area"
        :options="options"
        label="Área"
      />

      <q-separator />

      <div class="row" align="right">
        <div class="col-6 q-pa-xs">
          <q-btn
            push
            class="full-width"
            outline
            label="Salir"
            color="negative"
            type="reset"
            v-close-popup
          />
        </div>
        <div class="col-6 q-pa-xs">
          <q-btn
            class="full-width"
            outline
            label="Agregar"
            color="positive"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: null,
      dni: null,
      email: null,
      telefono: null,
      area: "",
      options: ["Producción", "Ventas", "Administración", "Gerencia"]
    };
  },
  methods: {
    ...mapActions("users", ["addUser", "callUser"]),
    cerrar() {
      console.log("Se preciono Cerrar");
    },
    onSubmit() {
      this.addUser({
        name: this.name,
        dni: this.dni,
        email: this.email,
        telefono: this.telefono,
        area: this.area,
        temp: "00",
        role: 2
      })
        .then(resp => {
          if (resp.codRes == "02") {
            this.$q.notify({
              color: "blue-4",
              textColor: "white",
              icon: "cloud_done",
              message: `DNI ya resgistrado ${resp.message}`
            });
          } else {
            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "cloud_done",
              position: "top-right",
              message: `Cliente ID: ${resp}`
            });
            this.callUser();
            this.$emit("cerrarDialogo");
          }
        })
        .catch(err => {
          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: `${err.data}`
          });
        });
    },
    onReset() {
      this.name = null;
      this.dni = null;
      this.email = null;
      this.telefono = null;
    }
  }
};
</script>
