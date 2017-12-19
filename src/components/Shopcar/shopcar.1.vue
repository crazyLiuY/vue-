<template>
	<div class="mui-content">
		<div v-for="(item, index) in goodslist" :key="item.id" class="row">
			<div class="left">
				<mt-switch v-model="values[index]"></mt-switch>
			</div>
			<div class="center">
				<img width="75" height="75" :src="item.thumb_path" alt="">
			</div>
			<div class="right">
				<h4>
					{{ item.title }}
				</h4>
				<span>￥{{ item.sell_price }}</span>
				<number @numberchange="numberChanged" :num="item.count" :id="item.id"></number>
				<a @click="deleteGoods(item.id)">删除</a>
			</div>
		</div>

		<div class="total">
			<div class="left">
				<h4>总计(不含运费):</h4>
				<span>已经选择商品 {{ getTotalCount }} 件，共计￥{{ totalPrice }}元</span>
			</div>
			<div class="right">
				<button  class="mui-btn mui-btn-danger">去结算</button>
			</div>

		</div>
    {{ values }}
	</div>
</template>

<script>
import { getData, deleteData, update } from '../../config/localstorageHelp';

// 通信用的模块
import vueObj from '../../config/communication';

// 导入number组件
import number from '../Common/number.vue';

//导出组件
export default {
  components: {
    number
  },
  data() {
    return {
      // 绑定mt-switch
      values: [],
      // 购物车中的商品数据
      goodslist: [],
      // 总价钱
      totalPrice: 0
    }
  },
  created() {
    // 获取购物车数据
    this.getdata();
  },
  methods: {
    // 获取购物车数据
    getdata() {
      // 当组件加载完毕
      // 1 获取本地存储中购物车的数据
      var data = getData();

      // 如果没有数据，此时不发送请求
      if (data.length === 0) {
        return;
      }

      // 2 把购物车数据中的id 拼接成 ,分割的形式
      var ids = [];
      data.forEach(item => {
        ids.push(item.id);
        // 初始化 mt-swich 需要绑定的数组
        this.values.push(false);
      });
      // 3 发送请求获取数据
      let url = 'goods/getshopcarlist/' + ids.join(',');
      this.axios
        .get(url)
        .then((res) => {
          if (res.status === 200 && res.data.status === 0) {
            this.goodslist = res.data.message;

            

            // 为了方便把本地存储中存储的商品对象中的count属性  赋给 goodslist数组中的每一个对象
            // 对data数组和goodslist数组排序，保证 索引和id的属性是一致的
            data.sort(function (item1, item2) {
              return item1.id > item2.id;
            });

            this.goodslist.sort(function (item1, item2) {
              return item1.id > item2.id;
            })

            // console.log(data);
            // console.log(this.goodslist);
            // 4 把本地存储中存储的商品对象中的count属性，赋给 goodslist数组中的每一个对象上
            data.forEach((item, index) => {
              this.goodslist[index].count = item.count;
            })
          } else {
            console.log('服务器内部错误');
          }
        })
        .catch((err) => {
          console.error(err);
        })
   

   
   
   
   },
   // 删除商品 参数是要删除商品的id
   deleteGoods(id) {
     // 1 删除本地存储中的数据
     deleteData(id);
     // 2 删除goodslist中对应的数据 ，values中对应的数据
     
     let index = this.goodslist.findIndex((item) => {
       return item.id == id;
     })

     this.goodslist.splice(index, 1);
     this.values.splice(index, 1);


     // 3 tab栏中的badge中的数据要改
     // 触发自定义事件，告知app.vue要更新badge
     vueObj.$emit('update');

   },
   numberChanged(obj) {
     // 点击number组件的时候 + -
     // 1 更新本地存储  商品的id 加1  或者 减1
     let num = obj.type === 'add' ? 1 : -1;
     update({id: obj.id, num: num});

     // 2 更新badge
      // 触发自定义事件，告知app.vue要更新badge
     vueObj.$emit('update');
   }
  },
  computed: {
    getTotalCount() {
      // 
      let count = 0;

      let totalPrice = 0;
      // 找到this.values为true的那些值的索引，根据索引找goodslist中商品的count
      this.values.forEach((item, index) => {
        if (item) {
          count += this.goodslist[index].count;
          totalPrice += this.goodslist[index].count * this.goodslist[index].sell_price;
        }
      })
      this.totalPrice = totalPrice;

      return count;
    }
  }
};

// 点击number组件的时候 + -
// 1 更新本地存储  商品的id 加1  或者 减1
// 2 更新badge
</script>

<style scoped>
.mui-bar-tab ~ .mui-content {
  padding-bottom: 0;
  background-color: #fff;
}
.total {
  display: flex;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: rgba(92, 92, 92, 0.2);
  justify-content: space-between;
  height: 70px;
}

.total h4 {
  font-weight: bold;
  font-family: '微软雅黑';
}

.total span {
  margin-top: 10px;
  font-size: 14px;
}

.total .right {
  margin-top: 8px;
}

.row {
  display: flex;
  border-bottom: 1px solid rgba(1, 1, 1, 0.3);
  padding: 10px 5px;
}

.row .left {
  /*flex: 0, 0, auto;*/
  padding-top: 20px;
}

.row .center {
  /*flex: 0, 0, auto;*/
  margin-left: 5px;
}

.row .right {
  /*flex: 1;*/
  margin-left: 5px;
}

.row .right h4 {
  color: #0094ff;
  font-size: 16px;
  padding: 5px 0px;
}

.row .right .num {
  display: inline-block;
  margin-left: 5px;
}

.row .right span {
  color: red;
  font-size: 20px;
}

.row .right a {
  color: gray;
  font-size: 14px;
  margin-left: 5px;
}
</style>