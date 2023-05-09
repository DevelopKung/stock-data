<template>
  <div>
    <FormActionBar :title="titleMode">
      <v-btn class="mr-2" small depressed @click="$router.replace('/information')">ยกเลิก</v-btn>
      <v-btn color="primary" small depressed @click="validateData(form)">ตกลง</v-btn>
    </FormActionBar>

    <v-card class="pa-4" outlined>
      <v-form ref="form" v-model="form_valid">
        <v-row class="px-sm-8 px-0 pt-2">
          <v-col cols="12" sm="3" class="py-0">
            <h4>โค้ดสินค้า</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_code" readonly :rules="valid" class="mb-2" placeholder="โค้ดสินค้า" outlined dense
              hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>ชื่อสินค้า</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_name" readonly :rules="valid" class="mb-2" placeholder="ชื่อสินค้า" outlined dense
              hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>ไซส์</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_size" readonly :rules="valid" class="mb-2" placeholder="ไซส์" outlined dense
              hide-details></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>แถว</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_row" class="mb-2" placeholder="แถว" outlined dense hide-details
              hide-spin-buttons type="number"></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>จำนวนกล่อง</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_qty_box" class="mb-2" placeholder="จำนวนกล่อง" outlined dense hide-details
              hide-spin-buttons type="number"></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>แผ่น</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field v-model="form.product_unit" class="mb-2" placeholder="แผ่น" outlined dense hide-details
              hide-spin-buttons type="number"></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" class="py-0">
            <h4>หมายเหตุ</h4>
          </v-col>
          <v-col cols="12" sm="9" class="py-0">
            <v-textarea v-model="form.product_remark" class="mb-2" placeholder="หมายเหตุ" outlined dense
              hide-details></v-textarea>
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
    const MenuCode = "form-user";
    const valid = await store.dispatch("menu/validateRole", MenuCode);
    return valid;
  },
  data() {
    return {
      id: this.$route.params.id,
      mode: 'new',
      form: {},
      compare: {},
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
      loadInfo: 'form-user/loadInfo',
      create: 'form-user/create',
      update: 'form-user/update',
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
      if (this.checkForm) {
        this.updateData(form)
      }
    },
    async updateData(form) {
      form.user_id = this.$auth.user._id
      form.updated_by = this.$auth.user._id
      const res = await this.update({ id: form._id, form })
      if (res.status == true) {
        Swal.fire({ icon: 'success', title: res.message, })
        this.$router.replace('/form-user')
      } else {
        Swal.fire({ icon: 'error', title: res.message, })
      }
    }

  },
  created() {
    this.getInfo(this.id)
  },
}
</script>

<style lang="scss" scoped></style>