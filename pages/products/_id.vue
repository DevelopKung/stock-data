<template>
  <div>
    <FormActionBar :title="titleMode">
      <v-btn class="mr-2" small depressed @click="$router.replace('/products')">ยกเลิก</v-btn>
      <v-btn color="primary" small depressed @click="validateData(form)">ตกลง</v-btn>
    </FormActionBar>
    <v-card class="pa-4" outlined style="min-height: 76vh;">
      <v-form ref="form" v-model="form_valid">
        <v-row class="px-8 pt-2">

          <v-col cols="12" sm="3" md="2" class="pt-5 pb-0">
            <h4>โค้ดสินค้า</h4>
          </v-col>
          <v-col cols="12" sm="9" md="4" class="pb-0">
            <v-text-field v-model="form.product_code" :rules="valid" required class="mb-2" placeholder="โค้ดสินค้า"
              outlined dense hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" md="2" class="pt-5 pb-0">
            <h4>ชื่อสินค้า</h4>
          </v-col>
          <v-col cols="12" sm="9" md="4" class="pb-0">
            <v-text-field v-model="form.product_name" :rules="valid" required class="mb-2" placeholder="ชื่อสินค้า"
              outlined dense hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" md="2" class="pt-5 pb-0">
            <h4>ไซส์</h4>
          </v-col>
          <v-col cols="12" sm="9" md="4" class="pb-0">
            <v-text-field v-model="form.product_size" :rules="valid" required class="mb-2" placeholder="ไซส์" outlined
              dense hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" md="2" class="pt-5 pb-0">
            <h4>สถานะ</h4>
          </v-col>
          <v-col cols="12" sm="9" md="4" class="">
            <v-radio-group class="py-0" v-model="form.status" dense row hide-details>
              <v-radio label="เปิดใช้งาน" :value="true"></v-radio>
              <v-radio label="ปิดใช้งาน" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      id: this.$route.params.id,
      mode: 'new',
      form: {
        status: true
      },
      loading: false,
      form_valid: true,
      valid: [v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'],
    }
  },
  computed: {
    titleMode() {
      if (this.mode == 'new') return 'สร้าง'
      else return 'แก้ไข'
    },
    checkForm() {
      if (!this.form.product_code || !this.form.product_name || !this.form.product_size) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions({
      loadInfo: 'products/loadInfo',
      create: 'products/create',
      update: 'products/update',
    }),
    async getInfo(id) {
      this.loading = true
      const res = await this.loadInfo(id)
      if (res.status == true) {
        this.form = res.payload
      }
      this.loading = false
    },
    validateData(form) {
      console.log(form);
      if (this.checkForm) {
        if (this.mode == 'new') {
          this.createData(form)
        } else {
          this.updateData(form)
        }
      }
    },

    async createData(form) {
      form.created_by = this.$auth.user.username
      const res = await this.create(form)
      if (res.status == true) {
        Swal.fire({ icon: 'success', title: res.message, })
        this.$router.replace('/products')
      } else {
        Swal.fire({ icon: 'error', title: res.message, })
      }
    },

    async updateData(form) {
      form.updated_by = this.$auth.user.username
      const res = await this.update({ id: form._id, form })
      if (res.status == true) {
        Swal.fire({ icon: 'success', title: res.message, })
        this.$router.replace('/products')
      } else {
        Swal.fire({ icon: 'error', title: res.message, })
      }
    }

  },
  created() {
    if (this.id && this.id != 'new') {
      this.getInfo(this.id)
      this.mode = 'edit'
    }
  },
}
</script>

<style lang="scss" scoped></style>