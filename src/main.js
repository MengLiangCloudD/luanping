// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { Button,Icon,Modal } from 'iview';
import "iview/dist/styles/iview.css";
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Modal', Modal);
Vue.prototype.$Modal=Modal;
axios.defaults.baseURL = '/api';
Vue.config.productionTip = false

/**========================================================== token授权=================================================== */

var code = '';
var token  = localStorage.getItem('token');
var user_id =localStorage.getItem('user_id');
if(user_id==''||user_id==undefined||token==''||token==undefined){
  getCode();
}
//判断有没有code有没有token去请求token
if(code!=null&&code!==''){
  if(user_id==''||user_id==undefined||token==''||token==undefined){
    gettoken();
  }
}
 //非静默授权，第一次有弹框 获取code
 function getCode () {
  // 获取页面url
  var local = window.location.href
  var appid = 'wxa3223fdf1ee1ebc1'
  // 截取code
  code = getUrlCode().code 
  // 如果没有code，则去请求
  if (code == null || code === '') { 
      var url  = local.split('#')[0];
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
  } else {
        // 你自己的业务逻辑
  }
}
// 截取url中的code方法
function getUrlCode() { 
  var url = location.search
  var theRequest = new Object()
  if (url.indexOf("?") != -1) {
    var str = url.substr(1)
    var strs = str.split("&")
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
    }
  }
  return theRequest
}
// 获取token
function gettoken(){
  var url = "system/userLogin";
  var data ={
      code:code
  };
  axios({
    //这里是你自己的请求方式、url和data参数
    method: 'post',
    url: url,
    data: qs.stringify(data), 
    timeout: 10000,
    //假设后台需要的是表单数据这里你就可以更改
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }).then(function (res) {
    //将token存到vuex
    // that.$store.commit("settoken", res.data.token);
    // that.$store.commit('setuser_id',res.data.user_id);
    alert(res);
    alert(1);
    console.log(res);
    localStorage.setItem('token',res.data.data.token);
    localStorage.setItem('user_id',res.data.data.user_id);
  }).catch(function (err) {
      console.log(err);
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
