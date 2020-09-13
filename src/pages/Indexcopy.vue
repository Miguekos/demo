<template>
  <div id="" class="flex flex-center">
    <!--    {{ getDocsAll[0].docs }}-->
    <!--    {{ getDocsAll }}-->
    <img
      v-if="!getDocsAll[0]"
      alt="Logo Principal"
      src="~assets/4565-heartbeat-medical.gif"
      style="width: 350px; height: 350px"
    />

    <q-list v-if="getDocsAll[0]" class="full-width full-height">
      <q-item class="text-center">
        <q-item-section>
          <!--          <q-item-label header class="text-bold text-h5"-->
          <!--            >Comunicado</q-item-label-->
          <!--          >-->
          <!--          {{ getDocsAll[0].comentario }}-->
          <!--          <Comunicados :info="getDocsAll" />-->
          <PdfViewer :info="getDocsAll" />
        </q-item-section>
      </q-item>
      <!--      <q-item>-->
      <!--        <q-item-section>-->
      <!--          <embed-->
      <!--            alt="Comunicado Imagen"-->
      <!--            :src="vercomunicado"-->
      <!--            style="height: 500px"-->
      <!--          />-->
      <!--        </q-item-section>-->
      <!--      </q-item>-->
    </q-list>
    <!-- {{ info }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      infoUser: null,
      info: ""
    };
  },
  components: {
    Comunicados: () => import("./Carousel"),
    PdfViewer: () => import("components/Pdfviewer")
  },
  computed: {
    ...mapGetters("comuni", ["getDocsAll", "getFile"]),
    vercomunicado() {
      return `https://api.apps.com.pe/fileserver/uploads/${this.getDocsAll[0].docs}`;
    }
  },
  methods: {
    ...mapActions("comuni", ["addDoc", "callComunicados", "addFiles"]),
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

  async created() {
    const infoUser = await this.$q.localStorage.getAll().UserDetalle;
    this.infoUser = infoUser;
    this.idUser = this.$q.localStorage.getAll().idUser;
    await this.callComunicados();
    // this.showLoading();
    this.info = process.env.API_URL;
  }
};
</script>
