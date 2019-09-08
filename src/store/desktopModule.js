import types from './mutationTypes'
import { saveInLocalStorage } from './index'

export const platformTypes = {
  all: 'all',
  android: 'android',
  apple: 'apple',
  iphone: 'apple'
}

export const ratingTypes = {
  none: 'none',
  from2: 'from2',
  from3: 'from3',
  from4: 'from4'
}

export default {
  namespaced: true,
  state: () => ({
    name: '',
    idName: '',
    applications: [],
    platform: platformTypes.all,
    rating: ratingTypes.none
  }),
  getters: {
    applications: state => state.applications
      .filter(app => filterByPlatform(app, state.platform))
      .filter(app => filterByRating(app, state.rating)),
  },
  mutations: {
    [types.SET_APPLICATIONS] (state, applications) {
      state.applications = applications
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_PLATFORM] (state, platform) {
      if (!platformTypes[platform]) {
        state.platform = platformTypes.all
        saveInLocalStorage(state.idName, 'platform', state.platform)
        throw new Error(`platform "${platform}" is unknown`)
      }

      state.platform = platform
      saveInLocalStorage(state.idName, 'platform', state.platform)
    },
    [types.SET_RATING] (state, rating) {
      if (!ratingTypes[rating]) {
        state.rating = ratingTypes.none
        saveInLocalStorage(state.idName, 'rating', state.rating)
        throw new Error(`rating "${rating}" is unknown`)
      }

      state.rating = rating
      saveInLocalStorage(state.idName, 'rating', state.rating)
    },
    [types.SET_ID_NAME] (state, idName) {
      state.idName = idName
    }
  }
}

function filterByPlatform (app, platform) {
  if (platform === platformTypes.all) return true

  const appPlatform = app.platform

  return platformTypes[appPlatform] === platform
}

function filterByRating (app, rating) {
  if (rating === ratingTypes.none) return true

  const appRating = parseFloat(app.rating.replace(/\,/g, '.'))

  switch (rating) {
    case ratingTypes.from2: return appRating >= 2.0
    case ratingTypes.from3: return appRating >= 3.0
    case ratingTypes.from4: return appRating >= 4.0
    default: return true
  }
}
