import { axiosInstance } from "boot/axios";

const state = {
  Seguimientos: [],
  SeguimientosFilter: [],
  dialogDetalleSegui: false,
  dialogDetalleSeguiData: "",
  setSeguimientosOne: [],
  seguiObserva: [],
  SeguimientosCuidate: [],
  SeguimientosDealta: [],
  SeguimientosJefe: []
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
  },
  setSeguimientosJefe(state, payload) {
    state.SeguimientosJefe = payload;
  }
};

const actions = {
  async callRegistroSegui({ commit }, payload) {
    // console.log("Login");
    // console.log(payload);
    const response = await axiosInstance.get(`/seguimiento/${payload.id}?fi=${payload.fi}&ff=${payload.ff}`);
    // console.log(response.data);
    if (payload.id == "all") {
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
  async callSeguiCuidateJefe({ commit }, payload) {
    // console.log("Login");
    console.log(payload);
    const response = await axiosInstance.post(`/seguimientoJefe`, payload);
    console.log(response.data);
    commit("setSeguimientosJefe", response.data);
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
  getSeguiFilter(state) {
    return state.SeguimientosFilter;
  },
  getSeguiCuidate(state) {
    return state.SeguimientosCuidate;
  },
  getSeguiDealta(state) {
    return state.SeguimientosDealta;
  },
  getSeguimientosJefe(state) {
    return state.SeguimientosJefe;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
