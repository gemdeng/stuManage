<template>
  <el-form
    :model="rowForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="elform"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="rowForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="rowForm.age"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="tel">
      <el-input v-model="rowForm.tel"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="rowForm.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-input v-model="rowForm.college"></el-input>
    </el-form-item>
    <el-form-item label="家庭住址" prop="address">
      <el-input v-model="rowForm.address"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="desc">
      <el-input
        type="textarea"
        v-model="rowForm.desc"
        class="resizeNone"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="changeScene(1)">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { addStu } from "@/utils/addStu.js";
import { openDB, addData, getCurrentTime, updateDB } from "@/utils/DB";
export default {
  data() {
    return {
      rowForm: this.$store.state.row || {
        name: "",
        age: "",
        tel: "",
        gender: "",
        college: "",
        address: "",
        desc: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            min: 2,
            max: 2,
            message: "请输入正确的年龄",
            trigger: "blur",
          },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请勾选性别", trigger: "blur" }],
      },
    };
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.rowForm.uuid) {
            this.updateStu(this.rowForm);
          } else {
            this.addStu(this.rowForm);
          }
          alert("提交信息成功");
        } else {
          console.log("提交信息失败");
          return false;
        }
      });
    }, //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }, //返回列表页，scene = 1
    changeScene(scene) {
      this.$store.state.row = null;
      this.$bus.$emit("changeScene", scene);
    },
    //添加数据到数据库
    addStu(data) {
      (data.uuid = Math.ceil(Math.random() * 10000)),
        (data.time = getCurrentTime()),
        openDB("stulist", 1).then((db) => {
          addData(db, "studentsMessage", data);
        });
    },
    //更新数据到数据库
    updateStu(data) {
      (data.time = getCurrentTime()),
        openDB("stulist", 1).then((db) => {
          updateDB(db, "studentsMessage", data);
        });
    },
  },
};
</script>

<style scoped>
.elform {
  position: relative;
  left: 50%;
  transform: translateX(-60%);
  width: 400px;
  margin: 0, auto;
}
</style>