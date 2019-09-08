import types from './mutationTypes'

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
      if (!platformTypes[platform]) throw new Error(`platform "${platform}" is unknown`)
      state.platform = platform
    },
    [types.SET_RATING] (state, rating) {
      if (!ratingTypes[rating]) throw new Error(`rating "${rating}" is unknown`)
      state.rating = rating
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
