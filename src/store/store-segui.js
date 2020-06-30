import { axiosInstance } from "boot/axios";

const state = {
  Seguimientos: [],
  dialogDetalleSegui: false,
  dialogDetalleSeguiData: "",
  setSeguimientosOne: []
};

const mutations = {
  setSeguimientos(state, payload) {
    state.Seguimientos = payload;
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
    commit("setSeguimientos", response.data);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
