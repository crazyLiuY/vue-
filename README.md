# vueProject

vue项目

## 发表评论

- mint-ui中的Toast弹出提示

```
// cors请求分为两种
// 1 简单的cors请求
  // get/post/head
  
// 2 非简单的cors请求
// post请求  如果content-type 是 application/json 或者 form-data 是非简单的cors请求
// 非简单的cors请求，会先发送一个预检请求，请求类型是options，请求服务器允许的Access-Control-Allow-Headers 有没有content-type

// axios 
// post请求，如果传递的是对象{content: '123'}，此时会自动设置content-type为application/json

// post请求，如果传递的是字符串'content=1123', 此时会自动设置content-type为application/x-www-form-urlencoded
```

## 加载更多



## 代码重构 app.js

- 把过滤器放到 filters.js
- 把路由放到 router.js
- 把插件放到 plugins.js


- 模块化好处

```
模块化解决了不同js文件之间的依赖问题
不同的模块有不同的作用域，解决了变量冲突的问题
把不同功能的代码放到不同的模块中，方便维护
```


## 全局配置加载提示

- 全局配置mintui

```js
//弹出提示
this.$toast('评论成功')

//轮播图
<mt-swipe></mt-swipe>
```

- 设置axios的拦截器

```js
// 在vue的实例的created
created() {
    // 设置axios的拦截器
    // 发送请求之前
    // Add a request interceptor
    this.axios.interceptors.request.use(function (config) {
      // console.log(this);
      // Do something before request is sent
      this.$indicator.open('正在加载...');
      return config;
    }.bind(this), function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.axios.interceptors.response.use(function (response) {
      // Do something with response data
      this.$indicator.close();
      
      return response;
    }.bind(this), function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  }
```

## 封装子组件（轮播图/评论）

- 新建组件
- 把功能代码转移到组件中

## 图片分享

## 图片分享详情

- vue-preview

https://github.com/LS1231/vue-preview

## 非简单cors请求

Content-Type -- url-encoded  发送数据的格式  "key=value&key1=value1"
Content-Type -- application/json 发送数据的格式  "{ key: value, key1: value1 }"

## 全局设置后退按钮

## 全局设置标题

## 商品列表

## 商品列表的上拉更新

http://mint-ui.github.io/docs/#/zh-cn2/loadmore
