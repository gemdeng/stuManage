<template>
  <el-row :gutter="20" class="bg-purple">
    <el-col :span="4" :offset="2"
      ><div class="grid-content">
        <el-button type="primary" @click="changeScene(3)">添加学生</el-button>
      </div></el-col
    >
    <el-col :span="6" :offset="3">
      <div class="grid-content">学生管理系统</div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Header",
  methods: {
    //切换至添加表单页面，scene， 1为列表页，2为详细列表页，3为添加页面
    changeScene(scene) {
      this.$bus.$emit("changeScene", scene);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 30px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
</style>