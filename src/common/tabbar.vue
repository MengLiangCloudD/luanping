<template>
    <div class="tabbar">
        <div class="tabitem" :class="{active:currentindex==0}" @click="getpath(0)">
            <!-- <Badge :count="num" :offset="[10,25]" :overflow-count="99" v-if="xian">
                <a href="#" class="demo-badge" style="position: absolute;">
                </a>
            </Badge> -->
            <Icon class="tabicon" type="ios-call"/>
            <span class="text" >诊疗</span>
        </div>
        <div class="tabitem" :class="{active:currentindex==1}" @click.stop="getpath(1)">
            <Icon class="tabicon" type="ios-home"/>
            <span class="text">找医生</span>
        </div>
        <div class="tabitem" :class="{active:currentindex==2}" @click.stop="getpath(2)">
            <Icon class="tabicon" type="ios-chatboxes-outline" />
            <span class="text">咨询</span>
        </div>
        <div class="tabitem" :class="{active:currentindex==3}" @click.stop="getpath(3)">
            <Icon class="tabicon" type="ios-person"/>
            <span class="text">我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentindex: 1,
            }
        },
        methods: {
            //判断选中的是哪一个
            getpath(index) {
                if (index == 0) {
                    this.$router.push("/reportss");
                } else if (index == 1) {
                    this.$router.push("/home");
                } else if (index == 2) {
                    this.$router.push("/doctorListHome");
                } else if (index == 3) {
                    this.$router.push("/HomePage");
                }
            },
        },
        created() {
            if(location.hash.indexOf('reportss')!=-1){
                this.currentindex=0
            }
            if(location.hash.indexOf('HomePage')!=-1){
                this.currentindex=3
            }
            if(location.hash.indexOf('home')!=-1){
                this.currentindex=1
            }if(location.hash.indexOf('doctorListHome')!=-1){
                this.currentindex=2
            }
        },
    }
</script>

<style  scoped>
.tabbar {
  width: 100%;
  height: 50px;
  display: flex;
  background:#28b8a1;
  z-index: 1001
}
.tabitem {
  padding-top: 5px;
  color: white;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.text {
  font-size: 14px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.tabicon {
  font-size: 20px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.active {
  color: blue;
}
</style>