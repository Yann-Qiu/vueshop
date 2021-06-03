<template>
    <div class="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >权限管理</el-breadcrumb-item>
            <el-breadcrumb-item >角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
            <el-table
                v-loading="loading"
                :data="roleList"
                border
                stripe
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbot',i1 === 0 ? 'bdtop' : '']" v-for="item1,i1 in scope.row.children" :key="item1.id">
                            <el-col :span="5">
                                <el-tag>
                                    {{item1.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row :class="[i2 === 0 ? '' : 'bdtop']" v-for="item2,i2 in item1.children" :key="item2.id">
                                    <el-col :span="5">
                                        <el-tag type="success">
                                            {{item2.authName}}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="19">
                                        <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="角色名称">
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="角色描述">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="300px">
                    <template >
                        <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                        <el-button type="warning" size="mini" icon="el-icon-setting" >分配权限</el-button>
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
      roleList: [],
      loading: false
    }
  },
  components: {

  },
  computed: {
  },
  methods: {
    async getRoleList () {
      this.loading = true
      const { data } = await this.$http.get('/roles')
      if (data.meta.status === 200) {
        console.log(data.data)
        this.roleList = data.data
        this.loading = false
      } else {
        this.$message.error('get role list fail')
      }
    }
  },
  created () {
    this.getRoleList()
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

    .el-tag{
        margin: 5px;
    }

    .bdtop{
        border-top: 1px solid #eee;
    }

    .bdbot{
        border-bottom: 1px solid #eee;
    }

</style>
