// {goodslist: [{id: 1, count:2}, {....}]}

// 读取本地存储中的数据
// 本地存储，存储的是字符串，所以要转换成对象
export function getData() {
  return JSON.parse( localStorage.getItem('goodslist') || '[]');
}

export function setData(json) {
  // 获取数据
  let data = getData();
  // 设置数据
  // 判断之前的数据中是否有json.id

  let hasData = false;  // 假设 没有json.id
  data.forEach(item => {
    if (item.id == json.id) {
      hasData = true;
      // 如果有， 累加
      item.count += json.count;
    } 
  });
  // 如果没有，添加push
  if (!hasData) {
    data.push(json);
  }

  localStorage.setItem('goodslist', JSON.stringify(data));
}

// 根据id删除本地存储中存储的商品
export function deleteData(id) {
  let data = getData();
  // 根据id找到对应数据的索引   findIndex是es6中新增的数组方法
  let index = data.findIndex((item) => {
    // 如果条件满足的话，返回该条数据的索引
    return item.id == id;
  })

  // 最终 删除数组中的一个元素，
  // data.splice(index, count)
  data.splice(index, 1);
  localStorage.setItem('goodslist', JSON.stringify(data));
}

// 点击购物车的加减的时候，更新本地存储
export function update(json) {
  // {id: 1, num: -1}
  let data = getData();

  data.forEach((item) => {
    if (item.id == json.id) {
      item.count += json.num;
    }
  })

  localStorage.setItem('goodslist', JSON.stringify(data));
}