import Vue from 'vue'
import Vuex from 'vuex'

import apps from '@/apps.json'

import types from './mutationTypes'

import desktopModule from './desktopModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    desktops: [],
    desktopNames: {},
    currentDesktop: '',
  }),
  mutations: {
    [types.ADD_MODULE] (state, moduleName) {
      state.desktops.push(moduleName)
    },
    [types.CHANGE_CURRENT_DESKTOP] (state, desktopName) {
      state.currentDesktop = desktopName
    },
    [types.ADD_MODULE_NAME] (state, { name, key }) {
      state.desktopNames[key] = name
    }
  },
  actions: {
    init ({ commit, dispatch, state }) {
      Object.keys(apps)
        .map(appKey => dispatch('addModule', { body: apps[appKey], name: appKey }))

      commit(types.CHANGE_CURRENT_DESKTOP, state.desktops[0])
    },
    addModule ({ commit }, { body, name }) {
      this.registerModule(name, desktopModule)
      commit(types.ADD_MODULE, name)
      commit(types.ADD_MODULE_NAME, { name: body.name, key: name })
      commit(`${name}/${types.SET_NAME}`, body.name)
      commit(`${name}/${types.SET_APPLICATIONS}`, body.applications)
    }
  }
})
