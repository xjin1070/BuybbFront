<template>
  <el-card>
    <el-form inline>
      <el-form-item>
        <el-input v-model="input" placeholder="请输入商品名称" />
      </el-form-item>
      <!--      <el-select v-model="empPosition" placeholder="请选择员工的position">-->
      <!--        <el-option-->
      <!--          v-for="item in options"-->
      <!--          :key="item.value"-->
      <!--          ref="op"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value"-->
      <!--        />-->
      <!--      </el-select>-->
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 20px"
        round
        color="#D6A557"
        @click="searchPro"
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
        style="margin: 10px 0"
        @click="showProDialog"
      >添加</el-button>
      <!--        :disabled="selectedId.length===0"-->
    </div>
    <!--
        表格组件
        data:表格组件将来需要展示的数据------数组类型
        border:给表格添加边框
        align：标题对齐方式
        -->
    <el-table
      style="width: 100%"
      border
      stripe
      :data="tableData"
    >
      <!--      @selection-change="handleSelectionChange"-->

      <el-table-column type="selection" width="50px" />
      <el-table-column type="index " label="序号" width="100px" align="center">
        <template scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pno" label="商品编号" width="" align="center" />
      <el-table-column prop="pname" label="商品名称" width="" align="center" />
      <el-table-column
        prop="price"
        label="商品单价"
        width=""
        align="center"
      />
      <el-table-column
        prop="pinvent"
        label="商品库存"
        width=""
        align="center"
      />
      <el-table-column prop="punit" label="商品单位" width="" align="center" />
      <el-table-column prop="pnw" label="商品净重" width="" align="center" />
      <el-table-column prop="pexp" label="商品保质期" width="" align="center" />
      <el-table-column prop="pintro" label="商品简介" width="" align="center" />
      <el-table-column prop="tno" label="商品类型编号" width="" align="center" />
      <el-table-column prop="tname" label="商品类型名称" width="" align="center" />
      <el-table-column prop="status" label="商品状态" width="" align="center" />
      <el-table-column prop="" label="操作" width="220px" align="center">
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
    <!--    分页器-->
    <!--当前页
        数据总条数
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="limit"
      :total="total"
      :page-count="5"
      layout="prev, pager, next, jumper,->, sizes, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--对话框-->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible1">
      <el-form style="width: 90%">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="pname_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品单价" label-width="120px">
          <el-input v-model="price_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品库存" label-width="120px">
          <el-input v-model="pinvent_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品单位" label-width="120px">
          <el-input v-model="punit_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品净重" label-width="120px">
          <el-input v-model="pnw_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品保质期" label-width="120px">
          <el-input v-model="pexp_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品简介" label-width="120px">
          <el-input v-model="pintro_add" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品类型名称" label-width="120px">
          <!--          <el-input v-model="tname_add" autocomplete="off" />-->
          <el-select v-model="tname_add" clearable placeholder="请选择">
            <el-option
              v-for="item in tnamelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型编号" label-width="120px">
          <el-input v-model="tno_add" autocomplete="off" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px">
          <!--          <el-input v-model="status_add" autocomplete="off" />-->
          <el-select v-model="status_add" clearable placeholder="请选择">
            <el-option
              v-for="item in options_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible2">
      <el-form style="width: 90%">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="pname_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品单价" label-width="120px">
          <el-input v-model="price_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品库存" label-width="120px">
          <el-input v-model="pinvent_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品单位" label-width="120px">
          <el-input v-model="punit_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品净重" label-width="120px">
          <el-input v-model="pnw_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品保质期" label-width="120px">
          <el-input v-model="pexp_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品简介" label-width="120px">
          <el-input v-model="pintro_edit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品类型名称" label-width="120px">
          <!--          <el-input v-model="tname_add" autocomplete="off" />-->
          <el-select v-model="tname_edit" clearable placeholder="请选择">
            <el-option
              v-for="item in tnamelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型编号" label-width="120px">
          <el-input v-model="tno_edit" autocomplete="off" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px">
          <!--          <el-input v-model="status_add" autocomplete="off" />-->
          <el-select v-model="status_edit" clearable placeholder="请选择">
            <el-option
              v-for="item in options_status"
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
        <el-form-item label="确认修改?" label-width="100px" />
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
// import { getStoreList } from '@/api/store'
// import { searchEmployee } from '@/api/searchemployee'
import axios from 'axios'
import { getEveryProList } from '@/api/everyPro'
import { searchPro } from '@/api/searchPro'
// import { searchEmployee } from '@/api/searchemployee'
export default {
  name: 'AclUserList',
  // inject: ['reload'],
  data() {
    return {
      options_status: [
        {
          value: '1',
          label: '正常'
        },
        {
          value: '0',
          label: '已下架'
        }
      ],
      pno: '',
      // 添加商品所用到的变量
      pname_add: '',
      pinvent_add: '',
      price_add: '',
      punit_add: '',
      pnw_add: '',
      pexp_add: '',
      pintro_add: '',
      tname_add: '',
      tno_add: '',
      status_add: '',
      tnamelist: [],
      //
      //
      // 编辑商品信息所用到的变量
      pname_edit: '',
      pinvent_edit: '',
      price_edit: '',
      punit_edit: '',
      pnw_edit: '',
      pexp_edit: '',
      pintro_edit: '',
      tname_edit: '',
      tno_edit: '',
      status_edit: '',
      //
      //
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      tableData: [],
      input: '', // 查询输入框内容
      delrow: '',
      multipleSelection: [],
      // employeePosition: '',
      //
      //
      //
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      tokenShopID: ''
      // pagesize: 10, //    每页的数据
      // tableData: [],
      // currentPage: 1, // 第几页
      // totalCount: 1 // 总条数 这些数据虽然后面会赋值为后端返回的数，但是最好不要为空
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      const proDate = await getEveryProList(this.page, this.limit)
      this.total = proDate.data.total
      this.tableData = proDate.data.productInfos
    },
    handleCurrentChange(pager) {
      // console.log(pager)
      this.page = pager
      if (this.input === '') {
        this.fetchData()
      } else {
        this.searchPro()
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      if (this.input === '') {
        this.fetchData()
      } else {
        this.searchPro()
      }
    },
    async showProDialog() {
      this.dialogFormVisible1 = true
      const s = await axios.get('/type/findTypeColumn')
      for (let i = 0; i < s.data.length; i++) {
        this.tnamelist.push({
          value: s.data[i].tname,
          lable: s.data[i].tname
        }
        )
      }
    },
    async sureAdd() {
      const succ = await axios.get('/type/findTypeOne/' + this.tname_add)
      this.tno_add = succ.data[0].tno
      const pno = ''
      axios.post('/productInfo/addProduct?pname=' + this.pname_add + '&price=' + this.price_add + '&pinvent=' + this.pinvent_add + '&punit=' + this.punit_add + '&pnw=' + this.pnw_add + '&pexp=' + this.pexp_add + '&pintro=' + this.pintro_add + '&pno=' + pno + '&tno=' + this.tno_add + '&tname=' + this.tname_add + '&status=' + this.status_add)
      this.dialogFormVisible1 = false
      this.$message({ message: '添加成功！', type: 'success' })
    },
    async searchPro() {
      if (this.input === '') {
        await this.$alert('请输入商品名称！', '提示', {
          confirmButtonText: '确定',
          callback: () => {}
        })
      } else {
        this.tableData = []
        const pro = await searchPro(
          this.page,
          this.limit,
          this.input
        )
        // console.log(pro.code === 20000)
        if (pro.code === 20000) {
          this.total = pro.data.total
          this.list = pro.data.productInfos
          this.tableData = this.list
        }
      }
    },
    async resetSearch() {
      this.input = ''
      const proData = this.fetchData()
      this.tableData = proData.data
    },
    async clickEdit(row) {
      const s = await axios.get('/type/findTypeColumn')
      for (let i = 0; i < s.data.length; i++) {
        this.tnamelist.push({
          value: s.data[i].tname,
          lable: s.data[i].tname
        }
        )
      }
      // console.log(row.status)
      this.dialogFormVisible2 = true
      this.pname_edit = row.pname
      this.price_edit = row.price
      this.pinvent_edit = row.pinvent
      this.punit_edit = row.punit
      this.pnw_edit = row.pnw
      this.pexp_edit = row.pexp
      this.pintro_edit = row.pintro
      this.tname_edit = row.tname
      this.tno_edit = row.tno
      this.status_edit = row.status
      this.pno = row.pno
    },
    clickDel(row) {
      // console.log(row)
      this.dialogFormVisible4 = true
      this.delrow = row
    },
    sureEdit() {
      this.dialogFormVisible3 = true
    },
    sure() {
      axios.put('/productInfo/updateProduct?pname=' + this.pname_edit + '&price=' + this.price_edit + '&pinvent=' + this.pinvent_edit + '&punit=' + this.punit_edit + '&pnw=' + this.pnw_edit + '&pexp=' + this.pexp_edit + '&pintro=' + this.pintro_edit + '&pno=' + this.pno + '&tno=' + this.tno_edit + '&tname=' + this.tname_edit + '&status=' + this.status_edit)
      this.dialogFormVisible2 = false
      this.dialogFormVisible3 = false
      location.reload()
    },
    sureDel() {
      axios.delete('/productInfo/deleteProduct/' + this.delrow.pno)
      this.dialogFormVisible4 = false
      // console.log(this.delrow.pno)
      // location.reload()
      this.$message({ message: '删除成功！', type: 'success' })
    }
  }
}
</script>

<style scoped></style>
