<template>
<div>
    <FormFilterBar>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="auto">
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" outlined placeholder="ค้นหา" single-line hide-details clearable dense></v-text-field>
        </v-col>
      </v-row>
    </FormFilterBar>
    <v-card class="pa-4" outlined style="min-height: 76vh;">
      <v-data-table dense :search="search" :headers="dataTable.headers" :items="lists" :items-per-page="30" :footer-props="dataTable.footerProps" :item-class="rowClass" item-key="id">
        <template v-slot:[`item.index`]="{ index }">
          <div>{{ index + 1 }}</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openForm(item._id)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <Loader v-if="loading" :loading="loading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  // layout: 'users',
  pageTitle: "หน้าแรก",
  toolbarMode: "hide",
  async validate({ params, query, store }) {
    const MenuCode = "form-user";
    const valid = await store.dispatch("menu/validateRole", MenuCode);
    return valid;
  },
  data() {
    return {
      loading: false,
      search: '',
    }
  },
  computed: {
    ...mapGetters({
      lists: 'form-user/lists',
    }),

    dataTable() {
      return {
        headers: [
          {
            text: "ลำดับ",
            value: 'index',
            sortable: false,
            width: 10,
            align: "right"
          },
          {
            text: "โค้ด",
            value: 'product_code',
            sortable: false,
            width: 100,
          },
          {
            text: "ชื่อ",
            value: 'product_name',
            sortable: false,
          },
          {
            text: "ไซส์",
            value: 'product_size',
            sortable: false,
            width: 150
          },
          {
            text: '',
            value: 'actions',
            sortable: false,
            width: 100,
            align: "right"
          }
        ],
        footerProps: {
          'items-per-page-options': [30, 50, 100, -1],
          'itemsPerPageText': "จำนวนต่อหน้า"
        }
      }

    }

  },
  methods: {
    ...mapActions({
      loadData: 'form-user/loadData',
      delete: 'form-user/delete'
    }),
    openForm(id) {
      this.$router.push({ path: this.$route.path + "/" + id })
    },
    rowClass(item) {
      return (item.status == ('false' || false)) ? 'error--text' : ''
    }
  },
  async created() {
    this.loading = true
    let param = { show_all: 'y' }
    await this.loadData(param)
    this.loading = false
  },
}
</script>

<style lang="scss" scoped></style>