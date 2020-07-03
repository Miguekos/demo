<template>
  <div v-if="coordsMaps">
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="`marker_${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
      <GmapCircle :center="center" :radius="info.accuracy" />
    </GmapMap>
    <!--    {{ $data }}-->
  </div>
</template>

<script>
// import { mapGeolocationGetters } from "quasar-app-extension-geolocation/src/store";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      coordsMaps: false,
      coords: null,
      latitude: null,
      longitude: null
      // center: [],
      // centerMapper: []
    };
  },
  computed: {
    center() {
      return (
        this.coords && {
          lat: this.latitude,
          lng: this.longitude
        }
      );
    },
    centerMapper() {
      return this.center && { position: this.center };
    },
    markers() {
      return this.centerMapper ? [this.centerMapper] : [];
    },
    ...mapGetters("asist", ["getAsistOne"])
  },
  methods: {
    ...mapActions("asist", ["callAsistOne"])
  },
  created() {
    this.coords = this.info.coords;
    this.latitude = this.info.latitude;
    this.longitude = this.info.longitude;
    this.coordsMaps = true;
    // this.callAsistOne(this.info.id);
  }
};
</script>
