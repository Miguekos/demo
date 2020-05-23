import { axiosInstance } from "boot/axios";
const state = {
  Users: [],
  UsersCS: [],
  UsersS: [],
  UserReport: [],
  UserOne: "",
  search: ""
};

const mutations = {
  setUsers(state, payload) {
    state.Users = payload;
  },
  setUsersCS(state, payload) {
    state.UsersCS = payload;
  },
  setUsersS(state, payload) {
    state.UsersS = payload;
  },
  setUserOne(state, payload) {
    state.UserOne = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  setUserReport(state, payload) {
    state.UserReport = payload;
  }
};

const actions = {
  async callUser({ commit }) {
    console.log("callUser");
    const response = await axiosInstance.get(`/Users`);
    // console.log(response.data);
    commit("setUsers", response.data);
    // return response.data;
  },
  async callUserCS({ commit }) {
    console.log("callUser");
    const response = await axiosInstance.get(`/UsersCS`);
    // console.log(response.data);
    commit("setUsersCS", response.data);
    // return response.data;
  },
  async callUserS({ commit }) {
    console.log("callUser");
    const response = await axiosInstance.get(`/UsersS`);
    // console.log(response.data);
    commit("setUsersS", response.data);
    // return response.data;
  },
  async callUserOne({ commit }, payload) {
    console.log("callUserOne");
    const response = await axiosInstance.get(`/User/${payload}`);
    commit("setUserOne", response.data);
    // return response.data;
  },
  async callUserReport({ commit }, payload) {
    console.log("callUserOne");
    const response = await axiosInstance.get(`/Users/reporte`);
    console.log(response.data);
    commit("setUserReport", response.data);
    // return response.data;
  },
  async addUser({ commit }, payload) {
    console.log("addUser");
    console.log(payload);
    const response = await axiosInstance.post(`/User/add`, payload);
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
  taskFilteredCS: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.UsersCS).forEach(function(key) {
        let task = state.UsersCS[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.UsersCS;
  },
  taskFilteredS: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.UsersS).forEach(function(key) {
        let task = state.UsersS[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.UsersS;
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
  getUsersCS(state, getters) {
    let taskFiltered = getters.taskFilteredCS;
    let tasks = [];
    console.log("taskFiltered", taskFiltered);
    console.log("state.Users", state.UsersCS);
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
  getUsersS(state, getters) {
    let taskFiltered = getters.taskFilteredS;
    let tasks = [];
    console.log("taskFiltered", taskFiltered);
    console.log("state.Users", state.UsersS);
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
  },
  getUserReport(state) {
    console.log(state.UserReport);
    return state.UserReport;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
