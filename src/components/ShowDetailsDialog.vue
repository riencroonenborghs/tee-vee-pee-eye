<template>
  <div>
    <md-dialog :md-active="showDialog" @md-clicked-outside="close()" id="show-details">
      <md-dialog-title>
        <flex-row noWrap align-h="between" align-v="center">
          <div>{{show.name}}</div>
          <md-button class="md-icon-button" @click="close()">
            <md-icon>close</md-icon>
          </md-button>
        </flex-row>
      </md-dialog-title>

      <md-dialog-content>
        <flex-row noWrap align-h="start" align-v="start">
          <img :src="show.image.medium" v-if="show.image" />
          <p class="summary">{{sanitizeHtml(show.summary)}}</p>
        </flex-row>

        <flex-row noWrap align-h="start" align-v="start">
          <div class="episode">
            <EpisodeDetails v-if="show.nextEpisode" :episode="show.nextEpisode" :badged="true"></EpisodeDetails>
          </div>
          <div class="episode">
            <EpisodeDetails v-if="show.previousEpisode" :episode="show.previousEpisode"></EpisodeDetails>
          </div>
        </flex-row>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import EpisodeDetails from '@/components/EpisodeDetails'

export default {
  name: 'ShowDetailsDialog',
  props: ['show', 'showDialog'],
  methods: {
    close: function () {
      this.$emit('dialogClosed')
    },
    sanitizeHtml (content) {
      return this.$sanitize(content)
    }
  },
  components: {
    EpisodeDetails
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.summary {
  padding: 0px 20px 0px 20px;
  text-align: justify;
}
.episode {
  width: 50%;
}
</style>
