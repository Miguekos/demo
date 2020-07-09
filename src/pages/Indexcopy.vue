<template>
  <q-page id="" class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/4565-heartbeat-medical.gif"
      style="width: 350px; height: 350px"
    />
    <!-- {{ info }} -->
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data () {
    return {
      info: ""
    }
  },
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
    this.info = process.env.API_URL
  }
};
</script>
