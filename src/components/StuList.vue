<template>
  <div>
    <el-table :data="this.$store.state.stu">
      <el-table-column label="序号" min-width="10%">
        <template scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" min-width="10%">
      </el-table-column>
      <el-table-column label="年龄" prop="age" min-width="10%">
      </el-table-column>
      <el-table-column label="学院" prop="college" min-width="10%">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="time"
        min-width="20%"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" min-width="20%">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { initDB } from "@/utils/default.js";
import { openDB, cursorGetData, deleteDB } from "@/utils/DB.js";
export default {
  name: "StuList",
  data() {
    return {};
  },
  mounted() {
    //打开数据库，将初始的数据添加到数据库中
    initDB();
    //渲染列表
    this.init();
  },
  beforeDestory() {
    this.$bus.$off("getrow");
  },

  methods: {
    //读取数据库数据，渲染到页面中
    async init() {
      let dbList = await openDB("stulist", 1).then((db) => {
        return cursorGetData(db, "studentsMessage");
      });
      this.$store.state.stu = dbList;
    },
    //删除指定行
    async handleDelete(index, row) {
      let dbList = await openDB("stulist", 1).then((db) => {
        deleteDB(db, "studentsMessage", row.uuid);
      });
      this.$store.state.stu = dbList;
      //删除完数据后更新页面
      this.init();
    },
    //修改指定行
    handleEdit(index, row) {
      this.$bus.$emit("getrow", row);
      this.$store.state.row = row;
      this.$bus.$emit("changeScene", 3);
    },
  },
};
</script>

<style>
</style>