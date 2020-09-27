// Reflect 是一个内置对象，可简化的创建 Proxy。
// 对于每个可被 Proxy 捕获的内部方法，Reflect 都有一个对应的方法 Reflect，其名称和参数与 Proxy 钩子相同。

let user = {
  id: 1,
  order: 10
};

Reflect.set(user, 'name', 'John');

console.log(user.name); // John
console.log(Reflect.ownKeys(user))
console.log(Reflect.get(user, 'id'))


let obj = {
  name: "John",
};

obj = new Proxy(obj, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = obj.name; // shows "GET name"
obj.name = "Pete"; // shows "SET name=Pete"

// 就是说，一切都很简单：如果钩子想要将调用转发给对象，则只需使用相同的参数调用 Reflect.<method> 就足够了。

// 且，虽然我们可以用 target[key] = val 来代替 Reflect.set() 
// 但，还是有一些细微的差别 `https://juejin.im/post/6844904090116292616#heading-6`
