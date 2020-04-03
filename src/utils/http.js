'use strict'

import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})
var code = '';
 //非静默授权，第一次有弹框 获取code
 function getCode () {
  // 获取页面url
  var local = window.location.href
  var appid = 'wxa3223fdf1ee1ebc1'
  // 截取code
  code = getUrlCode().code 
  // 如果没有code，则去请求
  if (code == null || code === '') { 
      var url  = local.split('#')[0]
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
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then(function (res) {
    //将token存到vuex
    // that.$store.commit("settoken", res.data.token);
    // that.$store.commit('setuser_id',res.data.user_id);
    localStorage.setItem('token',res.data.data.token);
    localStorage.setItem('user_id',res.data.data.user_id);
  }).catch(function (err) {
      console.log(err);
  });
}
function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 401)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    if(response.data.errcode==1003){
      getCode();
      gettoken();
    }else{
      return response.data;
    }
  }else{
    
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    return res
  }else{
    return res;
  }
  
}

export default {
  post (that,url, data) {
    var token  = localStorage.getItem('token')
    that.isshowloading=true;
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'token':token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        that.isshowloading=false;
        return checkStatus(response)
      }
    ).then(
      (res) => {
        that.isshowloading=false;
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
