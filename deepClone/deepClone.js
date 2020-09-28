// 缺陷：symbol 不能被拷贝到 
const deepCopy1 = (obj) => {
  const result = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        result[key] = deepCopy1(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
const sym = Symbol('name') 
const demo1 = {
  [sym]: 'John',
  name: 'John',
  age: 20,
  drive: () => {},
  girlFriend: undefined,
  friend: ['along', 'xiaoliu']
}
const copy1 = deepCopy1(demo1)
// console.log('THE 1st verson', copy1, copy1.drive === demo1.drive)

// 这个原因是for...in...循环拿不到Symbol属性，如果要拿Symbol属性，我们可以用Object.getOwnPropertySymbols和Reflect.ownKeys。

const deepCopy2 = (obj) => {
  const result = Array.isArray(obj) ? [] : {};
  // 用 Reflect.ownKeys可以获取Symbol属性，用for...of来循环数组
  for(let key of Reflect.ownKeys(obj)) {
    if(obj.hasOwnProperty(key)){
      if(obj[key] && typeof obj[key] === 'object'){
        result[key] = deepCopy2(obj[key])
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
}
const copy2 = deepCopy2(demo1)

// console.log("deepCopy2", copy2, copy2[sym], Reflect.ownKeys(demo1))

// 还有问题： 如果 对象的某个属性是自身的话就会 栈溢出   demo1.xx = demo1

const deepClone = (originObj) => {
  // 只能有一个记录的 map 所以内嵌一个函数  不知道属不属于单例模式
  // 由于Object的键不能是对象，所以我们不能用Object记录，这里采用了WeakMap来记录
  const map = new WeakMap()
  function dc(obj) {
    const result = Array.isArray(obj) ? [] : {};
    const existObj = map.get(obj)
    if (existObj) return existObj
    map.set(obj, result)
    console.log("??", result, map)
    for(let key of Reflect.ownKeys(obj)) {
      console.log('key', key)
      if(obj.hasOwnProperty(key)) {
        if(obj[key] && typeof obj[key] === 'object') {
          console.log('keyyyyyy', key)
          result[key] = dc(obj[key])
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }
  return dc(originObj);
}
demo1.myself = demo1
const copy3 = deepClone(demo1)
console.log('finally', copy3)
