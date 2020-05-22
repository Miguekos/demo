import { axiosInstance } from "boot/axios";
const state = {};

const mutations = {};

const actions = {
  async login({ commit }, payload) {
    console.log("Login");
    console.log(payload);
    const response = await axiosInstance.post(`/login`, payload);
    console.log(response.data);
    // commit("setClientes", response.data);
    return response.data;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
