<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <el-input v-model="input" placeholder="请输入商品名称" />
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
        @click="showOrderDialog"
      >添加</el-button>
      <!--      <el-button-->
      <!--        round-->
      <!--        color="#D6A557"-->
      <!--        type="danger"-->
      <!--        icon="el-icon-remove"-->
      <!--        style="margin-left: 10px"-->
      <!--        @click="removeStore"-->
      <!--      >批量删除</el-button>-->
      <!--        :disabled="selectedId.length===0"-->
    </div>
    <!--
          表格组件
          data:表格组件将来需要展示的数据------数组类型
          border:给表格添加边框
          align：标题对齐方式
          -->
    <el-table style="width: 100%" border stripe :data="tableData">
      <el-table-column type="selection" width="50px" />
      <el-table-column prop="id" label="序号" width="100px" align="center" />
      <el-table-column prop="orderNum" label="订单编号" width="" align="center" />
      <el-table-column prop="amount" label="总价格" width="" align="center" />
      <el-table-column prop="status" label="支付状态" width="" align="center" />
      <el-table-column prop="postage" label="邮费" width="" align="center" />
      <el-table-column prop="create_time" label="订单创建时间" width="" align="center" />
      <el-table-column prop="address" label="收货地址" width="" align="center" />
      <el-table-column prop="pno" label="商品编号" width="" align="center" />
      <el-table-column prop="pname" label="商品名称" width="" align="center" />
      <el-table-column prop="pnum" label="商品数量" width="" align="center" />
      <el-table-column prop="price" label="商品单价" width="" align="center" />
      <el-table-column prop="" label="操作" width="180px" align="center">
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
        <el-form-item label="总价格" label-width="100px">
          <el-input v-model="amount_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮费" label-width="100px">
          <el-input v-model="postage_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="address_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品数量" label-width="100px">
          <el-input v-model="pnum_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品编号" label-width="100px">
          <el-input v-model="pno_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="pname_add" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改订单信息" :visible.sync="dialogFormVisible2">
      <el-form style="width: 90%">
        <el-form-item label="邮费" label-width="100px">
          <el-input v-model="postage_edit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="address_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品编号" label-width="100px">
          <el-input v-model="pno_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="pname_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品数量" label-width="100px">
          <el-input v-model="pnum_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总价" label-width="100px">
          <el-input v-model="amount_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品单价" label-width="100px">
          <el-input v-model="price_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="序号" label-width="100px">
          <el-input v-model="id_edit" autocomplete="off" readonly="readonly" />
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
// import { getProTypeList } from '@/api/proType'
import axios from 'axios'
// import { searchType } from '@/api/searchType'
import { getEveryOrderList } from '@/api/everyOrder'
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
      delrow: '',
      //
      // 添加订单信息
      amount_add: '',
      postage_add: '',
      address_add: '',
      pno_add: '',
      pname_add: '',
      pnum_add: '',
      //
      // 修改订单信息
      amount_edit: '',
      postage_edit: '',
      address_edit: '',
      pno_edit: '',
      pname_edit: '',
      pnum_edit: '',
      id_edit: '',
      price_edit: ''

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const orderData = await getEveryOrderList()
      this.tableData = orderData.data.data
      // console.log(orderData.data.data)
    },
    async showOrderDialog() {
      this.dialogFormVisible1 = true
    },
    sureAdd() {
      this.dialogFormVisible1 = false
      axios.post('/orderInfo/addOrder?postage=' + this.postage_add + '&address=' + this.address_add + '&pno= ' + this.pno_add + '&pname=' + this.pname_add + '&pnum=' + this.pnum_add + '&amount=' + this.amount_add).then((res) => {
        console.log(res.data)
        if (res.data.msg === '执行成功') {
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
        await this.$alert('请输入订单商品名称', '提示', {
          confirmButtonText: '确定',
          callback: () => {}
        })
      } else {
        this.tableData = []
        await axios.get('/orderInfo/findByPname?pname=' + this.input).then((res) => {
          // console.log(res.data)
          // if (res.flag) {
          this.$message({ message: '查询成功！', type: 'success' })
          // } else {
          //   this.$message({ message: '查询失败！', type: 'error' })
          // }
          this.tableData = res.data
        })
      }
    },
    async resetSearch() {
      this.input = ''
      const storeData = await getEveryOrderList()
      this.tableData = storeData.data.data
    },
    async removeStore() {},
    clickEdit(row) {
      this.dialogFormVisible2 = true
      this.postage_edit = row.postage
      this.address_edit = row.address
      this.pno_edit = row.pno
      this.pname_edit = row.pname
      this.pnum_edit = row.pnum
      this.amount_edit = row.amount
      this.price_edit = row.price
      this.id_edit = row.id
    },
    clickDel(row) {
      this.dialogFormVisible4 = true
      this.delrow = row
      // console.log(this.delrow.id)
    },
    sureEdit() {
      this.dialogFormVisible3 = true
    },
    sure() {
      axios.post('/orderInfo/editOrder?postage=' + this.pnum_edit + '&address=' + this.address_edit + '&pno=' + this.pno_edit + '&pname=' + this.pname_edit + '&pnum=' + this.pnum_edit + '&amount=' + this.amount_edit + '&price=' + this.price_edit + '&id=' + this.id_edit).then((res) => {
        // console.log(res.data)
        // if (res.data.flag) {
        this.dialogFormVisible2 = false
        this.$message({ message: '修改成功！', type: 'success' })
        location.reload()
        // } else {
        //   this.$message({ message: '修改失败！', type: 'error' })
        // }
      })
    },
    sureDel() {
      axios.delete('/orderInfo/deleteOrder?id=' + this.delrow.id)
      // console.log(this.delrow.id)
      this.dialogFormVisible4 = false
      location.reload()
      this.$message({ message: '删除成功！', type: 'success' })
    }
  }
}
</script>

<style scoped></style>
