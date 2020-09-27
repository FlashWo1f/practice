// get(target, property, receiver)

// target —— 是目标对象，该对象作为第一个参数传递给 new Proxy，
// property —— 目标属性名,
// receiver —— 如果目标属性是一个 getter 访问器属性，则 receiver 就是本次读取属性所在的 this 对象。
// 通常，这就是 proxy 对象本身（或者，如果我们从代理继承，则是从该代理继承的对象）。现在我们不需要此参数，因此稍后将对其进行详细说明。


let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // 拦截读取属性操作
    if (phrase in target) { //如果字典包含该短语
      return target[phrase]; // 返回译文
    } else {
      // 否则返回未翻译的短语
      return phrase;
    }
  }
});

// 在字典中查找任意短语！
// 最坏的情况也只是它们没有被翻译。
console.log( dictionary['Hello'] ); // Hola
console.log( dictionary['Welcome to Proxy']); // Welcome to Proxy
