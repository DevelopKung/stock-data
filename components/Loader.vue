<template>
  <v-overlay :value="loading" z-index="999">
    <v-progress-circular
      indeterminate
      size="64"
    >
    <div v-if="textLoad" class="text-load">
      <div>อาจใช้เวลานาน</div>
      <div>กรุณารอสักครู่</div>
    </div>
  </v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  props : {
    loading : { type:Boolean , default:false },
    textLoad : { type:Boolean , default:false }
  }
}
</script>

<style lang="scss" scoped>
.text-load {
  position: relative;
  width: 100vh;
  margin-top: 16%;
  text-align: center;
}
</style>