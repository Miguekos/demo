import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'
import auth from "./store-auth";
import client from "./store-cliente";
import users from "./store-users";
import segui from "./store-segui";
import asist from "./store-asist";
import doc from "./store-doc";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      client,
      users,
      auth,
      segui,
      asist,
      doc
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
