<template>
  <q-layout view="lHr LpR lFf">
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

        <q-toolbar-title class="text-black">
          <span v-ripple:white class="cursor-pointer" @click="home()">
            <b class="text-green">C</b>uid<b class="text-red">APP</b>te
          </span>
        </q-toolbar-title>

        <div v-if="role == 3" class="text-black">v{{ $q.version }}</div>
        <q-btn
          flat
          dense
          round
          size="sm"
          color="black"
          icon="settings"
          aria-label="Menu"
          @click="(drawerRight = !drawerRight), actualizar()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Configuracion
          </q-item-label>
          <q-separator spaced />
        </q-item-label>
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Perfil
          </q-item-label>
          <q-separator spaced />
          <q-list>
            <q-item
              @click="detalleCliente()"
              clickable
              v-ripple
              class="justify-center"
            >
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog full-width v-model="dialogDetalle">
      <detalleDeLosUsuarios />
    </q-dialog>
    <q-dialog full-width v-model="dialogDetalleSegui">
      <detalleSeguimiento />
    </q-dialog>
  </q-layout>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import EssentialLink from "components/EssentialLink";
import detalleDeLosUsuarios from "components/DetalleGeneral";
import detalleSeguimiento from "components/DetalleSeguimiento";
import { LocalStorage } from "quasar";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    detalleDeLosUsuarios,
    detalleSeguimiento
  },
  computed: {
    // ...mapGetters('client',["dialogDetalle"]),
    ...mapState("client", ["dialogDetalle"]),
    ...mapState("segui", ["dialogDetalleSegui"]),
    urlImagen() {
      return `${this.infoUrl}/uploads/${this.userdatil.profile}`;
    }
  },
  data() {
    return {
      infoUrl: "",
      role: null,
      userdatil: {},
      drawerRight: false,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Reportes",
          caption: "Estadísticas",
          icon: "assessment",
          link: "/dashboard"
        },
        {
          title: "Control",
          caption: "Control",
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
          title: "Cuídate",
          caption: "Lleva tu control",
          icon: "favorite",
          link: "/cuidate"
        },
        {
          title: "Documentos",
          caption: "Certificado",
          icon: "note_add",
          link: "/certificado"
        },
        {
          title: "Asistencia",
          caption: "Control personal",
          icon: "done",
          link: "/asistencia"
        },
        // {
        //   title: "Personal con síntomas",
        //   caption: "Detalle",
        //   icon: "sentiment_very_dissatisfied",
        //   link: "/detallecs"
        // },
        {
          title: "Seguimiento",
          caption: "Personal médico",
          icon: "supervised_user_circle",
          link: "/seguimiento"
        },
        {
          title: "Asistencias",
          caption: "Control personal",
          icon: "done_all",
          link: "/asistenciaDetalle"
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
        },
        {
          title: "Cuídate",
          caption: "Lleva tu control",
          icon: "favorite",
          link: "/cuidate"
        },
        {
          title: "Documentos",
          caption: "Certificado",
          icon: "note_add",
          link: "/certificado"
        },
        {
          title: "Asistencia",
          caption: "Control personal",
          icon: "done",
          link: "/asistencia"
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
      // LocalStorage.clear();
      LocalStorage.remove("loggin");
      LocalStorage.remove("role");
      LocalStorage.remove("idUser");
      LocalStorage.remove("fechaInicioSession");
      LocalStorage.remove("UserDetalle");
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
    this.infoUrl = process.env.Imagen_URL;
  }
};
</script>
