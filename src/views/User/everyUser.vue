<template>
  <el-card>
    <el-form inline>
      <el-table style="width: 100%" border stripe :data="tableData">
        <el-table-column type="selection" width="50px" />
        <el-table-column prop="id" label="用户ID" width="100px" align="center" />
        <el-table-column prop="name" label="姓名" width="" align="center" />
        <el-table-column prop="password" type="password" label="密码" width="" align="center" />
        <el-table-column prop="adress" label="地址" width="" align="center" />
        <el-table-column prop="email" label="邮箱" width="" align="center" />
      </el-table>
    </el-form></el-card>
</template>

<script>
import { getEveryUserList } from '@/api/everyUser'
export default {
  name: 'RoleList',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const everyUserData = await getEveryUserList()
      this.tableData = everyUserData.data.data
    }
  }
}
</script>

<style scoped></style>
