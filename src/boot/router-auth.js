// import something here

// "async" is optional
import el from "quasar/lang/el";
import { LocalStorage, Notify } from "quasar";

export default ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    try {
      const allLocal = LocalStorage.getAll();
      console.log(allLocal.fechaInicioSession);
      const qwe = new Date() - allLocal.fechaInicioSession;
      console.log(qwe);
      const espirar = 10800000;
      // const espirar = 1000;
      if (qwe > espirar) {
        LocalStorage.remove("loggin");
        LocalStorage.remove("role");
        LocalStorage.remove("idUser");
        LocalStorage.remove("fechaInicioSession");
        LocalStorage.remove("UserDetalle");
        Notify.create({
          // progress: true,
          message: "¡ Tu tiempo expiro - Inicia sesión !",
          // icon: "favorite_border",
          icon: "alarm_off",
          color: "white",
          textColor: "blue-5",
          position: "top"
        });
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(to, to);
    // console.log(from, from);
    // LocalStorage.set("loggin", false);
    // let logginIn = false;
    let logginIn = LocalStorage.getAll().loggin;
    // console.log(logginIn);
    if (!logginIn && to.path !== "/auth") {
      // console.log(logginIn);
      // console.log("to.path", to.path);
      next("/auth");
    } else {
      next();
    }
  });
};
