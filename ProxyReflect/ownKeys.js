// Object.keys，for..in 循环和大多数其他遍历对象属性的方法都使用 [[OwnPropertyKeys]]内部方法（由 ownKeys 钩子拦截) 来获取属性列表。
const symbolKey = Symbol('parent')
const obj = {
  name: 'Camille',
  age: 15,
  gender: 'famale',
  [symbolKey]: 'libin'
}

console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
console.log('Object.getOwnPropertySymbols', Object.getOwnPropertySymbols(obj))
console.log('Object.getOwnPropertyNames', Object.getOwnPropertyNames(obj))
console.log('Object.keys', Object.keys(obj))

let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" 过滤掉 _password
for(let key in user) console.log(key); // name，然后是 age

// 对这些方法同样有效：
console.log( Object.keys(user) ); // name,age
console.log( Object.values(user) ); // John,30

// 如果我们返回对象中不存在的键，Object.keys 并不会列出该键

let user = { };

user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  }
});

console.log( Object.keys(user) ); // <empty>
// 为什么？原因很简单：Object.keys 仅返回带有 enumerable 标记的属性。
// 为了检查它， 该方法会对每个属性调用 [[GetOwnProperty]] 来获得属性描述符。在这里，由于没有属性，其描述符为空，没有 enumerable 标记，因此它将略过。
// 为了让 Object.keys 返回一个属性，我们要么需要将该属性及 enumerable 标记存入对象，
// 或者我们可以拦截对它的调用 [[GetOwnProperty]] (钩子getOwnPropertyDescriptor 会执行此操作)，并返回描述符enumerable: true。
// ------------------------------------------------------------------------------------------------------ //
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // 一旦被调用，就返回一个属性列表
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // 被每个属性调用
    return {
      enumerable: true,
      configurable: true
      /* 其他属性，类似于 "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c

