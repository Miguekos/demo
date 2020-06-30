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
        v-model="dni"
        label="DNI/CE *"
        mask="#########"
        unmasked-value
        lazy-rules
        counter
        :rules="[
          val =>
            (val && val.length > 7 && val.length < 10) ||
            'Por favor escribe el DNI de 8/9'
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
        counter
        v-model="telefono"
        label="Celular *"
        mask="### - ### - ###"
        unmasked-value
        lazy-rules
        :rules="[
          val => (val && val.length == 9) || 'Por favor escribe el Celular'
        ]"
      />

      <q-select
        color="red-5"
        name="area"
        dense
        v-model="area"
        :options="options"
        label="Área"
        :rules="[val => !!val || 'Compo obligatorio']"
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
            :loading="loadBoton"
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
import {mapActions} from "vuex";

export default {
    data() {
        return {
            loadBoton: false,
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
            // console.log("Se preciono Cerrar");
        },
        onSubmit() {
            this.loadBoton = true;
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
                            message: `DNI ya resgistrado`
                        });
                        this.loadBoton = false;
                    } else {
                        this.$q.notify({
                            // progress: true,
                            message: `¡ Se registro satisfactoriamente el usuario !`
                            // icon: "favorite_border",
                            icon: "cloud_done",
                            color: "white",
                            textColor: "green-5",
                            position: "top"
                        });
                        this.callUser();
                        this.loadBoton = false;
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
                    this.loadBoton = false;
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
