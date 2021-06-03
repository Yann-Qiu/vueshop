<template>
    <div class="user">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >用户管理</el-breadcrumb-item>
            <el-breadcrumb-item >用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div style="margin-top: 15px;" class="topBox">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" class="inputBox" @keyup.enter.native="handleSearch" @clear="handleSearch" clearable>
                            <el-button slot="append" class="el-icon-search search" @click="handleSearch"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="loading"
                :data="userInfo.users"
                border
                stripe
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleSwitchChange(scope.row)"
                            v-model="scope.row.mg_state">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUserChange(scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteConfirm(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
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
                :total="userInfo.total">
            </el-pagination>
        </el-card>

        <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleDialogCancel">
        <el-form :model="form" :rules="rules" ref="userform">
            <el-form-item label="用户名" label-width="120px" prop="username">
                <el-input v-model="form.username" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px" prop="password">
                <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="120px" prop="email">
                <el-input v-model="form.email" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="120px" prop="mobile">
                <el-input v-model="form.mobile" autocomplete="off" ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialogCancel">取 消</el-button>
            <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="修改用户信息"
        :visible.sync="dialog2Visible"
        width="50%"
        @close="handleDialog2Cancel">
        <el-form :model="form2" :rules="rules2" ref="userform2">
            <el-form-item label="用户名" label-width="120px" prop="username">
                <el-input v-model="form2.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="120px" prop="email">
                <el-input v-model="form2.email" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="120px" prop="mobile">
                <el-input v-model="form2.mobile" autocomplete="off" ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialog2Cancel">取 消</el-button>
            <el-button type="primary" @click="handleDialog2Submit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        const flag = /\w+@\w+\.\w+/.test(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('请输入正确格式的邮箱'))
        }
      }
    }
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机'))
      } else {
        const flag = /\d{11}/.test(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('请输入正确格式的手机'))
        }
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userInfo: {},
      loading: true,
      dialogVisible: false,
      dialog2Visible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      form2: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ]
      },
      rules2: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  methods: {
    async getUserList () {
      const { data } = await this.$http.get('/users', { params: this.queryInfo })
      if (data.meta.status === 200) {
        this.userInfo = data.data
        this.loading = false
      }
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.loading = true
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.loading = true
      this.getUserList()
    },
    handleSearch () {
      this.loading = true
      this.getUserList()
    },
    async handleSwitchChange (item) {
      const { id } = item
      const mgState = item.mg_state
      this.loading = true
      const { data } = await this.$http.put(`/users/${id}/state/${mgState}`)
      this.loading = false
      console.log(data)
      if (data.meta.status !== 200) {
        item.mg_state = !item.mg_state
        this.$message({
          message: 'Change fail',
          type: 'error'
        })
        return false
      } else {
        this.$message({
          message: 'Change sucess',
          type: 'success'
        })
      }
    },
    handleDialogCancel (item) {
      this.dialogVisible = false
      this.$refs.userform.resetFields()
    },
    handleDialog2Cancel (item) {
      this.dialog2Visible = false
    },
    handleDialogSubmit () {
      this.dialogVisible = false
      this.$refs.userform.validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post('/users', this.form)
          if (data.meta.status === 201) {
            this.$message.success('add user success')
            this.getUserList()
          } else this.$message.error('add user failed')
        } else {
          this.$message.error('add user failed')
          return false
        }
      })
      this.$refs.userform.resetFields()
    },
    handleDialog2Submit () {
      this.dialog2Visible = false
      this.$refs.userform2.validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.put(`/users/${this.form2.id}`, { id: this.form2.id, mobile: this.form2.mobile, email: this.form2.email })
          if (data.meta.status === 200) {
            this.$message.success('edit user success')
            this.getUserList()
          } else this.$message.error('edit user failed')
        } else {
          this.$message.error('edit user failed')
          return false
        }
      })
      this.$refs.userform2.resetFields()
    },
    async handleUserChange (item) {
      this.dialog2Visible = true
      const { id } = item
      const { data } = await this.$http.get(`/users/${id}`)
      if (data.meta.status === 200) {
        this.form2 = data.data
      } else {
        this.$message.error('get userinfo failed')
        this.dialog2Visible = false
      }
    },
    deleteConfirm (id) {
      this.$massgebox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await this.$http.delete(`/users/${id}`)
        if (data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: 'delete success'
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'error',
            message: 'delete failed'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancel success'
        })
      })
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style scoped>
    .user{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-card{
        margin-top: 20px;
        overflow: auto;
    }

    .topBox{
        margin-bottom: 15px;
    }

    .el-pagination{
        margin-top: 15px;
    }
</style>
