// index.js
// 获取应用实例

import {store} from "../../store.js"
const app = getApp();
let that = app.globalData;


Page({
  data: {
    msg:'【Hello World】',
    userInfo: {
      basic:{
        name:'Tom'
      },
      name:'Tim'
    },
    list:[
      'A','B','C'
    ]
  },
  onLoad() {
    store.global(this,'userInfo');
    store.global(this,'list');
    store.global(this,'msg');
    // that.userInfo.name = 'Sam'
    that.list.push('D')
    that.list.push('E')
    that.userInfo.basic.name = 'Sam'

    console.log(this.data.userInfo)
  },
  add(){
    that.list.push('ADD-ITEM')
  },
  remove(){
    that.list.splice(0,1)
  }
})
