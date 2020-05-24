<template>
  <q-page id="corazon" class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/lococorazon.png"
      style="width: 350px; height: 350px"
    />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  methods: {
    showLoading() {
      this.$q.loading.show();

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    }
  },

  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },

  created() {
    // this.showLoading();
  }
};
</script>
