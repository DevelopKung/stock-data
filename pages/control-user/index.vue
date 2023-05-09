<template>
  <div>
    <FormFilterBar>
      <v-row>
        <v-col cols="auto">
          <v-btn color="primary" small depressed @click="openForm('new')">new</v-btn>
        </v-col>
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
        <template v-slot:[`item.status`]="{ item }">
          <span :class="(item.status == true) ? 'success--text' : 'error--text'">{{ (item.status == true) ? 'ใช้งาน' : 'ยกเลิก' }}</span>
        </template>
        <template v-slot:[`item.created_date`]="{ item }">
          <span>{{ new Date(item.created_date).toLocaleDateString('TH') }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openForm(item._id)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteData(item._id)">
            mdi-delete
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
  pageTitle: "",
  toolbarMode: "hide",
  async validate({ params, query, store }) {
    const MenuCode = "control-user";
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
      lists: 'control-user/lists',
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
            text: "ชื่อผู้ใช้",
            value: 'username',
            sortable: false
          },
          {
            text: "ชื่อ",
            value: 'first_name',
            sortable: false,
          },
          {
            text: "นามสกุล",
            value: 'last_name',
            sortable: false
          },
          {
            text: "สร้างวันที่",
            value: 'created_date',
            sortable: false
          },
          {
            text: "สถานะ",
            value: 'status',
            sortable: false
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
      loadData: 'control-user/loadData',
      delete: 'control-user/delete'
    }),
    rowClass(item) {
      return (item.status == ('false' || false)) ? 'error--text' : ''
    },
    openForm(id) {
      this.$router.push({ path: this.$route.path + "/" + id })
    },
    async deleteData(id) {
      Swal.fire({
        title: 'ต้องการลบข้อมูลจริงหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ไม่'
      }).then(async (result) => {
        
        if (result.isConfirmed) {
          let res = await this.delete(id)
          if (res.status == 'false') {
            Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', })
          } else {
            Swal.fire({ position: 'top-center', icon: 'success', title: 'ลบสำเร็จ' })
          }
        }

      })
    }

  },
  async fetch() {
    this.loading = true
    let param = { show_all: 'y' }
    await this.loadData(param)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped></style>