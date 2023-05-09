<template>
<div>

  <div v-if="info" class="info-area">
    <v-row class="align-center">
      <v-col cols="4" class="text-right">
        <v-list-item-avatar color="#ddd" size="80" tile class="ma-0">
          <v-img :src="info.profile_picture"></v-img>
        </v-list-item-avatar>
      </v-col>
      <v-col cols="8">
        <h3 v-text="info.first_name+' '+info.last_name"></h3>
        <h5 v-text="info.nick_name" class="primary--text mb-1"></h5>
        <slot name="mini-icon" :info="info"></slot>
      </v-col>
    </v-row>
        
    <v-divider class="my-2 mx-4"></v-divider>
    
    <v-simple-table class="text-left">
    <tbody>
      <tr>
        <th width="80" class="text-right pl-0">ที่อยู่</th>
        <td>
          <div>{{ info.address }}</div>
          {{ info.tambol }} {{ info.umphur }} {{ info.province }} {{ info.zip_code }}
        </td>
      </tr>
      <tr>
        <th class="text-right pl-0">โทร</th>
        <td><a :href="'tel:'+info.phone_number">{{ info.phone_number }}</a></td>
      </tr>
      <tr v-if="info.email">
        <th class="text-right pl-0">Email</th>
        <td>{{ info.email }}</td>
      </tr>   
      <tr>
        <th class="text-right pl-0">ID Card</th>
        <td>{{ info.id_number }}</td>
      </tr>      
      <tr>
        <th class="text-right pl-0">เพศ</th>
        <td>
          <span v-if="info.gender=='M'">ชาย</span>
          <span v-else>หญิง</span>
        </td>
      </tr>
      <tr>
        <th class="text-right pl-0">วันเกิด</th>
        <td>{{ $moment(info.birth_date).format("DD / MM / YYYY") }}</td>
      </tr>  
    </tbody>
    </v-simple-table>
    
  </div>
  
</div>
</template>

<script>
export default {
  data() { 
    return { 
    }
  },
  props : { info : null } ,
  methods : {

    filterOnlyCapsText (value, search, item) {
      return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  }
}
</script>
<style lang="scss" scoped>
a { text-decoration: none;}
tr > * { border:none!important;height:auto!important;padding:4px 10px!important; }
</style>