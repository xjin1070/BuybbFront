<template>
  <div>
    <el-form style="width: 90%">
      <el-form-item label="用户ID" label-width="120px">
        <el-input v-model="user.ID" autocomplete="off" readonly="readonly" />
      </el-form-item>
      <el-form-item label="姓名" label-width="120px">
        <el-input v-model="user.name" autocomplete="off" readonly="readonly" />
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input
          v-model="user.password"
          autocomplete="off"
          readonly="readonly"
          type="password"
        />
      </el-form-item>
      <el-form-item label="邮箱" label-width="120px">
        <el-input v-model="user.email" autocomplete="off" readonly="readonly" />
      </el-form-item>
      <el-button type="primary" style="margin-left: 865px" @click="editPerson">修改个人信息</el-button>
    </el-form>
    <!--修改个人信息-->
    <el-dialog title="修改用户信息(如需修改密码，密码将被重置！)" :visible.sync="dialogFormVisible_edit">
      <el-form style="width: 90%">
        <el-form-item label="用户ID" label-width="120px">
          <el-input v-model="ID2" autocomplete="off" readonly="readonly" />
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="name2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="password2" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="email2" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        ID: '',
        name: '',
        password: '',
        email: ''
      },
      dialogFormVisible_edit: false,
      ID2: '',
      name2: '',
      password2: '',
      email2: '',
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const { data: res } = await this.$http.get('/getById/' + token)
    // console.log(res)
    this.user.ID = res.data.id
    this.user.email = res.data.email
    this.user.name = res.data.name
    this.user.password = res.data.password
  },
  methods: {
    editPerson() {
      this.dialogFormVisible_edit = true
      this.ID2 = this.user.ID
      this.name2 = this.user.name
      this.password2 = this.user.password
      this.email2 = this.user.email
    },
    sureEdit() {
      // console.log(this.name2)
      const suc = axios.post('/updateById?id=' + this.ID2 + '&password=' + this.password2 + '&name=' + this.name2 + '&email=' + this.email2 + '&position', {
      })
      suc.then((res) => {
        if (res.data.flag) {
          this.dialogFormVisible_edit = false
          this.$message({ message: '修改成功！', type: 'success' })
          location.reload()
        }
      })
    }
  }
}
</script>

<style></style>
