<template>
  <div style="height:100%">
    <div class="Myaccount-pag">
      <div class="tittle" style="background:#28b8a1;color:white; position:relative">
        我的身份
             <div size="large" class="switchopen" style="right: 160px;" @click="changestate()">
                 医生
             </div>
             <div size="large" class="switchopen" style="right: 100px;color: #777;"  >
                 患者
             </div>
             <div size="large" class="switchopen" style="right: 7%;" @click="changguan()"> 
                 管理员
             </div>
      </div>
      <div class="content">
        <div class="zhe" style="width:100%;background: rgb(255, 255, 255);height: 100%;position: absolute;z-index: 900;" v-show="isshowmask" @click="clicusers()"></div>
        <div class="header" style="z-index:910;position:relative">
          <div class="userssss"  style="padding-left: 5%; border-bottom:1px solid #ccc;">
            <img :src="headimgurl" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;" >
            <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
              <p><span>患者姓名：</span><span>{{name}}</span></p>
              <p><span>身份证号：</span><span>{{idno}}</span></p>
              <p><span>患者卡号：</span><span>{{cardno}}</span></p>
              <svg :class="'barcodea'"></svg>
            </div>
            <div style="position: absolute;right: 7%;top: 35px;">
              <img src="./../../../common/imager/gengduo.png" alt="" width="40px;" @click="clicusers()">
            </div>
          </div>
          <div class="userss" style="display:none;position:absolute;z-index:100;width:100%;padding-bottom:50px;" v-show="showuserlist">
            <RadioGroup  v-model="index" size="large" style="width:100%;">
              <div class="users" v-for="(item,index) in myCardType"  :key="index" style="border-bottom:1px solid #ccc;padding-left: 5%;background:#fff;" @click="seledoctor(index)">
                <img :src="headimgurl" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;">
                <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;">
                  <p><span>患者姓名：</span><span>{{item.name}}</span></p>
                  <p><span>身份证号：</span><span>{{item.idno}}</span></p>
                  <p><span>患者卡号：</span><span>{{item.cardno}}</span></p>
                <svg :class="'barcode'+ index"></svg>
                </div>
                <Radio :label="index" style="float:right;margin-top:20px;margin-right: 8%;"><span style="display:none;"></span></Radio>
              </div>
            </RadioGroup>
          </div>
        </div>
        <p class="dang"></p>
      </div>
      <div class="content2">
        <p @click="goOrderList">
          <img src="./../../../common/imager/guahao.png" alt width="24">
          <span>我的挂号</span>
        </p>
        <p @click="goConsultingorderList">
          <img src="./../../../common/imager/guahao.png" alt width="24">
          <span>我的视频问诊订单</span>
        </p>
        <p @click="gotuwenList">
          <img src="./../../../common/imager/carder.png" alt width="24">
          <span>我的图文问诊订单</span>
        </p>
        <p @click="goMyCard">
          <img src="./../../../common/imager/carder.png" alt width="24">
          <span>我的就诊卡</span>
        </p>
        <p @click="goMycase">
          <img src="./../../../common/imager/bing.png" alt width="24">
          <span>我的病历</span>
        </p>
         <p @click="goMyprescription">
          <img src="./../../../common/imager/chu.png" alt width="24">
          <span>我的药品</span>
        </p>
        <p @click="goMyincidentals">
          <img src="./../../../common/imager/za.png" alt width="24">
          <span>我的检查</span>
        </p>
        <p @click="goLaboratory">
          <img src="./../../../common/imager/huayan.png" alt width="24">
          <span>我的化验</span>
        </p>
        <p @click="goMycure">
          <img src="./../../../common/imager/zhi.png" alt width="24">
          <span>我的治疗</span>
        </p>
        <p @click="goMyExamine">
          <img src="./../../../common/imager/jian.png" alt width="24">
          <span>我的检查结果</span>
        </p>
        <p @click="goMyassay">
          <img src="./../../../common/imager/hua.png" alt width="24">
          <span>我的化验结果</span>
        </p>
          <!-- <p @click="goPostpartumassessment">
            <svg t="1572313482168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="24" height="24"><path d="M512.32 97.2c22.64 0 41.83 16.91 44.63 39.34 1.87 15.01 14.64 26.28 29.77 26.28h310.56v769.99H127.29V162.82h310.64c15.13 0 27.89-11.27 29.77-26.28 2.8-22.43 21.98-39.34 44.62-39.34m0-30c-38.24 0-69.78 28.63-74.4 65.62H127.29c-16.57 0-30 13.43-30 30v769.99c0 16.57 13.43 30 30 30h769.99c16.57 0 30-13.43 30-30V162.82c0-16.57-13.43-30-30-30H586.72c-4.62-36.99-36.16-65.62-74.4-65.62z" fill="#28b8a1" p-id="4675"></path><path d="M267.76 388.14c-3.98 0-7.79-1.58-10.61-4.39L205.3 331.9c-5.86-5.86-5.86-15.36 0-21.21 5.86-5.86 15.35-5.86 21.21 0l41.24 41.24 72.83-72.83c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.21l-83.44 83.44c-2.8 2.81-6.61 4.39-10.59 4.39zM335.46 629.42c-3.84 0-7.68-1.46-10.61-4.39L218.1 518.28c-5.86-5.86-5.86-15.36 0-21.21 5.86-5.86 15.36-5.86 21.21 0l106.75 106.75c5.86 5.86 5.86 15.36 0 21.21a14.913 14.913 0 0 1-10.6 4.39z" fill="#28b8a1" p-id="4676"></path><path d="M228.71 629.42c-3.84 0-7.68-1.46-10.61-4.39-5.86-5.86-5.86-15.36 0-21.21l106.75-106.75c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.21L239.32 625.03a14.953 14.953 0 0 1-10.61 4.39zM760.35 346.42H444.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h315.61c8.28 0 15 6.72 15 15s-6.71 15-15 15zM760.35 576.05H444.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h315.61c8.28 0 15 6.72 15 15s-6.71 15-15 15z" fill="#28b8a1" p-id="4677"></path><path d="M760.35 794.22H224.74c-8.28 0-15-6.72-15-15s6.72-15 15-15h535.61c8.28 0 15 6.72 15 15s-6.71 15-15 15z" fill="#28b8a1" p-id="4678"></path></svg>
            <span>产后评估</span>
          </p> -->
        <p @click="goMyCollect">
          <img src="./../../../common/imager/guan.png" alt width="24">
          <span>我的关注</span>
        </p>
        <p @click="goMyValuation">
          <img src="./../../../common/imager/icon_ping-95.png" alt width="24">
          <span>我的评价</span>
        </p>
      </div>
      <Modal
            v-model="nonepaymodel"
            title="提示"
            @on-ok="goMyCard()"
            >
            <p>请先激活您的就诊卡</p>
      </Modal>
        <!-- <Modal v-model="statemodel"  @on-ok="changestate" title="提示信息">
            <p>请确认是否切换！</p>
        </Modal> -->
        <Modal v-model="shifou"  title="提示信息">
            <p>抱歉您并不是医生，请勿操作</p>
        </Modal>
    </div>
    <tabbar class="pubtabbar"></tabbar>
     <loading v-show="spinShow" class="loading"></loading>
  </div>
</template>
<script>
import tabbar from "./../../../common/tabbar";
//引入底部公共组件
// import tabbar from "../../common/tabbar";
import JsBarcode from "jsbarcode";
//引人加载动画
import loading from "../../../common/loading";
// import {hidemenu} from "../../../common/js/hide"
import http from '@/utils/http'
export default {
  components: {
    tabbar,
    loading
  },
 async  mounted(){
    if(localStorage.getItem("user")!=null&&JSON.parse(localStorage.getItem("user")).headimgurl!=undefined){
       var headimgurl= JSON.parse(localStorage.getItem("user")).headimgurl;
       this.headimgurl  = headimgurl.substring(1,headimgurl.length-1); 
    }
        var _this= this;
         //调用渲染方法
        var res = await this.loding();
            //返回回来的数据
          if(res.status==1&&res.data.length!==0){
            var maycard=[];
            for(var i =0;i<res.data.length;i++){
              if(res.data[i].stauts==1){
                maycard.push(res.data[i])
              }else if(res.data.length==1&&res.data[0].stauts==0){
                  _this.nonepaymodel=true;
              }
            }
            if(maycard.length<=0){
                _this.nonepaymodel=true;
              }
          _this.myCardType = maycard;
          }else if(res.data.length==0){
             _this.$router.push("/authentication");
          }else{
             _this.myCardType = [];
          }
    if(this.myCardType[0].cardno!=undefined){
        if(this.$store.getters.getusernums==''||this.$store.getters.getusernums==undefined){
          this.cardno= this.myCardType[0].cardno;
          this.idno= this.myCardType[0].idno;
          this.name=this.myCardType[0].name;
          localStorage.setItem('cardno',this.myCardType[0].cardno);
          localStorage.setItem('cardername',this.myCardType[0].name);
          this.index=0;
        }else{
          var index = parseInt(this.$store.getters.getusernums);
          this.index=index;
          this.cardno= this.myCardType[index].cardno;
          this.idno= this.myCardType[index].idno;
          this.name=this.myCardType[index].name;
          localStorage.setItem('cardno',this.myCardType[index].cardno);
          localStorage.setItem('cardername',this.myCardType[index].name);
        }
        // 调用生成条形码的方法
        this.setBarcode();
        this.setBarcodea();
    }else{
      this.$router.push("/authentication");
    }
    
    
  },
 created() {
     
    var that=this;
    // const requesturl=that.$store.getters.getUrl + "SweepCode.do";
    // hidemenu(requesturl);
  },
  data() {
    return {
      //loading动画
      spinShow: false,
      //用户名称
      username: "",
      //用户电话
      phone: "",
      // 用户头像
      headimgurl: "",
      carderList:[],
      //用户就诊卡数据
      myCardType:[{},{},{}],
      // 姓名
      name:'',
      //卡号
      cardno:'',
      //身份证号
      idno:'',
      index:0,
      //控制出现
      showuserlist:false,
      isshowmask:false,//控制遮罩的显示,
      nonepaymodel:false,
      value2: true,
      visitstatus:true,
      statemodel:false,
      shifou:false
    };
  },
  methods: {
    //切换管理员
    changguan(){
      var that  = this;
      var url = 'admin/doctor/loginByIdNo.do'
      // var url ='http://192.168.33.22:8080/admin/doctor/loginByIdNo.do'
      var index = that.index;
      var userName = that.myCardType[index].name;
      // var userName = '曲博';
      var phoneNumber = that.myCardType[index].phone;
      // var phoneNumber = '17732886275';
      var idNo = that.myCardType[index].idno;
      // var idNo = '130824199007063018';
        that.spinShow=true;
        http({
            method:'post',
            url:url,
            data:{
              idNo:idNo
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
          that.spinShow=false;
            if(res.code==200&&res.data.adminLevel<5){
                localStorage.setItem('Administrator',JSON.stringify(res.data));
                that.$router.push('/admin');
            }else{
              that.$Modal.warning({
                  title: '提示警告',
                  content: '抱歉您并不是管理员，请勿操作'
              });
            }
        }).catch(function (err) {
             that.spinShow=false;
        });
    },
    //切换医生身份
    changestate:async function(){
      var that = this;
      that.visitstatus=false;
      var url  = "system/doctorLogin";
      var that = this;
      var data  ={
        
      }
      var res = await http.post(that,url,data);
      if(res.errcode==0){
        alert('成功')
      }else if(res.errcode==3001){
        that.$Modal.warning({
          title: '提示警告',
          content: '抱歉您并不是医生，请勿操作'
        });
      }
      // var index = that.index;
      // var userName = that.myCardType[index].name;
      // // var userName = '曲博';
      // var phoneNumber = that.myCardType[index].phone;
      // // var phoneNumber = '17732886275';
      // var idNo = that.myCardType[index].idno;
      // // var idNo = '130824199007063018';
      // if(that.visitstatus==false){
      //   that.spinShow=true;
      //   http({
      //       method:'post',
      //       url:url,
      //       data:{
      //         userName:'马玲',phoneNumber:'12345678911',idNo:'130824199004080525'
      //       },
      //       headers: {
      //           "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      //       }
      //   }).then(function(res){
      //      that.spinShow=false;
      //      var res = JSON.parse(res);
      //       if(res.status==1){
      //           localStorage.setItem('ysdoccode',res.data[0].user_name);
      //           localStorage.setItem('ysdepcode',res.data[0].dept_code);
      //           localStorage.setItem('ysdepname',res.data[0].dept_name);
      //           localStorage.setItem('ysdocname',res.data[0].name);
      //           localStorage.setItem('adminLevel',res.data[0].adminlevel);
      //           localStorage.setItem('idno',res.data[0].idno);
      //           localStorage.setItem('deptVisible',JSON.stringify(res.data[0].deptVisible));
      //           that.$router.push('/Personalcenter');
      //       }else{
      //         that.$Modal.warning({
      //             title: '提示警告',
      //             content: '抱歉您并不是医生，请勿操作'
      //         });
      //       }
      //   }).catch(function (err) {
      //        that.spinShow=false;
      //   });
        
      // }
    },
    // //弹出层
    // ischangestate(){
    //   this.statemodel=true;
    // },
    //跳转到我的挂号订单页
    goOrderList() {
      this.$router.push("/orderLists");
    },
    //跳到咨询列表
    goConsultingorderList(){
      this.$router.push("/inquiryList");
    },
    gotuwenList(){
      this.$router.push("/tuwenList");
    },
    //跳转到我的就诊卡
    goMyCard() {
      this.$router.push("/myCard");
      // 关闭加载动画
      // this.spinShow = true;
    },
    //跳转到我的关注页面
    goMyCollect() {
      this.$router.push("/myCollect");
      //关闭加载动画
      // this.spinShow = true;
    },
    goMyValuation() {
      this.$router.push("/Myevaluation");
      //关闭加载动画
      // this.spinShow = true;
    },
    //跳转到我的检查页面
    goMyExamine() {
      // this.$Loading.start();
      this.$router.push("/MyExamine");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //跳转到我的病例
    goMycase() {
      // this.$Loading.start();
      this.$router.push("/Mycase");
      //关闭加载动画页面
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //药品处方
    goMyprescription() {
      // this.$Loading.start();
      this.$router.push("/Myprescription");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //我的化验
    goMyassay(){
      //  this.$Loading.start();
      this.$router.push("/Myassay");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //检查处方
    goMyincidentals(){
      //  this.$Loading.start();
      this.$router.push("/Myincidentals");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //化验处方
    goLaboratory(){
      // this.$Loading.start();
      this.$router.push("/Laboratorys");
      //关闭加载动画
      // this.spinShow = true;
      // this.$Loading.finish();
    },
    //治疗处方
    goMycure(){
      this.$router.push("/Mycure");
    },
    //产后评估
    goPostpartumassessment(){
      this.$router.push("/Postpartumassessment");
    },
     //生成条形码集合
    setBarcode() {
      var that = this;
      for (var i = 0; i < that.myCardType.length; i++) {
        JsBarcode(".barcode" + i, that.myCardType[i].cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
      }
    },
    //单个的生成条形码
    setBarcodea(){
       JsBarcode(".barcodea" , this.cardno, {
          height: 30,
          width: 2,
          displayValue: true,
          margin: 0,
          displayValue: false
        });
    },
    //查询患者就诊卡
    async loding() {
      var url ="card/getAllCards.do";
      this.doctorType = [];
      var doctorType = this.doctorType;
      var _this = this;
      var code = this.code;
      var openid = localStorage.getItem("openid");
      // _this.$Loading.start();\
      return new Promise((resolve,reject)=>{
          http({
            method:'post',
            url:url,
            data:{
              openid: openid
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then(function(res){
            resolve(res)
        //   // _this.$Loading.finish();
        //   //返回回来的数据
        //   if(res.status==1&&res.data.length!==0){
        //     var maycard=[];
        //     for(var i =0;i<res.data.length;i++){
        //       if(res.data[i].stauts==1){
        //         maycard.push(res.data[i])
        //       }else if(res.data.length==1&&res.data[0].stauts==0){
        //           _this.nonepaymodel=true;
        //       }
        //     }
        //     if(maycard.length<=0){
        //         _this.nonepaymodel=true;
        //       }
        //   _this.myCardType = maycard;
        //   }else if(res.data.length==0){
        //      _this.$router.push("/authentication");
        //   }else{
        //      _this.myCardType = [];
        //   }
        }).catch(function (err) {
            reject(err)
            // _this.$Modal.warning({
            //   title: "提示信息",
            //   content: "获取信息异常,请重新请求"
            // });
        })
      })
      
    },
      //点击出现
    clicusers(){
      this.showuserlist=!this.showuserlist;
      this.isshowmask=!this.isshowmask;
      // $(".userss").css("display","block");
      // $(".users").css("transition","1s");
      // $(".users").css("height","auto");
      //  $(".zhe").css("display","block");
      // $(".ivu-radio-group").css("height","auto");
    },
    //点击消失
    sevcusers(){
      this.showuserlist=!this.showuserlist;
      alert(this.showuserlist);
      // $(".userss").css("display","none");
      //  $(".zhe").css("display","none");
    },
    //点击选择患者
    seledoctor(index){
      this.isshowmask=false;//隐藏遮罩层
      this.cardno=this.myCardType[index].cardno;
      this.idno=this.myCardType[index].idno;
      this.name=this.myCardType[index].name;
      this.index=index;
      this.$store.commit("setusernums", this.index);
      localStorage.setItem('cardno',this.cardno);
      localStorage.setItem('cardername',this.name);
      // $(".userss").css("display","none");
      this.showuserlist=!this.showuserlist;

      this.setBarcodea();
    },
    //用户个人中心
    userCentre() {}
  }
};
</script>

<style scoped>
.mask{
  height: 100%;
  width:100%;
  background: red;
  z-index: 95;
  position:absolute;
}
.pubtabbar {
  position: fixed;
  bottom: 0;
}
.Myaccount-pag {
  height: 100%;
  overflow: auto;
  padding: 0 0 50px 0;
  
}
.user p{
  line-height: 1.8;
}
.tittle {
  height: 50px;
  /* text-align: center; */
  padding-left: 10%;
  line-height: 50px;
  font-size: 16px;
  font-family: PingFangSC-regular;
}
.headerimage {
  vertical-align: middle;
  border-radius: 50%;
}
.name {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
.right {
  padding-left: 10%;
}
/* .header {
  padding-left: 10%;
} */
.header img,
header span {
  display: inline-block;
  vertical-align: middle;
}
.dang {
  padding-left: 62px;
}
.content {
  margin-top: 10px;
  /* padding-bottom: 10px; */
}
.content2{
    padding-bottom: 50px;
}
.content2 p img {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
}
.content2 p {
  padding: 16px 10% 16px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.footer {
  text-align: center;
}
.ivu-switch .ivu-switch-large{
  color: #f00;
  background: #f00;
}
/* 开关 */
.switchopen{
  height: 25px;
  /* width: 70px; */
  border-radius: 15px;
  /* background: #2d8cf0; */
  line-height: 25px;
  font-size: 4.2vw;
  text-align: left;
  /* padding: 0 10px; */
  position: absolute;
  top: 12px;
  right: 10px;

}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 4.8vw;
  right: 1.06667vw;
}
.api{
  position: relative;
    text-align: center;
}
.activecircle{
  left: 1.06667vw;
}
.activeswitchopen{
  text-align: right;
  /* background: rgb(33, 106, 179); */
} 
.top,.bottom{
        text-align: center;
    }
</style>
