<template>
  <div id="show" v-if="visible" @mouseover="active = true" @mouseleave="active = false" @click="openDialog()">
    <md-card md-with-hover>
      <md-card-media-cover md-text-scrim>
        <md-card-media v-if="show.image">
          <md-badge v-if="show.nextEpisode !== undefined" class="next-episode md-primary" :md-content="show.nextEpisode.daysToGo" :title="show.nextEpisode.airdate"></md-badge>
          <img :src="show.image.original">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <!-- <span class="md-title"></span> -->
            <!-- <span class="md-subhead">{{show.type}}</span> -->
          </md-card-header>

          <md-card-actions v-if="active">
            <md-button class="md-primary md-raised md-accent" @click="unfollow($event)">Unfollow</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <ShowDetailsDialog :showDialog="showDialog" v-on:dialogClosed="closeDialog()" :show="show"></ShowDetailsDialog>
  </div>
</template>

<script>
import { TvmazeEpisodeAPIService } from '@/services/TvmazeEpisodeAPIService'
import { Episode } from '@/models/Episode'
import ShowDetailsDialog from '@/components/ShowDetailsDialog'

export default {
  name: 'App',
  props: ['show'],
  data () {
    return {
      showDialog: false,
      active: false,
      tvmazeEpisodeAPIService: new TvmazeEpisodeAPIService(this.$http),
      visible: true
    }
  },
  created () {
    this.loadEpisodes()
  },
  methods: {
    loadEpisodes () {
      this.$store.dispatch('loadFollowedShows')
      this.loadPreviousEpisode()
      this.loadNextEpisode()
    },
    loadPreviousEpisode () {
      if (this.show.previousEpisode !== undefined && !this.show.previousEpisode.complete) {
        this.tvmazeEpisodeAPIService.find(this.show.previousEpisode.id).then((episode) => {
          this.show.previousEpisode = Object.assign(new Episode(), episode.body)
        })
      }
    },
    loadNextEpisode () {
      if (this.show.nextEpisode !== undefined && !this.show.nextEpisode.complete) {
        this.tvmazeEpisodeAPIService.find(this.show.nextEpisode.id).then((episode) => {
          this.show.nextEpisode = Object.assign(new Episode(), episode.body)
        })
      }
    },
    unfollow (event) {
      this.$store.commit('unfollowShow', this.show.id)
      this.visible = false
      event.preventDefault()
      event.stopPropagation()
    },
    openDialog () {
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    }
  },
  components: {
    ShowDetailsDialog
  }
}
</script>

<style lang="scss">
.md-card {
  width: 175px;
  margin: 4px;
}
.md-card .md-card-media img {
  height: 266px;
}
.md-card .next-episode {
  margin: 16px;
}
</style>
