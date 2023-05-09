<template>
  <v-app>
    <v-app-bar class="app-bar" flat dark elevate-on-scroll clipped app>
      <v-toolbar-title class="title">
        <v-row :align="'center'" no-gutters>
          <v-col cols="auto" class="pl-0">
            <v-app-bar-nav-icon v-if="!toolbar_mode" @click.stop="show_menu = !show_menu"></v-app-bar-nav-icon>
            <v-icon v-if="toolbar_mode=='back'" @click="$router.back()" class="ml-3">fa fa-chevron-left</v-icon>
          </v-col>
          <v-col cols="auto" class="pl-2 mr-auto" v-if="activeMenu">
            <v-icon class="mr-2" size="18" v-if="activeMenu.icon">{{ activeMenu.icon }}</v-icon>{{ activeMenu['title'] }}
          </v-col>
          <v-spacer v-else></v-spacer>
          <v-col cols="auto">
  
          </v-col>
          <v-col cols="auto" class="text-right pr-2" v-if="$auth.loggedIn">
            <v-menu v-model="profile_menu" transition="slide-y-transition" :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar size="36" class="avatar" color="#eee" v-bind="attrs" v-on="on">
                  <v-img v-if="profilePicture" :src="profilePicture"></v-img>
                  <v-icon v-else color="#777">fa-user</v-icon>
                </v-avatar>
              </template>
  
              <v-card class="mt-2" width="300">
                <UserMiniInfo />
                <v-btn block text @click="$router.push('/my-account')" v-if="false">
                  <v-icon small left>fas fa-edit</v-icon>
                  แก้ไขโปรไฟล์
                </v-btn>
                <v-divider></v-divider>
                <div class="text-center">
                  <v-btn block text @click="logout()">
                    <v-icon small left>fas fa-sign-out-alt</v-icon>
                    ออกจากระบบ
                  </v-btn>
                </div>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-app-bar>
  
    <v-main class="app-content" clipped-left>
      <div class="wrapper">
        <nuxt />
      </div>
    </v-main>
  </v-app>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import UserMiniInfo from '@/components/member/MiniInfo.vue'
  import SlideMenu from '@/components/layout/SlideMenu.vue'
  export default {
    components: { SlideMenu, UserMiniInfo },
    data() {
      return {
        switchLang: false,
        profile_menu: false,
        show_menu: false,
        profilePicture: null,
        mini: false,
      }
    },
    computed: {
      ...mapGetters({
        activeMenu: 'menu/activeMenu'
      }),
      currentLocales() {
        return this.$i18n.locales.find(i => i.code === this.$i18n.locale)
      },
      availableLocales() {
        return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      },
      title() {
        return this.$route.matched.map((r) => {
          return (r.components.default.options ? r.components.default.options.pageTitle : r.components.default.pageTitle)
        })[0]
      },
      title_icon() {
        return this.$route.matched.map((r) => {
          return (r.components.default.options ? r.components.default.options.pageTitleIcon : '')
        })[0]
      },
      toolbar_mode() {
        return this.$route.matched.map((r) => {
          return (r.components.default.options ? r.components.default.options.toolbarMode : null)
        })[0]
      },
    },
    methods: {
      toggleMenu() {
        this.mini = !this.mini
      },
      async logout() {
        this.$auth.logout()
      }
    },
    created() {
      if (this.$auth.loggedIn) {
        this.profilePicture = this.$auth.user.user_image_url
      }
  
      this.mini = (this.$vuetify.breakpoint.width < 1400)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .app-bar {
    position: fixed !important;
    z-index: 1;
    background: #0D47A1 !important;
  
    .title {
      width: 100%;
      overflow: visible;
    }
  
    .avatar {
      border: 1px #fff solid;
    }
  }
  
  .app-content {
    padding-top: 55px;
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #f2f2f2;
  
    .wrapper {
      padding: 15px;
      margin: 0px auto;
      max-width: 1300px;
    }
  }
  
  v-app,
  .v-application {
    min-height: 100%;
    box-sizing: border-box;
  }
  </style>
  