<template>
<div class="footer">
  <v-footer padless fixed width="100%">
    <v-row justify="center" class="py-4">
      <v-col cols="12">
        <v-card :elevation="0" class="px-4 text-center">
          <v-row class="pt-4">
            <v-col :class="tab == 0?'active-info': ''" @click="pushPath('/', 0)">
              <v-icon :color="tab == 0?'info': ''">fas fa-border-all</v-icon>
            </v-col>
            <v-col :class="tab == 1?'active-success': ''" class="br-l-r" @click="pushPath('/income', 1)">
              <v-badge bordered offset-x="8" offset-y="2" color="success" icon="mdi-plus" overlap>
                <v-icon :color="tab == 1?'success': ''">fas fa-chart-line</v-icon> 
              </v-badge>
            </v-col>
            <v-col :class="tab == 2?'active-danger': ''" @click="pushPath('/expense', 2)">
              <v-badge bordered offset-x="8" offset-y="2" color="error" icon="mdi-minus" overlap>
                <v-icon :color="tab == 2?'error': ''">fas fa-chart-line</v-icon> 
              </v-badge>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      tab: 'footer/tab'
    })
  },
  methods: {
    ...mapActions({
      getTab: 'footer/getTab'
    }),
    async setTab(tab) {
      await this.getTab(tab)
    },
    pushPath(path, tab) {
      this.setTab(tab)
      this.$router.push(path)
    }
  },
  async created() {
    if (this.$route.path == '/') {
      await this.setTab(0)
    } else if (this.$route.path == '/income') {
      await this.setTab(1)
    } else if(this.$route.path == '/expense') {
      await this.setTab(2)
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 4rem;
  position: relative;
  width: 100%;

  .btn-add {
    position: absolute;
    top: -1.5rem;
    right: 0;
    left: 0;
    text-align: center;
    margin: auto;
    // background: #fff;
    border-radius: 50%;
    padding: 10px;
  }

  .bg-color {
    background: linear-gradient(140deg, #2daae4 10%, #cb68fd 50%, #f87550);
  }

  .br-l-r {
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }

  .active-info { border-bottom: #2daae4 3px solid; }
  .active-success { border-bottom: #4caf50 3px solid; }
  .active-danger { border-bottom: #ff5252 3px solid; }
}
</style>
