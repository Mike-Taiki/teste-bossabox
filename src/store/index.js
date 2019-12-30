import Vue from 'vue';
import Vuex from 'vuex';
import request from '../axios/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tools: [],
    searchTool: [],
    searchTagsTool: [],
  },
  mutations: {
    SET_TOOLS(state, tools) {
      state.tools = tools;
    },
    SET_SEARCH_TOOL(state, tools) {
      state.searchTool = tools;
    },
    SET_SEARCH_TAGS_TOOL(state, tools) {
      state.searchTagsTool = tools;
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
    actionAddTool({ dispatch }, tool) {
      return request.post('/tools', tool)
        .then(() => dispatch('actionTools'))
        .catch(err => console.log('err: ', err));
    },
    actionSearchTool({ commit }, title) {
      return request.get(`/tools?q=${title}`)
        .then(tools => commit('SET_SEARCH_TOOL', tools.data))
        .catch(err => console.log('err: ', err));
    },
    actionSearchTagsTool({ commit }, title) {
      return request.get(`/tools?tags_like=${title}`)
        .then(tools => commit('SET_SEARCH_TAGS_TOOL', tools.data))
        .catch(err => console.log('err: ', err));
    },
  },
  getters: {
    getTools(state) {
      return state.tools;
    },
    getSearchTool(state) {
      return state.searchTool;
    },
    getSearchTagsTool(state) {
      return state.searchTagsTool;
    },
  },
  modules: {
  },
});
