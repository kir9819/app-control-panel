import Vue from 'vue'
import Vuex from 'vuex'

import apps from '@/apps.json'

import types from './mutationTypes'

import desktopModule, { platformTypes, ratingTypes } from './desktopModule'

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
    async init ({ commit, dispatch, state }) {
      Object.keys(apps)
        .map(appKey => dispatch('addModule', { body: apps[appKey], name: appKey }))

      commit(types.CHANGE_CURRENT_DESKTOP, state.desktops[0])
    },
    addModule ({ commit }, { body, name }) {
      this.registerModule(name, desktopModule)
      commit(types.ADD_MODULE, name)
      commit(types.ADD_MODULE_NAME, { name: body.name, key: name })

      commit(`${name}/${types.SET_ID_NAME}`, name)
      commit(`${name}/${types.SET_NAME}`, body.name)
      commit(`${name}/${types.SET_APPLICATIONS}`, body.applications)

      const platform = getFromLocalStorage(name, 'platform')
      const rating = getFromLocalStorage(name, 'rating')

      if (platform && platformTypes[platform]) {
        commit(`${name}/${types.SET_PLATFORM}`, platform)
      }

      if (rating && ratingTypes[rating]) {
        commit(`${name}/${types.SET_RATING}`, rating)
      }
    }
  }
})

export function saveInLocalStorage (name, attr, value) {
  const savedValue = localStorage.getItem(name)
  let parsedValue = {}

  if (savedValue) {
    try {
      parsedValue = JSON.parse(savedValue)
    } catch (err) {}
  }

  parsedValue[attr] = value

  localStorage.setItem(name, JSON.stringify(parsedValue))
}

export function getFromLocalStorage (name, attr) {
  const savedValue = localStorage.getItem(name)
  let parsedValue = {}

  if (savedValue) {
    try {
      parsedValue = JSON.parse(savedValue)
      return parsedValue[attr]
    } catch (err) {
      return false
    }
  }

  return false
}
