<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <el-input v-model="input" placeholder="请输入商品编号" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        round
        color="#D6A557"
        @click="searchType"
      >查询</el-button>
      <el-button
        type="default"
        round
        color="#D6A557"
        @click="resetSearch"
      >清空</el-button>
    </el-form>

    <div style="margin-bottom: 20px">
      <el-button
        round
        color="#D6A557"
        type="primary"
        icon="el-icon-plus"
        style="margin: 10px 0px"
        @click="showStoreDialog"
      >添加</el-button>
      <!--        :disabled="selectedId.length===0"-->
    </div>
    <el-table style="width: 100%" border stripe :data="tableData">
      <el-table-column type="selection" width="50px" />
      <el-table-column type="index " label="序号" width="100px" align="center">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tno" label="商品编号" width="" align="center" />
      <el-table-column prop="tname" label="商品名称" width="" align="center" />
      <el-table-column prop="status" label="状态" width="" align="center" />
      <el-table-column prop="" label="操作" width="" align="center">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="clickEdit(row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="clickDel(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <!--    <el-pagination-->
    <!--      style="margin-top: 20px; text-align: center"-->
    <!--      :current-page="currentPage"-->
    <!--      :page-sizes="[3,5,10]"-->
    <!--      :page-size="pagesize"-->
    <!--      :total="totalCount"-->
    <!--      layout="prev, pager, next, jumper,->, sizes, total"-->
    <!--      @size-change="handleSizeChange"-->
    <!--      @current-change="handleCurrentChange"-->
    <!--    />-->
    <!--对话框-->
    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisible1">
      <el-form style="width: 90%">
        <!--        <el-form-item label="商品编号" label-width="100px">-->
        <!--          <el-input autocomplete="off" readonly="readonly" />-->
        <!--        </el-form-item>-->
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="tname_1" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商品类型信息" :visible.sync="dialogFormVisible2">
      <el-form style="width: 90%">
        <el-form-item label="商品编号" label-width="100px">
          <el-input v-model="tno_edit" autocomplete="off" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="tname_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-select v-model="status_edit" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogFormVisible3">
      <el-form style="width: 90%">
        <el-form-item label="确认修改吗？" label-width="100px" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogFormVisible4">
      <el-form style="width: 90%">
        <el-form-item label="是否确认删除？" label-width="120px" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="sureDel()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getProTypeList } from '@/api/proType'
import axios from 'axios'
import { searchType } from '@/api/searchType'
export default {
  name: 'RoleList',
  data() {
    return {
      options: [{
        value: '0',
        // label: '已下架'
        label: '0'
      }, {
        value: '1',
        // label: '正常'
        label: '1'
      }],
      tno_edit: '',
      tname_edit: '',
      status_edit: '',
      tname_1: '',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      tableData: [],
      input: '', // 查询输入框内容
      delrow: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const proTypeData = await getProTypeList()
      this.tableData = proTypeData.data
    },
    async showStoreDialog() {
      this.dialogFormVisible1 = true
    },
    sureAdd() {
      const tno = ''
      this.dialogFormVisible1 = false
      axios.post('/type/add?tno=' + tno + '&tname=' + this.tname_1 + '&status=0').then((res) => {
        // console.log(res.data)
        if (res.data.flag) {
          this.$message({ message: '添加成功！', type: 'success' })
        } else {
          this.$message({ message: '添加失败！', type: 'error' })
        }
        location.reload()
      })
    },
    async searchType() {
      // eslint-disable-next-line no-empty
      if (this.input === '') {
        await this.$alert('请输入商品编号', '提示', {
          confirmButtonText: '确定',
          callback: () => {}
        })
      } else {
        this.tableData = []
        await searchType(this.input).then((res) => {
          // console.log(res)
          if (res.flag) {
            this.$message({ message: '查询成功！', type: 'success' })
          } else {
            this.$message({ message: '查询失败！', type: 'error' })
          }
          this.tableData = Array(res.data)
        })
      }
    },
    async resetSearch() {
      this.input = ''
      const storeData = await getProTypeList()
      this.tableData = storeData.data
    },
    async removeStore() {},
    clickEdit(row) {
      this.dialogFormVisible2 = true
      this.tno_edit = row.tno
      this.tname_edit = row.tname
      this.status_edit = row.status
    },
    clickDel(row) {
      // console.log(row)
      this.dialogFormVisible4 = true
      this.delrow = row
      // console.log(axios.delete('/shop/' + row.ID))
      // this.dialogFormVisible4 = true
    },
    sureEdit() {
      this.dialogFormVisible3 = true
    },
    sure() {
      axios.put('/type/updateByTno?tno=' + this.tno_edit + '&tname=' + this.tname_edit + '&status=' + this.status_edit).then((res) => {
        // console.log(res.data)
        if (res.data.flag) {
          this.dialogFormVisible2 = false
          this.$message({ message: '修改成功！', type: 'success' })
          location.reload()
        } else {
          this.$message({ message: '修改失败！', type: 'error' })
        }
      })
    },
    sureDel() {
      axios.delete('/type/delByTno/' + this.delrow.tno)
      this.dialogFormVisible4 = false
      location.reload()
      this.$message({ message: '删除成功！', type: 'success' })
    }
  }
}
</script>

<style scoped></style>
