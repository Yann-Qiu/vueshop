<template>
    <div class="login">
        <login-box></login-box>
    </div>
</template>

<script>

import LoginBox from '../components/LoginBox.vue'
export default {
  components: {
    LoginBox
  }
}
</script>

<style scoped>
    .login{
        width: 100%;
        background-color: #2b4b6b;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
