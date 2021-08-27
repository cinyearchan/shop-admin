<template>
  <el-container>
    <el-aside width="200px">
      Aside
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.el-header, .el-footer {
  background-color: #e3c0d1;
  color: #333;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  height: 100vh;
}
</style>
