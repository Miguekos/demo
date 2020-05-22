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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-black">
          <b class="text-green">C</b>uid<b class="text-red">APP</b>te
        </q-toolbar-title>

        <div class="text-black">v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Perfil</q-item-label
          >
          <q-separator spaced />
          <q-list>
            <q-item clickable v-ripple class="justify-center">
              <q-avatar
                size="100px"
                font-size="52px"
              >
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-item-label>Miguel Rodriguez</q-item-label>
                <q-item-label caption>miguekos1233@gmail.com</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Inicio",
          caption: "Inicio",
          icon: "dashboard",
          link: "/#/"
        },
        {
          title: "Reportes",
          caption: "Estadisticas",
          icon: "assessment",
          link: "/#/dashboard"
        },
        {
          title: "Registro",
          caption: "Evaluacion",
          icon: "assignment",
          link: "/#/registro"
        },
        {
          title: "Listas Sanos",
          caption: "Detalle",
          icon: "group",
          link: "/#/detalles"
        },
        {
          title: "Listas Con Sintomas",
          caption: "Detalle",
          icon: "group",
          link: "/#/detallecs"
        },
        {
          title: "Login",
          caption: "Iniciar Sesion",
          icon: "face",
          link: "/#/login"
        },
        {
          title: "Salir",
          caption: "Cerrar Session",
          icon: "logout"
          // link: 'https://chat.quasar.dev'
        }
      ]
    };
  }
};
</script>
