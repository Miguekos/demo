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

      <q-input
        dense
        v-model="edad"
        label="Edad *"
        lazy-rules
        counter
        :rules="[
          val => (val && val.length > 0) || 'Por favor no puede estar vacio'
        ]"
      />

      <q-select
        dense
        options-dense
        v-model="sexo"
        :options="optionsSexo"
        label="Sexo"
        emit-value
        map-options
        :rules="[val => !!val || 'Campo obligatorio']"
      />

      <q-input
        dense
        v-model="departamento"
        label="Departamento *"
        lazy-rules
        counter
        :rules="[
          val => (val && val.length > 0) || 'Por favor no puede estar vacio'
        ]"
      />

      <q-select
        color="red-5"
        name="cargo"
        dense
        v-model="cargo"
        :options="getCargo"
        option-label="name"
        option-value="registro"
        emit-value
        map-options
        label="Cargo"
        :rules="[val => !!val || 'Campo obligatorio']"
      />

      <q-input
        dense
        v-model="sueldo"
        label="Sueldo *"
        lazy-rules
        counter
        :rules="[
          val => (val && val.length > 0) || 'Por favor no puede estar vacio'
        ]"
      />

      <q-select
        color="red-5"
        name="area"
        dense
        v-model="area"
        :options="getArea"
        option-label="name"
        option-value="registro"
        emit-value
        map-options
        label="Área"
        :rules="[val => !!val || 'Campo obligatorio']"
      />

      <q-select
        color="red-5"
        name="jefeDirecto"
        dense
        v-model="jefeDirecto"
        :options="getUsers"
        option-label="name"
        option-value="dni"
        emit-value
        map-options
        label="Jefe Directo"
        :rules="[val => !!val || 'Campo obligatorio']"
      />

<!--      {{ jefeDirecto }}-->

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
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("users", ["getUsers"]),
    ...mapGetters("utils", ["getArea", "getCargo"])
  },
  data() {
    return {
      jefeDirecto: null,
      loadBoton: false,
      name: null,
      dni: null,
      email: null,
      edad: null,
      sexo: null,
      departamento: null,
      cargo: null,
      sueldo: null,
      telefono: null,
      area: "",
      options: ["Producción", "Ventas", "Administración", "Gerencia"],
      optionsSexo: [
        {
          label: "MASCULINO",
          value: 1
        },
        {
          label: "FEMENINO",
          value: 2
        }
      ]
    };
  },
  methods: {
    ...mapActions("users", ["addUser", "callUser"]),
    ...mapActions("utils", ["callCargo", "callArea"]),
    cerrar() {
      // console.log("Se preciono Cerrar");
    },
    onSubmit() {
      this.loadBoton = true;
      this.addUser({
        name: this.name,
        dni: this.dni,
        email: this.email,
        edad: this.edad,
        sexo: this.sexo,
        departamento: this.departamento,
        cargo: this.cargo,
        sueldo: this.sueldo,
        telefono: this.telefono,
        area: this.area,
        temp: "00",
        jefeDirecto: this.jefeDirecto,
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
              message: `¡ Se registro satisfactoriamente el usuario !`,
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
      this.edad = null;
      this.sexo = null;
      this.departamento = null;
      this.cargo = null;
      this.sueldo = null;
      this.jefeDirecto = null;
    }
  },
  async created() {
    await this.callCargo();
    await this.callArea();
    await this.callUser();
  }
};
</script>
