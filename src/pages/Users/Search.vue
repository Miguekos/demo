<template>
  <div class="">
    <q-input
      dense
      standout="bg-grey-4 text-white"
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
    ...mapState("users", ["search"]),
    searchField: {
      get() {
        // console.log("this.search", this.search);
        return this.search;
      },
      set(value) {
        this.setSearch(value);
        // console.log(value);
      }
    }
  },
  methods: {
    ...mapActions("users", ["setSearch"])
  }
};
</script>

<style scoped></style>
