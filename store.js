
export const store = {

  /* 
  绑定data的属性到globalData的属性
  比如在index.js使用，用that就可以代替this.setData
  import {store} from "../../store.js"
  const app = getApp();
  let that = app.globalData;
  Page({
    data: {
      userInfo:{}
    },
    onLoad() {
      app.global(this,'userInfo');
      that.userInfo.name = 'Sam'
    },
  });
  */
  data:{
    test:'store'
  },
  global(that,prop){

    const app = getApp();

    //监听数据
    function observe(obj){
      let revocable = Proxy.revocable(obj, {
        set:function(target,key,value,receiver){

            let val = Reflect.set(target, key, value, receiver);

            that.setData({
              [prop]: that.data[prop]
            });

            console.log('【'+key+'】')

            return val;
        }
      });

      return revocable.proxy;
    }

    //遍历数据+监听
    function deepProxy(obj) {
      if (typeof obj === 'object') {
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
              let data = obj[key];
              data = JSON.parse(JSON.stringify(data))
              obj[key] = deepProxy(data);
              
          }
        }
      }

      return typeof obj == 'object' ? observe( obj ) :obj;
    }


    let tmpUnloadFn = that.onUnload;

    that.onUnload = function(){
      app.globalData[prop] = JSON.parse(JSON.stringify(app.globalData[prop]) );
      if(typeof tmpUnloadFn == 'function'){
        tmpUnloadFn();
      }
    }

    let tmpShowFn = that.onShow;
    that.onShow = function(){
      that.setData({
        [prop]: app.globalData[prop]
      });
      if(typeof tmpShowFn == 'function'){
        tmpShowFn();
      }
    }


    // app.globalData[prop] = Object.assign({}, that.data[prop]) ;

    app.globalData[prop] = deepProxy(that.data[prop]);
  
    
  }

}
