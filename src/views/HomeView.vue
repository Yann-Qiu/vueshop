<template>
    <el-container>
      <el-header>
        <div class="left">
          <i class="el-icon-platform-eleme logo"></i>
          <div class="title">电商后台管理系统</div>
        </div>
        <el-button type="info" @click="logout">注销</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px':'200px'">
          <el-switch
            v-model="isCollapse"
            :change="switchBtn">
          </el-switch>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath">
            <el-submenu :index="item.id + ''" v-for="item in menu" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/' + child.path" v-for="child in item.children" :key="child.id" @click="saveNavState('/' + child.path)">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{child.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  data () {
    return {
      menu: [],
      isCollapse: false,
      activePath: ''
    }
  },
  components: {

  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data } = await this.$http.get('/menus')
      if (data.meta.status === 200) {
        this.menu = data.data
      }
    },
    switchBtn () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (item) {
      window.sessionStorage.setItem('currentNavItem', item)
      this.activePath = item
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('currentNavItem')
  }
}
</script>

<style scoped>
  .el-container{
    height: 100%;
  }

  .el-header {
    background-color: #333744;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .el-switch{
    display: flex;
    background-color: #333744;
    height: 30px;
    justify-content: center;
    align-items: center;
  }

  .left{
    display: flex;
  }

  .logo{
    font-size: 60px;
    margin-right: 30px;
    color: #fff;
  }

  .title{
    font-size: 20px;
    color: #fff;
    font-weight: bolder;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-menu{
    border-right: 0;
  }

</style>
