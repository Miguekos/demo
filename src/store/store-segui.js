import { axiosInstance } from "boot/axios";

const state = {
  Seguimientos: [],
  SeguimientosFilter: [],
  dialogDetalleSegui: false,
  dialogDetalleSeguiData: "",
  setSeguimientosOne: [],
  seguiObserva: [],
  SeguimientosCuidate: [],
  SeguimientosDealta: []
};

const mutations = {
  addObserva(state, payload) {
    // console.log(payload);
    state.seguiObserva.observa.push(payload.observa);
    state.seguiObserva.sintomas = payload.sintomas;
    state.seguiObserva.medicacion = payload.medicacion;
  },
  setSeguimientos(state, payload) {
    state.Seguimientos = payload;
  },
  setSeguimientosCuidate(state, payload) {
    state.SeguimientosCuidate = payload;
  },
  setSeguimientosDealta(state, payload) {
    state.SeguimientosDealta = payload;
  },
  setSeguimientosFilter(state, payload) {
    state.SeguimientosFilter = payload;
    state.seguiObserva = payload;
  },
  setRole(state, payload) {
    state.role = payload;
  },
  setSeguimientosOne(state, payload) {
    state.setSeguimientosOne = payload;
  },
  setDialogSeguiDetalle(state, payload) {
    state.dialogDetalleSegui = payload;
  },
  setDialogDetalleSeguiData(state, payload) {
    state.dialogDetalleSeguiData = payload;
  }
};

const actions = {
  async callRegistroSegui({ commit }, payload) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.get(`/seguimiento/${payload}`);
    // console.log(response.data);
    if (payload == "all") {
      commit("setSeguimientos", response.data);
    } else {
      commit("setSeguimientosFilter", response.data);
    }
    // return response.data;
  },
  async callSeguiCuidate({ commit }) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.get(`/seguimiento/seguimiento`);
    // console.log(response.data);
    commit("setSeguimientosCuidate", response.data);
    // return response.data;
  },
  async callSeguiDealta({ commit }) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.get(`/seguimiento/dealta`);
    // console.log(response.data);
    commit("setSeguimientosDealta", response.data);
    // return response.data;
  },
  async callOneRegistroSegui({ commit }, payload) {
    // console.log("Login");
    console.log(payload);
    const response = await axiosInstance.get(`/seguimientoOne/${payload}`);
    // console.log(response.data);
    commit("setSeguimientosOne", response.data);
    // return response.data;
  },
  async addRegistroSegui({ commit }, payload) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.post(`/seguimiento`, payload);
    // console.log(response.data);
    // commit("setClientes", response.data);
    return response.data;
  },
  async updateRegistroSegui({ commit }, payload) {
    // console.log("Login");
    console.log(payload);
    const response = await axiosInstance.put(`/seguimiento`, payload);
    // console.log(response.data);
    // commit("setClientes", response.data);
    return response.data;
  },
  async deleteRegistroSegui({ commit }, payload) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.delete(`/seguimiento/${payload}`);
    // console.log(response.data);
    // commit("setClientes", response.data);
    return response.data;
  }
};

const getters = {
  ordenarObserva: state => {
    let ordenarObserva = {},
      keysOrdenar = Object.keys(state.seguiObserva.observa);

    keysOrdenar.sort((a, b) => {
      let taskAProp = state.seguiObserva.observa[a].fecha,
        taskBProp = state.seguiObserva.observa[b].fecha;
      console.log("taskAProp", taskAProp);
      console.log("taskBProp", taskBProp);

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdenar.forEach(key => {
      ordenarObserva[key] = state.seguiObserva.observa[key];
    });

    return ordenarObserva;
  },
  getSeguimientos(state) {
    return state.Seguimientos;
  },
  getDialogDetalleSeguiData(state) {
    return state.dialogDetalleSeguiData;
  },
  getSeguimientoOne(state) {
    console.log(state.setSeguimientosOne);
    return state.setSeguimientosOne;
  },
  getSeguiObserva(state) {
    return state.seguiObserva;
  },
  getSeguiObservaOrden(state, getters) {
    let tasksFiltered = getters.ordenarObserva;
    console.log(tasksFiltered);
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    console.log(tasks);
    return tasks;
  },
  getSeguiFilter(state) {
    return state.SeguimientosFilter;
  },
  getSeguiCuidate(state) {
    return state.SeguimientosCuidate;
  },
  getSeguiDealta(state) {
    return state.SeguimientosDealta;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
