<template>
  <div id="app">
    <Header></Header>
    <StuList v-if="scene == 1"></StuList>
    <DetailList v-if="scene == 2"></DetailList>
    <AddStu v-if="scene == 3"></AddStu>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import StuList from "./components/StuList.vue";
import DetailList from "./components/DetailList.vue";
import AddStu from "./components/AddStu.vue";

export default {
  name: "App",
  mounted() {
    // 绑定自定义事件
    this.$bus.$on("changeScene", (data) => {
      this.scene = data;
      // console.log("我是TestB组件，收到了数据", this.scene);
    });
  },
  data() {
    return {
      scene: 1,
    };
  },
  components: {
    Header,
    StuList,
    DetailList,
    AddStu,
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 1000px;
  margin: 0 auto;
}
</style>
