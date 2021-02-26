import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalstorage from 'vue-localstorage'
import { PersistenceService } from '@/services/PersistenceService'

Vue.use(Vuex)
Vue.use(VueLocalstorage)

export default new Vuex.Store({
  state: {
    services: {
      persistenceService: new PersistenceService(Vue.localStorage)
    },
    following: {
      showIds: []
    }
  },
  mutations: {
    following: function (state, following) {
      state.following = following
    },
    followShow: function (state, showId) {
      if (state.following.showIds.indexOf(showId) === -1) {
        state.following.showIds.push(showId)
      }
      this.dispatch('saveFollowedShows')
    },
    unfollowShow: function (state, showId) {
      if (state.following.showIds.indexOf(showId) !== -1) {
        state.following.showIds.splice(state.following.showIds.indexOf(showId), 1)
      }
      this.dispatch('saveFollowedShows')
    }
  },
  actions: {
    saveFollowedShows: function (context) {
      context.state.services.persistenceService.save()
    },
    loadFollowedShows: function (context) {
      context.state.services.persistenceService.load()
    }
  },
  modules: {
  }
})
