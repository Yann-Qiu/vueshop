<template>
    <div class="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >商品管理</el-breadcrumb-item>
            <el-breadcrumb-item >参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
              <el-alert
                title="注意：只允许为第三级分类设置参数"
                type="warning"
                show-icon>
            </el-alert>
            <div class="block" >
                <span class="demonstration">选择商品分类： </span>
                <el-cascader
                    v-model="value"
                    :options="goodsListInfo"
                    :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children:'children'  }"
                    @change="handleCasChange"></el-cascader>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" :disabled="isBtnDisabled" @click="dialogVisible = true">添加参数</el-button>
                    <el-table :data="manyTable" border stripe>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag v-for="item,i in 5" :key="i" closable>{{item}}</el-tag>
                                <el-tag v-for="item,i in scope.row.attr_vals" :key="i" closable>{{item}}</el-tag>
                                <el-input
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                                size='small'
                                class="input-new-tag"
                                >
                                </el-input>
                                <el-button class="input-new-tag" v-else size="small" @click="showInput" type="primary">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            type="index">
                        </el-table-column>
                        <el-table-column
                            prop="attr_name"
                            label="参数名称">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template>
                                <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
                                <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" :disabled="isBtnDisabled" @click="dialogVisible = true">添加属性</el-button>
                    <el-table :data="onlyTable" border stripe>
                        <el-table-column
                            type="index">
                        </el-table-column>
                        <el-table-column
                            prop="attr_name"
                            label="属性名称">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template>
                                <el-button type="primary" size="mini" icon="el-icon-edit" >编辑</el-button>
                                <el-button type="danger" size="mini" icon="el-icon-delete" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog
        :title="'添加'+DialogText"
        :visible.sync="dialogVisible"
        @close="onCancel"
        width="50%">
            <el-form ref="formRef" :model="form" label-width="80px">
                <el-form-item :label="DialogText" prop="param">
                    <el-input v-model="form.param"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即添加</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

export default {
  data () {
    return {
      value: [],
      options: [],
      goodsListInfo: [],
      activeName: 'many',
      manyTable: [],
      onlyTable: [],
      dialogVisible: false,
      inputVisible: false,
      inputValue: '',
      form: {
        param: ''
      }
    }
  },
  components: {

  },
  computed: {
    isBtnDisabled () {
      return this.value.length === 0
    },
    currentId () {
      if (this.value.length === 3) {
        return this.value[2]
      }
      return null
    },
    DialogText () {
      if (this.activeName === 'many') { return '动态参数' } else { return '静态属性' }
    }
  },
  methods: {
    async getGoodsList () {
      this.loading = true
      const { data } = await this.$http.get('/categories', { params: this.queryInfo })
      if (data.meta.status === 200) {
        this.goodsListInfo = data.data
        this.loading = false
      } else {
        this.$message.error('get role list fail')
      }
    },
    handleCasChange () {
      if (this.value.length !== 3) {
        this.value = []
        this.$message.error('只允许为第三级分类设置参数')
      } else {
        this.getParams()
      }
    },
    handleClick () {
      this.getParams()
    },
    async getParams (tab, event) {
      this.loading = true
      const { data } = await this.$http.get(`/categories/${this.currentId}/attributes`, { params: { sel: this.activeName } })
      console.log(data.data)
      if (this.activeName === 'many') {
        this.manyTable = data.data
      } else {
        this.onlyTable = data.data
      }
    },
    async onSubmit () {
      console.log({ attr_name: this.form.input, attr_sel: this.activeName })
      const { data } = await this.$http.post(`/categories/${this.currentId}/attributes`, { attr_name: this.form.param, attr_sel: this.activeName })
      console.log(data)
      if (data.meta.status === 201) {
        this.getParams()
        this.$message.success('add params success')
      }
      this.$refs.formRef.resetFields()
      this.dialogVisible = false
    },
    onCancel () {
      this.$refs.formRef.resetFields()
      this.dialogVisible = false
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      console.log(this)
    },
    handleInputConfirm () {
      this.inputVisible = false
      console.log(this)
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

    .el-alert{
        margin-bottom: 15px;
    }

    .el-table{
        margin-top: 15px;
    }

    .el-tag{
        margin-left: 10px;
    }

    .input-new-tag {
        width: 150px;
        margin-left: 10px;
    }

</style>
