import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  // vuex管理的状态，（就是一个对象）
  state: {
    number: 0
  },
  mutations: {
    // 方法，方法可以更新状态
    // mutations中的方法的第一个参数就是state 状态

    // 可以给mutations中的方法传递一个参数，只可以传一个参数
    add: function (state, num) {
      state.number += num;
    }
  }
})
export default store;
