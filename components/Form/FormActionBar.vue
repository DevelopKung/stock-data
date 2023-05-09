<template>
   <v-toolbar 
      dense outlined flat 
      height="auto" min-height="45"
      class="toolbars mb-3"
   >
      <v-row no-gutters align="center">
         <v-col cols="auto" class="mr-2" v-if="title || icon">
            <v-toolbar-title>
               <i v-if="icon" :class="icon"></i>
               <b v-if="title">{{ title }}</b>
               <div  v-if="subtitle" class="subtitle">{{ subtitle }}</div>
            </v-toolbar-title>
         </v-col>         
         <v-spacer></v-spacer>
         <v-col cols="auto">
            <slot></slot>
         </v-col>
      </v-row>
   </v-toolbar>
</template>

<script>
export default {
   props: {
      icon: { type:String , default:null},
      title: { type:String , default:null},
      subtitle: { type:String , default:null}
   }
}
</script>


<style scoped>
.toolbars {
   position: sticky;
   top: 65px;
   z-index: 2;
   padding:10px 0px 8px 0px;
   border-top:4px var(--v-primary-base) solid;
}
.subtitle { font-size:12px; }
</style>