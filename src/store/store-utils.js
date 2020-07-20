import { axiosInstance } from "boot/axios";

const state = {
  Cargo: null,
  Area: null
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
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
