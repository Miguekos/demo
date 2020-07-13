<template>
  <div class="q-pa-md">
    <!--    {{ urls }}-->
    <q-carousel
      swipeable
      animated
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
      infinite
    >
      <q-carousel-slide
        v-for="(items, index) in urls"
        :key="index"
        :name="items.name"
        :img-src="`https://api.apps.com.pe/fileserver/uploads/${items.url}`"
      />

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
      slide: 1,
      autoplay: true,
      urls: [],
      slide: "style",
      lorem: "Lorem ipsum "
    };
  },
  created() {
    for (var i = 0; i < this.info.length; i++) {
      const asd = this.info[i];
      console.log("asd", asd.docs);
      this.urls.push({
        name: i + 1,
        url: asd.docs
      });
    }
  }
};
</script>
<style scoped></style>
