<template>
<div>
  <v-row no-gutters align="center" class="pa-2">
    <v-col v-if="showLogo">
      <div class="logo text-center">
        <h2>STOCK</h2>
        <!-- <img src="~/assets/img/logo.png" height="26px" class="ml-2 mt-2" />     -->
      </div>
    </v-col>
    <v-col :cols="showLogo ? 'auto':'12'" class="text-center">      
      <v-app-bar-nav-icon class="toogleBtn" @click="$emit('toggleMenu')"></v-app-bar-nav-icon>
    </v-col>
  </v-row>

  <v-list-item-group v-model="active" class="menu-list" active-class="primary--text" color="indigo">
    <div v-for="(item, i) in items" :key="i" >
      <v-divider v-if="item.menu_type=='group-header'" class="mx-2 mt-1"></v-divider>
      <v-subheader v-if="item.menu_type=='group-header' && showLogo" class="subheader">{{ item['title'] }}</v-subheader>
      <v-list-item v-else class="list" @click="pushRoute(item.route)">
        <v-list-item-icon class="icon">
          <v-icon v-text="item.icon" size="15" class="ma-auto"></v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-1">
          <v-list-item-title class="menu" v-text="item['title']"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
    </div>
  </v-list-item-group>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    showLogo : { type:Boolean , default:true }
  } ,
  data() { 
    return { 
      active: null
    }
  } ,
  computed: {
    ...mapGetters({
      items  : 'menu/lists' ,
      activeIndex : 'menu/activeIndex'      
    }) ,
  } ,

  methods: {
    ...mapActions({
      loadMenuData : 'menu/loadData', 
    }),
    pushRoute(route){
      if (route) this.$router.push(route);
    }
  },  
  async fetch() {
    await this.loadMenuData();  
  } ,
  created() {
    this.active = this.activeIndex
  }
}
</script>
<style lang="scss" scoped>
  .menu-list {
    .list { min-height:1px!important; }
    .icon { margin:10px 0px;margin-right:10px }
    .menu { font-size:14px; }
    .subheader { 
      font-size:12px;
      width:100%;height:auto;margin:10px 0px 5px 0px; 
      overflow:hidden; white-space:nowrap; text-overflow:ellipsis; 
    }
  }  
  a { text-decoration: none; }

  .logo { transition:all .3s ease .2s; opacity:1;  }
  .v-navigation-drawer--mini-variant .logo {  transition:none; opacity:0;  }
</style>