const target = {}
const proxy = new Proxy(target, {})
proxy.test = 5
console.log('proxy.test', proxy.test)
console.log('target.test', target.test, target)
// 由于没有钩子，所有对 proxy 的操作都直接转发给 target。
// 写入操作 proxy.test= 会将值写入 target。
// 读取操作 proxy.test 会从 target 返回对应的值。
// 迭代 proxy 会从 target 返回对应的值。

let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 默认值
    }
  }
});

console.log("numbers", numbers[2], numbers[100])
