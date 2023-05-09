<template>
  <div>
    <v-card class="pa-4" outlined style="min-height: 89vh;">
      index
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  pageTitle: "หน้าแรก",
  toolbarMode: "hide",
  async validate({ params, query, store }) {
    const MenuCode = "dashboard";
    const valid = await store.dispatch("menu/validateRole", MenuCode);
    return valid;
  },
  methods: {
    ...mapActions({
      loadData : 'menu/loadData', 
    }),
  },
  async created() {
    await this.loadData('reload')
  },
}
</script>

<style lang="scss" scoped></style>