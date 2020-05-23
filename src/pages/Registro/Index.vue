<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <div id="corazon" class="flex flex-center">
      <q-img
        color="grey"
        style="height: 170px; max-width: 180px;"
        alt="Roseline logo"
        src="~assets/lococorazon.png"
      />
    </div>
    <div class="full-width">
      <Listas />
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    Listas: () => import("components/Listas")
  }
};
</script>
<style>
#corazon {
  animation-name: marcos;
  animation-duration:5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

@keyframes marcos{
  0%{
    transform: scale(1,1);
  }
  25%{

    transform: scale(0.9,0.9);
  }
  50%{

    transform: scale(1,1);
  }
  75%{
    transform: scale(0.9,0.9);
  }
}
</style>
