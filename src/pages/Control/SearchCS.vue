<template>
  <div class="">
    <q-input
      dense
      standout="bg-red-4 text-white"
      type="search"
      placeholder="Buscar por nombre"
      v-model="searchField"
    >
      <!--      <template v-slot:before>-->
      <!--        <q-icon name="search" />-->
      <!--      </template>-->
      <template v-slot:append>
        <q-icon
          v-if="searchField !== ''"
          name="close"
          @click="searchField = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      text: "",
      ph: "",
      dense: false
    };
  },
  computed: {
    ...mapState("client", ["searchCS"]),
    searchField: {
      get() {
        console.log("this.searchCS", this.searchCS);
        return this.searchCS;
      },
      set(value) {
        this.setSearchCS(value);
        console.log(value);
      }
    }
  },
  methods: {
    ...mapActions("client", ["setSearchCS"])
  }
};
</script>

<style scoped></style>
