<template>
  <el-container>
    <el-header>
      <div>
        <span>金苑超市管理系统</span>
      </div>
      <el-button type="info" style="align-items: right" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu 
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
        >
          <el-menu-item v-if="userStore.role=='admin'" index="/store">
            <el-icon>
              <Files />
            </el-icon>
            <span>超市库存</span>
          </el-menu-item>
          <el-menu-item v-if="userStore.role=='admin'" index="/cashier">
            <el-icon>
              <User />
            </el-icon>
            <span>收银员信息</span>
          </el-menu-item>
          <el-menu-item v-if="userStore.role=='cashier'"  index="/sale">
            <el-icon>
              <Money />
            </el-icon>
            <span>订单结算</span>
          </el-menu-item>
          <el-menu-item v-if="userStore.role=='admin'" index="/product">
            <el-icon>
              <Mug />
            </el-icon>
            <span>商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  Files,
  Mug,
  Money
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue';

const onRoutes = ref('store');

const handleOpen = (key: string, keyPath: string[]) => {
  onRoutes.value = key.replace("/","");
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const userStore = useUserStore()
const logout = () => {
  userStore.logOut();
}
</script>

<style lang="less">


.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #204ae2;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}
</style>