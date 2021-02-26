import store from '@/store'

export class FollowShowsService {
  constructor() {}

  follow (showId) {
    store.commit('followShow', showId)
    store.dispatch('saveFollowedShows')
  }

  unfollow (episodeId) {
    store.commit('unfollowShow', showId)
    store.dispatch('saveFollowedShows')
  }
}