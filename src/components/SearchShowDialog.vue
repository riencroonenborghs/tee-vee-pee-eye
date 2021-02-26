<template>
  <div>
    <md-dialog :md-active="showDialog" @md-clicked-outside="close()" id="search-show">
      <md-dialog-title>
        <flex-row noWrap align-h="between" align-v="center">
          <div>Search shows</div>
          <md-button class="md-icon-button" @click="close()">
            <md-icon>close</md-icon>
          </md-button>
        </flex-row>
      </md-dialog-title>

      <md-dialog-content>
        <div id="content">
          <flex-col noWrap>
            <div id="search">
              <form>
                <flex-row noWrap align-v="center">
                  <div>
                    <md-field>
                      <label>Search by name</label>
                      <md-input v-model="query"></md-input>
                    </md-field>
                  </div>
                  <md-button v-if="query != ''" class="md-icon-button" @click="query = ''">
                    <md-icon>clear</md-icon>
                  </md-button>
                  <md-button v-if="query != ''" class="md-icon-button" @click="search()">
                    <md-icon>search</md-icon>
                  </md-button>
                </flex-row>
              </form>
            </div>
            <div id="search-results" v-if="results.length > 0">
              <md-list>
                <md-list-item md-expand v-for="result in results" :key="result.id">
                  <md-avatar>
                    <img :src="result.show.image.medium" />
                  </md-avatar>
                  <div class="md-list-item-text">
                    <span>{{result.show.name}}</span>
                    <span>{{result.show.type}}</span>
                  </div>

                  <div slot="md-expand">
                    <div class="summary">{{result.show.sanitizedSummary}}</div>
                    <flex-row align-h="end">
                      <md-button v-if="alreadyFollowing(result.show)" class="md-primary" @click="unfollow(result.show)">Unfollow</md-button>
                      <md-button v-if="!alreadyFollowing(result.show)" class="md-primary" @click="follow(result.show)">Follow</md-button>
                    </flex-row>
                  </div>
                </md-list-item>
              </md-list>
            </div>
          </flex-col>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { TvmazeShowAPIService } from '@/services/TvmazeShowAPIService'

export default {
  name: 'SearchShowDialog',
  props: ['showDialog'],
  data: () => ({
    query: '',
    results: []
  }),
  watch: {
    query (newQuery, oldQuery) {
      if (newQuery !== oldQuery) {
        this.search()
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('dialogClosed')
    },
    search: function () {
      const service = new TvmazeShowAPIService(this.$http)
      service.search(this.query).then((results) => {
        this.results = results
        this.results.forEach((result) => {
          result.show.sanitizedSummary = this.$sanitize(result.show.summary)
        })
      })
    },
    alreadyFollowing: function (show) {
      return this.$store.state.following.showIds.indexOf(show.id) !== -1
    },
    follow: function (show) {
      this.$store.commit('followShow', show.id)
      this.$emit('loadShows')
    },
    unfollow: function (show) {
      this.$store.commit('unfollowShow', show.id)
      this.$emit('loadShows')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#content { max-width: 500px; }
#search .md-field { width: 450px; }
#search .md-field.md-has-value { width: calc(450px - 48px); }
.summary {
  padding: 8px;
  white-space: -moz-pre-wrap; /* Mozilla */
  white-space: -hp-pre-wrap; /* HP printers */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: pre-wrap; /* CSS 2.1 */
  white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
  word-wrap: break-word; /* IE */
}
</style>
