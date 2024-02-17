# 深拷贝
> b 是 a 的一份拷贝，b 中没有对 a 中对象的引用

## 前提
1. 数据类型哪些
2. 数据规模怎么样
3. 性能要求是什么
4. 运行环境是什么
5. 询问其他要求

## 方式

### 一、JSON 序列化反序列化
- 实现
```js
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const a = {
    f: () => {},
    g: undefined,
    name: 'aaa',
    time: new Date(),
    regex: /a/,
}
const b = deepClone(a);
console.log(b);
// {name: "aaa", time: "2020-12-19T16:00:00.000Z", regex: {}}
```
- 缺点
1. 不支持函数，如果反序列化后，函数会被忽略
2. 不支持很多数据类型，不支持 undefined，只支持 null, undefined 会忽略
3. 不支持循环引用，a.self = a 的对象序列化会报错
4. 不支持 Date, 会被序列化成字符串
5. 不支持正则表达式，会被序列化成空对象
> https://www.json.org/json-en.html
> 除了官网规定的都不支持

### 二、递归克隆
1. 基本类型直接拷贝
2. object 分情况
    - 普通 object - for in?
    - 数组 array - Array 初始化
    - 函数 function - 拷贝，闭包
    - 日期 Date - how?

### 三、考点
- 区分类型
- 避免环
- 是否拷贝原型属性 不拷贝
- 爆栈不考虑 不考虑

### 四、缺点
每一个类型都要单独处理，set, buffer,因为他们的构造函数都不一样，如果只需要 new Object(source) 那就没这个题目了。在实际项目中使用第三方库，Lodash.cloneDeep
> https://lodash.com/docs/4.17.15#cloneDeep
