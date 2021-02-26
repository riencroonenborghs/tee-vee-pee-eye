<template>
  <div id="app">
    <md-toolbar>
      <flex-row noWrap align-h="between" align-v="center" id="toolbar">
        <h3 class="md-title">Tee Vee Pee Eye</h3>
        <md-button class="md-icon-button md-primary" @click="openDialog()">
          <md-icon>add</md-icon>
        </md-button>
      </flex-row>
    </md-toolbar>

    <flex-row wrap v-if="shows.length > 0">
      <Show v-for="show in shows" :key="show.id" :show="show"></Show>
    </flex-row>

    <router-view/>

    <SearchShowDialog :showDialog="showDialog" v-on:dialogClosed="closeDialog()" v-on:loadShows="loadShows()"></SearchShowDialog>
  </div>
</template>

<script>
import SearchShowDialog from '@/components/SearchShowDialog'
import Show from '@/components/Show'
import { TvmazeShowAPIService } from '@/services/TvmazeShowAPIService'

export default {
  name: 'App',
  data: () => ({
    showDialog: false,
    shows: [],
    active: false
  }),
  created () {
    this.loadShows(true)
  },
  methods: {
    loadShows (initialLoad = false) {
      this.shows = []
      if (initialLoad) { this.$store.dispatch('loadFollowedShows') }
      const tvmazeShowAPIService = new TvmazeShowAPIService(this.$http)
      this.$store.state.following.showIds.forEach((showId) => {
        tvmazeShowAPIService.find(showId).then((show) => {
          this.shows.push(show)
          this.shows = this.shows.sort((a, b) => a.name.localeCompare(b.name))
        })
      })
    },
    openDialog () {
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    }
  },
  components: {
    SearchShowDialog,
    Show
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#toolbar { width: 100%; }
.md-card {
  width: 175px;
  margin: 4px;
}
.md-card .md-card-media img {
  height: 266px;
}
</style>
