import { axiosInstance } from "boot/axios";

const state = {
  Cargo: null,
  Area: null,
  NotiCS: [],
  NotiCuidate: [],
  Alertas: []
};

const mutations = {
  setCallCargo(state, payload) {
    state.Cargo = payload;
  },
  setCallArea(state, payload) {
    state.Area = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  setUsersOne(state, payload) {
    state.UsersOne = payload;
  },
  setNotiCS(state, payload) {
    state.NotiCS = payload;
  },
  setNotiCuidate(state, payload) {
    state.NotiCuidate = payload;
  },
  setAlertas(state, payload) {
    state.Alertas = payload;
  }
};

const actions = {
  async callCargo({ commit }) {
    // console.log("callUser");
    const response = await axiosInstance.get(`/utils/1`);
    console.log("callCargo", response.data);
    commit("setCallCargo", response.data);
    // return response.data;
  },
  async callArea({ commit }, payload) {
    // console.log("callUser");
    const response = await axiosInstance.get(`/utils/2`);
    // console.log(response.data);
    commit("setCallArea", response.data);
    // return response.data;
  },
  async addCargo({ commit }, payload) {
    const response = await axiosInstance.post(`/utils/1`, payload);
    return response.data;
  },
  async addArea({ commit }, payload) {
    const response = await axiosInstance.post(`/utils/2`, payload);
    return response.data;
  },
  async delCargo({ commit }, payload) {
    const response = await axiosInstance.delete(`/utils/1/${payload}`);
    return response.data;
  },
  async delArea({ commit }, payload) {
    const response = await axiosInstance.delete(`/utils/2/${payload}`);
    return response.data;
  },
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
  },
  async notificacionesConSintomas({ commit }) {
    const response = await axiosInstance.get(`/notifications/1`);
    commit("setNotiCS", response.data);
  },
  async notificacionesCuidate({ commit }) {
    const response = await axiosInstance.get(`/notifications/2`);
    commit("setNotiCuidate", response.data);
  },
  async callAlertas({ commit }, payload) {
    const response = await axiosInstance.get(
      `/notifications/alertas/${payload}`
    );
    commit("setAlertas", response.data);
  },
  async addAlertas({ commit }, payload) {
    const response = await axiosInstance.post(
      `/notifications/alertas`,
      payload
    );
    return response.data;
  },
  async updateAlertas({ commit }, payload) {
    const response = await axiosInstance.put(
      `/notifications/alertas/${payload}`
    );
    return response.data;
  },
  async delNotiConSintomas({ commit }, payload) {
    const response = await axiosInstance.delete(`/notifications/1/${payload}`);
    return response.data;
  },
  async delNotiCuidate({ commit }, payload) {
    const response = await axiosInstance.delete(`/notifications/2/${payload}`);
    return response.data;
  }
};

const getters = {
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Asist).forEach(function(key) {
        let task = state.Asist[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Asist;
  },
  getUsers(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    // console.log("taskFiltered", taskFiltered);
    // console.log("state.Users", state.Users);
    // return state.Users;
    // let tasks = {};
    Object.keys(taskFiltered).forEach(function(key) {
      let task = taskFiltered[key];
      // console.log(task);
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    // return taskFiltered;
    return tasks;
  },
  getUserOne(state) {
    // console.log(state.UsersOne);
    return state.UsersOne;
  },
  getAsistAll(state) {
    // console.log(state.UsersOne);
    return state.Asist;
  },
  getAsistOne(state) {
    // console.log(state.UsersOne);
    return state.AsistOne;
  },
  getArea(state) {
    return state.Area;
  },
  getCargo(state) {
    return state.Cargo;
  },
  getNotiCS(state) {
    return state.NotiCS;
  },
  getNotiCuidate(state) {
    return state.NotiCuidate;
  },
  getAlertas(state) {
    return state.Alertas;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
