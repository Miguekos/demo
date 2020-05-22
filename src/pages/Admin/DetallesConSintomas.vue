<template>
  <q-page padding>
    <q-list>
      <q-item dense clickable v-ripple>
        <q-item-section
          class="text-red text-bold"
          side
          top
          left
        ></q-item-section>
        <q-item-section>
          <q-item-label class="text-center text-h6">
            Con Sintomas
          </q-item-label>
           <q-separator color="red-4" inset/>
        </q-item-section>
        <q-item-section class="text-red text-bold" side top right>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            v-model="search"
            dense
            standout="bg-red-4 text-white"
            type="search"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list separator>
      <q-item v-for="(item, index) in nombres" :key="index" clickable v-ripple>
        <q-item-section>{{ item.name }} {{ item.lastname }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      search: "",
      nombres: [
        {
          name: "Luis",
          lastname: "Gonzales"
        },
        {
          name: "Maria",
          lastname: "Perez"
        },
        {
          name: "Ignacia",
          lastname: "Valdebenito"
        },
        {
          name: "Miguel",
          lastname: "Rodriguez"
        }
      ]
    };
  }
};
</script>
