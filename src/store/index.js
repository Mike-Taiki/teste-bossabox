import Vue from 'vue';
import Vuex from 'vuex';
import request from '../axios/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tools: [],
  },
  mutations: {
    SET_TOOLS(state, tools) {
      state.tools = tools;
    },
  },
  actions: {
    actionTools({ commit }) {
      return request.get('/tools')
        .then(tools => commit('SET_TOOLS', tools.data))
        .catch(err => console.log('err: ', err));
    },
    actionRemoveTool({ dispatch }, id) {
      return request.delete(`/tools/${id}`)
        .then(async () => dispatch('actionTools'))
        .catch(err => console.log('err: ', err));
    },
  },
  getters: {
    getTools(state) {
      return state.tools;
    },
  },
  modules: {
  },
});
