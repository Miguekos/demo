<template>
  <div class="column q-gutter-md">
    <sample-geolocation-button />
    <geolocation-permission-banner />
    <!--    <sample-position v-if="hasPosition" />-->
  </div>
</template>

<script>
import { mapGeolocationGetters } from "quasar-app-extension-geolocation/src/store";

import GeolocationPermissionBanner from "./GeolocationPermissionBanner";
import SampleGeolocationButton from "./SampleGeolocationButton";
import SamplePosition from "./SamplePosition";

export default {
  components: {
    GeolocationPermissionBanner,
    SampleGeolocationButton,
    SamplePosition
  },
  data() {
    return {};
  },
  computed: {
    ...mapGeolocationGetters(["hasPosition"])
  }
};
</script>
