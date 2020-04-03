import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "indexPage",
      redirect: "/home",
    },
    //首页
    {
      path: "/home",
      name: "homePage",
      component: resolve=>(require(["@/components/user/registration/home"],resolve)),
    },

    /**=========================================================== 患者个人中心 ============================================== */
    {
      path: "/HomePage",
      name: "HomePage",
      component: resolve=>(require(["@/components/user/usereContre/HomePage"],resolve)),
    },
    {
      path: "/HelloWorld",
      name: "HelloWorld",
      component: resolve=>(require(["@/components/HelloWorld"],resolve)),
    },
  ]
})
