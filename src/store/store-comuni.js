import { axiosInstance } from "boot/axios";
const state = {
  Archivos: [],
  file: "",
  files: [],
  fileload: false
};

const mutations = {
  setArchivos(state, payload) {
    state.Archivos = payload;
  },
  setFile(state, payload) {
    state.file = payload;
  },
  setFiles(state, payload) {
    state.files = payload;
  },
  setFileload(state, payload) {
    state.fileload = payload;
  }
};

const actions = {
  async callDocs({ commit }, payload) {
    const response = await axiosInstance.get(`/comunicados/${payload}`);
    commit("setArchivos", response.data);
  },
  async addDoc({ commit }, payload) {
    console.log("payload", payload);
    const response = await axiosInstance.post(`/comunicados`, payload);
    return response.data;
  },
  async delDoc({ commit }, payload) {
    console.log("payload", payload);
    const response = await axiosInstance.delete(`/comunicados/${payload}`);
    return response.data;
  },
  addFileName({ commit }, payload) {
    console.log("setFile", payload);
    commit("setFile", payload);
  },
  addFiles({ commit }, payload) {
    console.log("setFiles", payload);
    commit("setFiles", payload);
  }
};

const getters = {
  getFile(state) {
    return state.file;
  },
  getDocs(state) {
    return state.Archivos;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
