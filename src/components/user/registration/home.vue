<template>
  <div class="home-wrapper">
    <div class="home-page">
      
      <div class="tittle" @click="tia()">滦平县妇幼保健院挂号平台</div>
      <div class="hospital-info">
        <img class="logo-img" src="./../../../common/imager/logo.jpg" width="50" height="50" alt>
        <p class="h-name">滦平县妇幼保健院</p>
        <!-- <p class="other-info">每天中午12点开放第二天的号源</p> -->
        <p class="other-info qr-code">
          扫二维码即时挂号
          <img src="./../../../common/imager/saoma.png" alt width="40" style="position: absolute;right: 8.33333vw;top: 7.33333vw;"> 
        </p>
        <p class="other-info">地址：滦平镇居安里56号</p>
      </div>
      <div class="doctor-list">
        <div class="tab-list">
          <div
            class="tab-item"
            @click="selectItem(index)"
            :class="{activeItem:currentIndex==index}"
            v-for="(item,index) in doctorType"
            :key="index"
          >{{item.depname}}</div>
        </div>
        <div class="doctors" v-if="singleDoctorList.length!==0&&singleDoctorList!=='undefine'">
          <div
            class="doctor-item"
            v-for="(item,index) in singleDoctorList"
            :key="index"
            @click="toAppointment(item)"
          >
            <!-- <p class="line"></p> -->
            <img class="avatar" src="./../../../common/imager/avatar.png" width="50" height="50" alt>
            <div class="doctor-info">
              <p>{{item.docname}}</p>
            </div>
          </div>
        </div>
        <div class="doctors" v-if="singleDoctorList.length==0||singleDoctorList=='undefine'">
          <div class="doctor-info">
            <p>暂无号源</p>
          </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="errormodal"
        title="提示">
        <p>{{infomsg}}</p>
    </Modal>
    <tabbar class="pubtabbar"></tabbar>
    <!-- <loading v-show="isshowloading" class="loading"></loading> -->
  </div>
</template>

<script>
import tabbar from "@/common/tabbar";
// import {initwxshare} from "../common/js/share"
import http from '@/utils/http'
export default {
//   name:"homePage",
  components: {
    tabbar,
  },
  data() {
    return {
      infomsg:"",
      errormodal:false,
      currentIndex: 0, //当前索引值，用来控制当前选中科室的样式
      departmentsinfo: {}, //处理过得请求返回的所有数据，包含各科室和所有的医生
      doctorType: [], //所有科室名称的列表
      singleDoctorList: [], //对应整合之后科室的医生列表
      //扫一扫参数
      appId: "",
      timestamp: "",
      nonceStr: "",
      signature: "",
      //控制loading组件显示
      isshowloading: false,
      //控制扫一扫显示
      isscan: false,
      key1:"",
      value1:"", 
      key2:"",
      value2:""
    };
  },
  created(){
  },
  mounted() {
   this.getDepartments();
    this.qingq();
  },
  methods: {
    qingq(){
       if(localStorage.getItem('cardno')==undefined||localStorage.getItem('cardno')==''){
        var url = "card/getAllCards.do";
        var _this = this;
        //取得openid
        var openid = localStorage.getItem("openid");
        http({
            method:'post',
            url:url,
            data:{
               openid:openid
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
            //判断已有几张卡
            if(res.data.length>0){
               localStorage.setItem('cardno',res.data[0].cardno);
              localStorage.setItem('cardername',res.data[0].name);
              _this.$store.commit('setCardCode',res.data[0].cardno);
            }
        }).catch(function (err) {
            //关闭加载动画
            _this.spinShow = false;
            //关闭加载动画
            _this.$Modal.error({
              title: "提示信息",
              content: "请求失败!"
            });
        });
      }
    },
    //-----------------------------------------------------------------------------------------------------//
    //跳转到预约页面  跳转页面时确定 医生的名字和编号并保存到vuex仓库
    toAppointment(item) {
      //跳转到对应医生的预约页面
      this.$router.push(
        `/appointment?depCode=${item.deptcode}&depname=${item.deptname}&docName=${
          item.docname
        }&docCode=${item.doccode}`
      );
    },
    //科室切换
    selectItem(index) {
      if(this.currentIndex==index){
        return
      }
      this.searchdoctors(index);
      this.currentIndex = index;
    },
    //查询一个科室的医生
    searchdoctors(key) {
      let _this = this;
      var url = 'depart/DepartDoctors.do'
      var depcode =[];
      if(_this.doctorType[key].depname=="妇科门诊"){
        depcode.push('100101')
      }else if(_this.doctorType[key].depname=="产科门诊"){
        depcode.push('100102')
      }else if(_this.doctorType[key].depname=="儿科门诊"){
        depcode.push('100103')
      }else{
         depcode.push(_this.doctorType[key].depCode);
      }
      var depcodes=''
      var dep='';
      for(var i = 0;i<depcode.length;i++){
        dep+=depcode[i] + ',';
      }
      depcodes = dep.substring(0, dep.lastIndexOf(','));
      // var depcode = JSON.stringify(depcode);
      http({
            method:'post',
            url:url,
            data:{
               depCode:depcodes
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
            // that.orderList=[]
            // if(res.errcode==0){
                //清空当前显示的医生列表
                _this.singleDoctorList = [];
                    var arr =res.data;
                    for(var i=0;i<arr.length;i++){
                        if(arr[i]!=""){
                        var arr1 = JSON.parse(arr[i])
                        for(var j=0;j<arr1.length;j++){
                            _this.singleDoctorList.push(arr1[j])
                        }
                        }
                    }
            // // }else{
            //     that.orderList=[]
            // }
        }).catch(function (err) {
        });  
      return _this.singleDoctorList;
    },
    //处理获取医生的数据 此方法只在页面加载时触发一次
    _dealdata(data) {
      // debugger
      // var data = JSON.parse(data)
      var _this = this;
      //获取合并之后科室的名称存入数组
      //["depmentname":"产科门诊"]
      _this.doctorType = [];
      _this.doctorType.push({ depname: "妇科门诊", gynaecology:data.gynaecology});
      _this.doctorType.push({ depname: "产科门诊", obstetrics:data.obstetrics});
      _this.doctorType.push({ depname: "儿科门诊", pediatrics:data.pediatrics});
      for (let j = 0; j < data.other.length; j++) {
        if (data.other[j].depname == "皮肤科") {
          _this.doctorType.push({depname: "皮肤科",depCode:data.other[j].depCode});
        }
      }
      //其他没合并的科室
      for (let i = 0; i < data.other.length; i++) {
        let depname = "";
        let depCode = ''
        depname = data.other[i].depname;
        depCode=data.other[i].depCode;
        if (depname != "皮肤科") {
          let depitem = {
            //合并科室的名称
            depname: depname,
            depCode:depCode
          };
          _this.doctorType.push(depitem);
        }
      }
      //获取合并之后某个科室的医生（先默认设置为第一个科室）
      //通过doctortype的键值name来查询对应的科室医生
      _this.searchdoctors(0);
    },
    //获取合并后的科室信息
    getDepartments:async function() {
      var url ="depart/GetRegDeptList.do";
      var _this = this;
     await http({
            method:'post',
            url:url,
            data:{},
            headers: {
              // 'token':'',
              "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
            // if(res.errcode==0){
                _this._dealdata(res.data);
            // }
        }).catch(function (err) {
        });
    },
  },
//   分享的
  activated(){
    let url1 = location.href;
      //后台接口
      var url = "SweepCode.do";
      var _this = this;
      http({
            method:'post',
            url:url,
            data:{
                url: url1 
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
            if(res.errcode==0){
                _this.appId = res.appId; // 必填,公众号的唯一标识
                _this.timestamp = res.timestamp; // 必填,生成签名的时间戳
                _this.nonceStr = res.nonceStr; // 必填,生成签名的随机串
                _this.signature = res.signature; // 必填,签名
                wx.config({
                    debug: false,
                    appId: _this.appId, // 必填,公众号的唯一标识
                    timestamp: _this.timestamp, // 必填,生成签名的时间戳
                    nonceStr: _this.nonceStr, // 必填,生成签名的随机串
                    signature: _this.signature, // 必填,签名
                    jsApiList: [
                    "onMenuShareAppMessage",
                    "hideAllNonBaseMenuItem",
                    "onMenuShareTimeline",
                    "scanQRCode",
                    "chooseImage",
                    'startRecord',
                    'stopRecord',
                    'uploadVoice',
                    'downloadVoice',
                    'playVoice',
                    'translateVoice',
                    "hideMenuItems"
                    ] // 必填,需要使用的JS接口列表
                });
            }
        }).catch(function (err) {
        });
      let baseimgurl=this.$store.getters.getUrl
      wx.ready(function() {
        wx.hideMenuItems({// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
              menuList: ["menuItem:setFont"]
          });
          wx.onMenuShareAppMessage({ 
              title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
              desc: "滦平县妇幼保健院挂号缴费平台", // 分享描述
              link: url1, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
              success:function(res) { 
              }
          });
          wx.onMenuShareTimeline({
                title: '滦平县妇幼保健院挂号缴费平台', // 分享标题
                link: url1, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: baseimgurl+'static/img/logo.18b2d33.jpg', // 分享图标
                success: function () {
                // 用户点击了分享后执行的回调函数
                },
          });

          /* 处理失败验证 */
          wx.error(function(res) {
            // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
            // _this.$Message.error("配置验证失败: " + res.errMsg);
          });
      })
  }
};
</script>

<style scoped>
.loading {
  z-index: 100;
}
.home-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.imgwrapper {
  display: inline-block;
}
.home-page {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}
.tittle {
  background:#28b8a1;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: PingFangSC-regular;
  position: relative;
}
/* 个人中心按钮 */
.personicon {
  position: absolute;
  top: 5px;
  right: 20px;
  border-radius: 50%;
}
.hospital-info {
  position: relative;
      padding-left: 27.33333vw;
}
.h-name {
  color: rgba(16, 16, 16, 1);
  font-size: 20px;
  text-align: left;
  font-family: PingFangSC-regular;
  margin: 10px 0;
}
.other-info {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-regular;
  margin: 5px 0;
}
.qr-code {
  line-height: 2;
}
.qr-code img {
  vertical-align: middle;
  margin-left: 20px;
}
.logo-img {
  position: absolute;
  left: 8.33333vw;
  top: 20px;
}
.doctor-list {
  flex: 1;
  overflow: auto;
  position: relative;
  background: rgb(234, 234, 234);
  padding-top: 10px;
}
.tab-list {
  position: absolute;
  top: 10px;
  left: 0;
  width: 150px;
  height: 97.4%;
  background: rgb(204, 204, 204);
  overflow: auto;
}
.tab-item {
  /* height: 50px; */
  text-align: center;
  line-height: 50px;
}
.activeItem {
  background: rgb(255, 255, 255);
}
.doctors {
  padding-left: 150px;
  overflow: auto;
  height: 100%;
  background: rgb(255, 255, 255);
}
.doctor-item {
  position: relative;
  display: flex;
  background: rgb(255, 255, 255);
  padding: 20px;
  border-top: 1px solid #ccc;
}
.avatar {
  border-radius: 50%;
}
.doctor-info {
  font-size: 20px;
  margin-left: 10px;
}
.doctor-info p {
  margin: 10px 0;
}
.line {
  border-bottom: 1px solid rgb(187, 187, 187);
  position: absolute;
  width: 150px;
  bottom: 1px;
  left: 30px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>