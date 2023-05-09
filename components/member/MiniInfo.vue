<template>
<div>
  <v-list v-if="info">
    <v-list-item>
      <v-list-item-avatar size="50" color="#eee" >
        <v-img  v-if="info.profile_picture" :src="info.profile_picture" ></v-img>
        <v-icon v-else color="#777">fa-user</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ info.full_name }}</v-list-item-title>
        <v-list-item-subtitle class="caption">{{ app_version }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>

</div>
</template>

<script>
export default {
  props: {
    userInfo : { type: Object, default:()=>null } ,
    myProfile : { type: Boolean, default:true }
  } ,
  data() {
    return { 
      info : {  
        profile_picture : null ,
        full_name : '',
        roles : '',
        role_name : '',
        company_name : '',
        app_version : ''
      }
    }
  } ,
  watch : {
    userInfo : function(newVal,oldVal){
      this.info = newVal
    }
  } ,
  created() {
    if (this.myProfile && this.$auth.loggedIn) {
      this.info.profile_picture = this.$auth.user.user_image_url
      this.info.full_name = this.$auth.user.first_name +' '+ this.$auth.user.last_name
    }
    
    this.app_version = 'version '+this.$config.myApp.version
  }
}
</script>