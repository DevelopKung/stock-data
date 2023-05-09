<template>
  <v-app class="text-center pt-10">
    <h1 v-if="error.statusCode === 404" class="primary--text">
      {{ pageNotFound }}
    </h1>
    <h1 v-else class="primary--text">
      {{ otherError }}
    </h1>
    <NuxtLink to="/" class="pb-1">
      กลับไปยังหน้าแรก
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'ไม่พบหน้านี้',
      otherError: 'เกิดข้อผิดพลาด'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
