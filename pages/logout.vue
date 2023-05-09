<template>
<div>
  logout
</div>
</template>

<script>
export default {
  layout: 'blank',
  async created() {
    await this.$auth.logout()
    this.$router.replace('/')
  },
}
</script>

<style lang="scss" scoped>

</style>
