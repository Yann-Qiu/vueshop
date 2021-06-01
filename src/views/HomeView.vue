<template>
    <div>
      <el-button type="info" @click="logout">注销</el-button>
    </div>
</template>

<script>

import { Button } from 'element-ui'
import Vue from 'vue'

Vue.use(Button)
export default {
  components: {

  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
