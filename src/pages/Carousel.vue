<template>
  <div class="q-pa-md">
    <!--    {{ info }}-->
    <q-carousel
      swipeable
      animated
      arrows
      navigation-icon="radio_button_unchecked"
      control-type="regular"
      control-color="red"
      control-text-color="white-8"
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      height="550px"
      infinite
    >
      <q-carousel-slide
        v-for="(items, index) in urls"
        :key="index"
        :name="items.name"
      >
        <div style="width: 100%; height: 500px">
          <!--          <embed-->
          <!--            :src="`https://api.apps.com.pe/fileserver/uploads/${items.url}`"-->
          <!--            type="application/pdf"-->
          <!--            width="100%"-->
          <!--            height="500"-->
          <!--          />-->
          <q-pdfviewer
            v-model="visible"
            :src="`https://api.apps.com.pe/fileserver/uploads/${items.url}`"
            type="html5"
          />
          <!--          <iframe-->
          <!--            :src="`https://api.apps.com.pe/fileserver/uploads/${items.url}`"-->
          <!--            width="100%"-->
          <!--            height="500"-->
          <!--          >-->
          <!--          </iframe>-->
        </div>
      </q-carousel-slide>
      <!--      <template v-slot:control>-->
      <!--        <q-carousel-control-->
      <!--          position="bottom-right"-->
      <!--          :offset="[18, 18]"-->
      <!--          class="q-gutter-xs"-->
      <!--        >-->
      <!--          <q-btn-->
      <!--            push-->
      <!--            round-->
      <!--            dense-->
      <!--            color="orange"-->
      <!--            text-color="black"-->
      <!--            icon="arrow_left"-->
      <!--            @click="$refs.carousel.previous()"-->
      <!--          />-->
      <!--          <q-btn-->
      <!--            push-->
      <!--            round-->
      <!--            dense-->
      <!--            color="orange"-->
      <!--            text-color="black"-->
      <!--            icon="arrow_right"-->
      <!--            @click="$refs.carousel.next()"-->
      <!--          />-->
      <!--        </q-carousel-control>-->
      <!--      </template>-->
    </q-carousel>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      visible: true,
      slide: 0,
      autoplay: false,
      urls: [],
      lorem: "Lorem ipsum "
    };
  },
  created() {
    for (var i = 0; i < this.info.length; i++) {
      const asd = this.info[i];
      console.log("asd", asd.docs);
      this.urls.push({
        name: i,
        url: asd.docs
      });
    }
  }
};
</script>
<style scoped></style>
