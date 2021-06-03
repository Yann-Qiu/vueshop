<template>
    <div class="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table
                v-loading="loading"
                :data="rightList"
                border
                stripe
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="authName"
                    label="权限名称">
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径">
                </el-table-column>
                <el-table-column
                    label="权限等级">
                    <template slot-scope="scope">
                        <el-tag
                        v-if="scope.row.level == 0"
                        type="primary"
                        disable-transitions>
                            一级
                        </el-tag>
                        <el-tag
                        v-else-if=" scope.row.level == 1"
                        type="success"
                        disable-transitions>
                            二级
                        </el-tag>
                        <el-tag
                        v-else
                        type="warning"
                        disable-transitions>
                            三级
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
      rightList: [],
      loading: false
    }
  },
  components: {

  },
  computed: {
  },
  methods: {
    async getRightList () {
      this.loading = true
      const { data } = await this.$http.get('/rights/list')
      if (data.meta.status === 200) {
        this.rightList = data.data
        this.loading = false
      } else {
        this.$message.error('get right list fail')
      }
    }
  },
  created () {
    this.getRightList()
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
    }

    .topBox{
        margin-bottom: 15px;
    }

    .el-pagination{
        margin-top: 15px;
    }
</style>
