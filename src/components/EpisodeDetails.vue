<template>
  <div class="episode-details">
    <md-badge class="md-primary" md-position="top" :md-content="episode.daysToGo" :title="episode.airdate" v-if="badged">
      <div class="md-title">{{title(episode)}}</div>
    </md-badge>
    <div v-if="!badged" class="md-title">{{title(episode)}}</div>
    <div class="md-caption">{{formatDate(episode.airdate)}}</div>
    <flex-row noWrap align-h="start" align-v="start">
      <img :src="episode.image.medium" v-if="episode.image && episode.image.medium" />
      <p class="summary" v-if="episode.summary">{{sanitizeHtml(episode.summary)}}</p>
    </flex-row>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'

export default {
  name: 'EpisodeDetails',
  props: ['episode', 'badged'],
  methods: {
    sanitizeHtml (content) {
      return this.$sanitize(content)
    },
    formatDate (date) {
      return dayjs(date).format('dddd, DD MMMM YYYY')
    },
    title () {
      const s = this.episode.season ? `S${this.episode.season.toString().padStart(2, '0')}` : null
      const e = this.episode.number ? `E${this.episode.number.toString().padStart(2, '0')}` : null
      return (s === null || e === null) ? this.episode.name : `${s}${e} - ${this.episode.name}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.episode-details {
  padding-top: 24px;
}
img {
  padding-right: 24px;
}
.summary {
  padding-right: 24px;
  margin-top: 0px;
  text-align: justify;
}
</style>
