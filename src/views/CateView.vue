<template>
    <div class="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >商品管理</el-breadcrumb-item>
            <el-breadcrumb-item >商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
            <el-table
                v-loading="loading"
                :data="goodsListInfo.result"
                border
                stripe
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="cat_name"
                    label="分类名称">
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="是否有效">
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="排序">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="300px">
                    <template>
                        <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2,5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="goodsListInfo.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
      goodsListInfo: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 2
      },
      loading: false
    }
  },
  components: {

  },
  computed: {
  },
  methods: {
    async getGoodsList () {
      this.loading = true
      const { data } = await this.$http.get('/categories', { params: this.queryInfo })
      console.log(data)
      if (data.meta.status === 200) {
        this.goodsListInfo = data.data
        console.log(this.goodsListInfo)
        this.loading = false
      } else {
        this.$message.error('get role list fail')
      }
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.loading = true
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.loading = true
      this.getGoodsList()
    }
  },
  created () {
    this.getGoodsList()
  }
}
</script>

<style scoped>
    .rights{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-card{
        margin-top: 20px;
        overflow: auto;
    }

    .el-table{
        margin-top: 15px;
    }

    .topBox{
        margin-bottom: 15px;
    }

    .el-pagination{
        margin-top: 15px;
    }

</style>
