<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-white">
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="(leftDrawerOpen = !leftDrawerOpen), actualizar()"
        />

        <q-toolbar-title @click="home()" class="text-black">
          <b class="text-green">C</b>uid<b class="text-red">APP</b>te
        </q-toolbar-title>

        <div class="text-black">v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs">Perfil</q-item-label>
          <q-separator spaced />
          <q-list>
            <q-item @click="detalleCliente()" clickable v-ripple class="justify-center">
              <q-avatar size="100px" font-size="52px">
                <img :src="urlImagen" />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-item-label>{{ userdatil.name }}</q-item-label>
                <q-item-label caption>{{ userdatil.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
        <EssentialLink
          v-if="role == 1"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <EssentialLink
          v-if="role == 2"
          v-for="link in essentialLinksUser"
          :key="link.title"
          v-bind="link"
        />
        <q-item clickable tag="a" @click="Logout()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption>Cerar sesíon</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="dialogDetalle">
      <detalleDeLosUsuarios />
    </q-dialog>
  </q-layout>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import EssentialLink from "components/EssentialLink";
import detalleDeLosUsuarios from "components/DetalleGeneral";
import { LocalStorage } from "quasar";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    detalleDeLosUsuarios
  },
  computed: {
    // ...mapGetters('client',["dialogDetalle"]),
    ...mapState("client", ["dialogDetalle"]),
    urlImagen() {
      return `${this.infoUrl}/uploads/${this.userdatil.profile}`;
    }
  },
  data() {
    return {
      infoUrl: "",
      role: null,
      userdatil: {},
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Reportes",
          caption: "Estadísticas",
          icon: "assessment",
          link: "/dashboard"
        },
        {
          title: "Mis registros",
          caption: "Evaluaciones",
          icon: "scatter_plot",
          link: "/misregistros"
        },
        {
          title: "Evalúate",
          caption: "Evaluación",
          icon: "local_hospital",
          link: "/registro"
        },
        {
          title: "Personal sanos",
          caption: "Detalle",
          icon: "sentiment_satisfied_alt",
          link: "/detalles"
        },
        {
          title: "Personal con sintomas",
          caption: "Detalle",
          icon: "sentiment_very_dissatisfied",
          link: "/detallecs"
        },
        {
          title: "Usuarios",
          caption: "Administrar",
          icon: "group",
          link: "/usuarios"
        }
      ],
      essentialLinksUser: [
        {
          title: "Inicio",
          caption: "Inicio",
          icon: "dashboard",
          link: "/"
        },
        {
          title: "Mis registros",
          caption: "Evaluaciones",
          icon: "scatter_plot",
          link: "/misregistros"
        },
        {
          title: "Evalúate",
          caption: "Evaluación",
          icon: "local_hospital",
          link: "/registro"
        }
      ]
    };
  },
  methods: {
    actualizar() {
      this.userdatil = LocalStorage.getAll().UserDetalle;
      // console.log(this.userdatil);
      this.role = LocalStorage.getAll().role;
    },
    detalleCliente(arg) {
      const idUser = LocalStorage.getAll().idUser;
      // console.log(idUser);
      this.$router.push(`/profile/${idUser}`);
    },
    home() {
      this.$router.push(`/`);
    },
    Logout() {
      this.$q.loading.show();
      LocalStorage.clear();
      // setTimeout(() => {
      this.$router.push("/auth");
      this.$q.notify({
        // progress: true,
        message: "Regresa pronto",
        // icon: "favorite_border",
        icon: "favorite",
        color: "white",
        textColor: "red-5",
        position: "top"
      });
      this.$q.loading.hide();
      // }, 2000);
    }
  },
  created() {
    this.userdatil = LocalStorage.getAll().UserDetalle;
    this.role = LocalStorage.getAll().role;
    this.infoUrl = process.env.API_URL;
  }
};
</script>
