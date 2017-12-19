<template>
  <div class="number">
    <div @click="add" class="left">+</div><div class="middle">{{ count }}</div><div class="right" @click="sub">-</div>
  </div>
</template>

<script>
export default {
  // stock 商品总数， num 购买数量
  props: ['stock', 'num', 'id'],
  data() {
    return {
      count: 1,
      type: ''
    }
  },
  created() {
    this.count = this.num ? this.num : 1;
  },
  methods: {
    add() {
      if (this.count >= this.stock) {
        return;
      }
      this.count++;
      // 记录加
      this.type = 'add';

      this.notify();
    },
    sub() {
      if (this.count === 1) {
        return;
      }
      this.count--;
      // 记录减
      this.type = 'sub';

      // 通知/触发事件
      this.notify();
    },
    notify() {
      // count变化触发事件
      // 第一个参数 是自定义事件的名称
      // 第二个参数之后，都是给订阅的人传递参数
      // this.$emit('numberchange', this.count);


      // 当在shopcar组件中点击 + - 的时候，要更新本地存储
      this.$emit('numberchange', {id: this.id, count: this.count, type: this.type})

    }
  }
}

</script>

<style scoped>
.number {
  display: inline-block;
  text-align: center;
}

.number .left,
.number .middle,
.number .right {
  display: inline-block;
  width: 30px;
  height: 25px;
  border: 1px solid rgba(92, 92, 92, 0.5);
}

.number .middle {
  width: 40px;
  border-right: 0px;
  border-left: 0px;
}

</style>
