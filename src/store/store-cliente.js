import { axiosInstance } from "boot/axios";
import { LocalStorage } from "quasar";

const state = {
  Clientes: [],
  ClientesCS: [],
  ClientesS: [],
  ClienteReport: [],
  ClienteOne: [],
  ClientesReportOrder: [],
  search: "",
  searchCS: "",
  searchS: "",
  dialogDetalle: false,
  dialogDetalleData: "",
  ClienteValidar: "",
  ClientesSUser: [],
  ClientesCSUser: []
};

const mutations = {
  setClientesReportOrder(state, payload) {
    state.ClientesReportOrder = payload;
  },
  setClientes(state, payload) {
    state.Clientes = payload;
  },
  setClientesCS(state, payload) {
    state.ClientesCS = payload;
  },
  setClientesS(state, payload) {
    state.ClientesS = payload;
  },
  setClienteOne(state, payload) {
    state.ClienteOne = payload;
  },
  setSearch(state, payload) {
    state.search = payload;
  },
  setSearchCS(state, payload) {
    // console.log("MutasetSearchCS", payload);
    state.searchCS = payload;
  },
  setSearchS(state, payload) {
    state.searchS = payload;
  },
  setClienteReport(state, payload) {
    state.ClienteReport = payload;
  },
  setDialogDetalle(state, payload) {
    state.dialogDetalle = payload;
  },
  setDialogDetalleData(state, payload) {
    state.dialogDetalleData = payload;
  },
  setClienteValidar(state, payload) {
    state.ClienteValidar = payload;
  },
  setClientesSUser(state, payload) {
    state.ClientesSUser = payload;
  },
  setClientesCSUser(state, payload) {
    state.ClientesCSUser = payload;
  }
};

const actions = {
  async callCliente({ commit }) {
    // console.log("callCliente");
    const response = await axiosInstance.get(`/clientes`);
    // console.log(response.data);
    commit("setClientes", response.data);
    // return response.data;
  },
  async callClienteReportOrder({ commit }) {
    // console.log("callCliente");
    const response = await axiosInstance.get(`/clientes/reporte/order`);
    // console.log(response.data);
    commit("setClientesReportOrder", response.data);
    // return response.data;
  },
  async callClienteValidar({ commit }, payload) {
    // console.log("callCliente");
    const response = await axiosInstance.get(`/cliente/validar/${payload}`);
    // console.log(response.data);
    commit("setClienteValidar", response.data);
    // return response.data;
  },
  async callClienteCS({ commit }) {
    // console.log("callCliente");
    const response = await axiosInstance.get(`/clientesCS`);
    // console.log(response.data);
    commit("setClientesCS", response.data);
    // return response.data;
  },
  async callClienteCSUser({ commit }, payload) {
    // console.log("callCliente");
    const response = await axiosInstance.post(`/clientesCSUser`, payload);
    // console.log(response.data);
    commit("setClientesCSUser", response.data);
    // return response.data;
  },
  async callClienteS({ commit }) {
    // console.log("callCliente");
    const response = await axiosInstance.get(`/clientesS`);
    // console.log(response.data);
    commit("setClientesS", response.data);
    // return response.data;
  },
  async callClienteSUser({ commit }, payload) {
    // console.log("callCliente");
    const response = await axiosInstance.post(`/clientesSUser`, payload);
    // console.log(response.data);
    commit("setClientesSUser", response.data);
    // return response.data;
  },
  async callClienteOne({ commit }, payload) {
    // console.log("callClienteOne");
    const response = await axiosInstance.get(`/cliente/${payload}`);
    commit("setClienteOne", response.data);
    // return response.data;
  },
  async callClienteReport({ commit }, payload) {
    // console.log("callClienteOne");
    const response = await axiosInstance.get(`/clientes/reporte`);
    // console.log(response.data);
    commit("setClienteReport", response.data);
    // return response.data;
  },
  async addCliente({ commit }, payload) {
    // console.log("addCliente");
    // console.log(payload);
    const response = await axiosInstance.post(`/cliente/add`, payload);
    // console.log(response);
    // commit("setClientes", response.data);
    return response.data;
  },
  async updateCliente({ commit }, payload) {
    // console.log("updateCliente");
    // console.log(payload);
    const response = await axiosInstance.post(`/cliente/update`, payload);
    // console.log(response);
    // commit("setClientes", response.data);
    return response.data;
  },
  setSearch({ commit }, payload) {
    commit("setSearch", payload);
  },
  setSearchCS({ commit }, payload) {
    // console.log("setSearchCS", payload);
    commit("setSearchCS", payload);
  },
  setSearchS({ commit }, payload) {
    commit("setSearchS", payload);
  }
};

const getters = {
  taskFiltered: state => {
    let taskFiltered = {};
    if (state.search) {
      Object.keys(state.Clientes).forEach(function(key) {
        let task = state.Clientes[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.Clientes;
  },
  taskFilteredCS: state => {
    let taskFiltered = {};
    if (state.searchCS) {
      // console.log("state.searchCS", state.searchCS);
      Object.keys(state.ClientesCS).forEach(function(key) {
        let task = state.ClientesCS[key],
          taskNameLowerCase = task.nombre.toLowerCase(),
          searchLowerCase = state.searchCS.toLowerCase();
        // console.log("task.nombre.toLowerCase", task.nombre.toLowerCase);
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.ClientesCS;
  },
  taskFilteredS: state => {
    let taskFiltered = {};
    if (state.searchS) {
      Object.keys(state.ClientesS).forEach(function(key) {
        let task = state.ClientesS[key],
          taskNameLowerCase = task.nombre.toLowerCase(),
          searchLowerCase = state.searchS.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          taskFiltered[key] = task;
        }
      });
      return taskFiltered;
    }
    return state.ClientesS;
  },
  getClientes(state, getters) {
    let taskFiltered = getters.taskFiltered;
    let tasks = [];
    // console.log("taskFiltered", taskFiltered);
    // console.log("state.Clientes", state.Clientes);
    // return state.Clientes;
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
  getClientesCS(state, getters) {
    let taskFiltered = getters.taskFilteredCS;
    let tasks = [];
    // console.log("taskFilteredCS", taskFiltered);
    // console.log("state.ClientesCS", state.ClientesCS);
    // return state.Clientes;
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
  getClientesS(state, getters) {
    let taskFiltered = getters.taskFilteredS;
    let tasks = [];
    // console.log("taskFiltered", taskFiltered);
    // console.log("state.Clientes", state.ClientesS);
    // return state.Clientes;
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
  getClienteOne(state) {
    // console.log(state.ClienteOne);
    return state.ClienteOne;
  },
  getClienteReport(state) {
    // console.log(state.ClienteReport);
    return state.ClienteReport;
  },
  getDialogDetalleData(state) {
    // console.log(state.dialogDetalleData);
    return state.dialogDetalleData;
  },
  getClientesReporteNewCS(state) {
    let todoCS = [];
    for (let index = 0; index < state.ClientesReportOrder.length; index++) {
      const element = state.ClientesReportOrder[index];
      // console.log(element._id.enfermo);
      if (element._id.enfermo == "01") {
        // console.log("Entro en 01");
        // console.log(element);
        todoCS.push(element);
      }
    }
    return todoCS;
  },
  getClienteValidar(state) {
    return state.ClienteValidar;
  },
  getClientesSUser(state) {
    return state.ClientesSUser;
  },
  getClientesCSUser(state) {
    return state.ClientesCSUser;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
