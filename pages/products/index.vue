<template>
  <div>
    <FormFilterBar>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-select v-model="filter.selected" :items="items" item-text="name" item-value="value" outlined placeholder="ค้นหา" hide-details dense></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="filter.search" prepend-inner-icon="mdi-magnify" outlined placeholder="ค้นหา" single-line hide-details clearable dense></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <!-- <v-btn color="success" small depressed @click="exportData">ส่งข้อมูลออก</v-btn> -->
          <download-excel :data="exportData" name="data-product.xls" :fields="fields">
            <v-btn color="teal" dark small depressed>ส่งข้อ</v-btn> 
          </download-excel>
        </v-col>
        <v-col cols="auto">
          <v-btn color="success" small depressed @click="show_upload = true">อัพโหลด</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="info" small depressed @click="getData">รีเฟรช</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" small depressed @click="openForm('new')">เพิ่ม</v-btn>
        </v-col>
      </v-row>
    </FormFilterBar>
    <v-card class="pa-4" outlined style="min-height: 76vh;">
      <v-data-table dense :search="filter.search" :headers="dataTable.headers" :items="lists_items" :items-per-page="30" :footer-props="dataTable.footerProps" :item-class="rowClass" item-key="id">
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
          <v-icon small class="mr-2" @click="viewData(item._id)">
            mdi-eye
          </v-icon>
          <v-icon small class="mr-2" @click="openForm(item._id)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteData(item._id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="show_upload" persistent width="500" >
      <v-card>
        <v-card-title> อัพโหลด </v-card-title>
        <v-card-text>
          <v-file-input v-model="file_excel" prepend-icon="" prepend-inner-icon="mdi-paperclip"  ref="file_csv" outlined dense hide-details
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></v-file-input>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn small depressed @click="show_upload = false">ยกเลิก</v-btn>
          <v-btn color="success" small depressed @click="uploadFile(file_excel)">อัพโหลด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="show_data" persistent width="500" >
      <v-card>
        <v-card-title> ดูข้อมูล </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-4 px-6">
          <div class="d-flex justify-space-between py-1">
            <h3>ใบตรวจนับสินค้า</h3>
            <h3>แถวที่ {{ info.product_row }} เลขที่ 1</h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>ขนาด</h3>
            <h3>{{ info.product_size }}</h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>รหัส</h3>
            <h3>{{ info.product_code }}</h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>ลาย</h3>
            <h3>{{ info.product_name }}</h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>จำนวนกล่อง</h3>
            <h3>{{ info.product_qty_box }} </h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>แผ่น</h3>
            <h3>{{ info.product_unit }} </h3>
          </div>
          <div class="d-flex justify-space-between py-1">
            <h3>หมายเหตุ</h3>
            <h3>{{ info.product_remark }} </h3>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn small depressed @click="show_data = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Loader v-if="loading" :loading="loading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import socket from '@/plugins/socket.io'
import Swal from 'sweetalert2'

export default {
  pageTitle: "",
  toolbarMode: "hide",
  async validate({ params, query, store }) {
    const MenuCode = "products";
    const valid = await store.dispatch("menu/validateRole", MenuCode);
    return valid;
  },
  data() {
    return {
      loading: false,
      file_excel: null,
      messages: [],
      show_data: false, 
      show_upload: false,
      info: {},
      filter: {
        search: null,
        selected: ''
      },
      items: [{
        id: 0,
        name: 'ทั้งหมด',
        value: ''
      },
      {
        id: 1,
        name: 'ที่นับแล้ว',
        value: 'counted'
      },
      {
        id: 2,
        name: 'ที่ยังไม่นับ',
        value: 'not_counted'
      }],
      fields: {
        "โค้ด": "code",
        "ชื่อ": "name",
        "ไซส์": "size",
        "แถว": "row",
        "จำนวนกล่อง": "qty_box",
        "แผ่น": "unit",
        "หมายเหตุ": "remark",
      },
    }
  },
  computed: {
    ...mapGetters({
      lists: 'products/lists',
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
            text: "สร้างวันที่",
            value: 'created_date',
            sortable: false,
            width: 70
          },
          {
            text: "สถานะ",
            value: 'status',
            sortable: false,
            width: 100
          },
          {
            text: '',
            value: 'actions',
            sortable: false,
            width: 150,
            align: "right"
          }
        ],
        footerProps: {
          'items-per-page-options': [30, 50, 100, -1],
          'itemsPerPageText': "จำนวนต่อหน้า"
        }
      }
    },

    lists_items(){
      if (this.filter.selected == '') {
        return this.lists
      } else if (this.filter.selected == 'counted') {
        return this.lists.filter(x => x.user_id)
      } else if (this.filter.selected == 'not_counted') {
        return this.lists.filter(x => !x.user_id)
      }
    },
     
    exportData(){
      return this.lists_items.map(x => {
        return {
          code: x.product_code,
          name: x.product_name,
          size: x.product_size,
          row: x.product_row,
          unit: x.product_unit,
          qty_box: x.product_qty_box,
          remark: x.product_remark
        }
      })
    }

  },
  methods: {
    ...mapActions({
      loadData: 'products/loadData',
      delete: 'products/delete',
      importFile: 'products/importFile',
      loadInfo: 'products/loadInfo',
      exportFile: 'products/exportFile',
    }),
    rowClass(item) {
      return (item.status == ('false' || false)) ? 'error--text' : ''
    },
    openForm(id) {
      this.$router.push({ path: this.$route.path + "/" + id })
    },
    async getData(){
      this.loading = true
      let param = { show_all: 'y' }
      await this.loadData(param)
      this.loading = false
    },
    async viewData(id){
      this.loading = true
      const res = await this.loadInfo(id)
      if (res.status == true) {
        this.info = res.payload
        this.show_data = true
      }
      this.loading = false
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
          await this.delete(id).then((res) => {
            if (res.status == 'error') {
              this.alert.icon = 'error'
              this.alert.description = 'เกิดข้อผิดพลาด'
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
              })
            } else {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'ลบสำเร็จ',
              })
            }
          })

        }
      })

    },
    async uploadFile(file){
      this.loading = true
      if (file) {
        let res = await this.importFile({id: this.$auth.user._id, file})
        if (res.status == true) {
          this.clearImport()
          let response = await Swal.fire({ icon: 'success', title: res.message })
          if (response) {
            this.getData();
          }
          this.show_upload = false
        } else {
          await Swal.fire({ icon: 'error', title: res.message })
        }
        this.loading = false
      }
    },
    clearImport(){
      this.file_excel = null
    },
    async refreshData(){
      await this.getData()
    },
    async exportData(){
      await this.getData()

      this.lists_items
      const url = window.URL.createObjectURL(new Blob([res]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nameZip);
      link.click();
    }
  },
  async fetch() {
    await this.getData()
  }
}
</script>

<style lang="scss" scoped></style>