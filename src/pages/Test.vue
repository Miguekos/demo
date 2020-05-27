<template>
  <div>
    Battery status is:
    <strong>{{ batteryStatus }}</strong>
    <div>
      <q-btn color="primary" label="Get Picture" @click="captureImage" />

      <img :src="imageSrc" />
    </div>
    <div>IMEI {{ IMEI }}</div>
    info: {{ info }}
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Account settings"
      caption="John Doe"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      info: "",
      batteryStatus: "determining...",
      imageSrc: "",
      IMEI:
        window.device === void 0
          ? "Run this on a mobile/tablet device"
          : window.device
    };
  },
  methods: {
    updateBatteryStatus(status) {
      this.batteryStatus = `Level: ${status.level}, plugged: ${status.isPlugged}`;
    },
    onDeviceReady() {
      // this.info = StatusBar;
      // StatusBar.show;
      // StatusBar.overlaysWebView(true);
      // StatusBar.styleLightContent();
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByName("white");
      // StatusBar.backgroundColorByName("red");
    },
    captureImage() {
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          // camera options
        }
      );
    }
  },
  created() {
    this.$q.addressbarColor.set("#FFFFFF");
    window.addEventListener("batterystatus", this.updateBatteryStatus, false);
    window.addEventListener("deviceready", this.onDeviceReady, false);
    // #004d40
  },
  beforeDestroy() {
    // we do some cleanup;
    // we need to remove the event listener
    window.removeEventListener(
      "batterystatus",
      this.updateBatteryStatus,
      false
    );
    window.addEventListener("deviceready", this.onDeviceReady, false);
  }
};
</script>
