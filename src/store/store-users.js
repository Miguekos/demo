import { axiosInstance } from "boot/axios";
const state = {
  Users: [],
  search: ""
};

const mutations = {
  setUsers(state, payload) {
    state.Users = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  }
};

const actions = {
  async callUser({ commit }) {
    console.log("callUser");
    const response = await axiosInstance.get(`/user/users`);
    // console.log(response.data);
    commit("setUsers", response.data);
    // return response.data;
  },
  async addUser({ commit }, payload) {
    console.log("addUser");
    console.log(payload);
    const response = await axiosInstance.post(`/user/add`, payload);
    console.log(response);
    // commit("setUsers", response.data);
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
      Object.keys(state.Users).forEach(function(key) {
        let task = state.Users[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Users;
  },
  getUsers(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    console.log("taskFiltered", taskFiltered);
    console.log("state.Users", state.Users);
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
    console.log(state.UserOne);
    return state.UserOne;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
