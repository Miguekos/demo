import { axiosInstance } from "boot/axios";

const state = {
  Asist: null,
  AsistOne: null,
  AsistUser: null
};

const mutations = {
  setAsist(state, payload) {
    state.Asist = payload;
  },
  setAsistOne(state, payload) {
    state.AsistOne = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  setUsersOne(state, payload) {
    state.UsersOne = payload;
  },
  setAsistUser(state, payload) {
    state.AsistUser = payload;
  }
};

const actions = {
  async callAsist({ commit }, payload) {
    // console.log("callUser");
    const response = await axiosInstance.get(
      `/asistencia?fi=${payload.fi}&ff=${payload.ff}`
    );
    // console.log(response.data);
    commit("setAsist", response.data);
    // return response.data;
  },
  async callAsistUser({ commit }, payload) {
    // console.log("callUser");
    const response = await axiosInstance.post(`/asistenciaUser`, payload);
    // console.log(response.data);
    commit("setAsistUser", response.data);
    // return response.data;
  },
  async callAsistOne({ commit }, payload) {
    // console.log("callUser");
    const response = await axiosInstance.get(`/asistencia/${payload}`);
    // console.log(response.data);
    commit("setAsistOne", response.data);
    // return response.data;
  },
  async addAsist({ commit }, payload) {
    const response = await axiosInstance.post(`/asistencia`, payload);
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
  getAsistUser(state) {
    return state.AsistUser;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
