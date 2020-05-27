<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {},
  methods: {},
  created() {
    this.$q.addressbarColor.set("#FFFFFF");
    // #004d40
  }
};
</script>
