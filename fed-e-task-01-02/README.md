# Part 2 ·模块二 ES 新特性与 TypeScript、JS 性能优化

## 简答题

### 一、请说出下列最终的执行结果,并解释为什么。

```javascript
var a = [];
for(var i = 0;i < 10; i++) {
    a[i] = function() {
        console.log(i)
    }
}
a[6]()
```
答：10
### 二、请说出下列最终的执行结果,并解释为什么。

```javascript
var tmp = 123;
if(true) {
    console.log(tmp)
    let tmp
}
```

### 三、结合 ES6 新语法，用最简单的方式找出数组中的最小值。

```javascript
var arr = [12, 34, 32, 89, 4]
```

### 四、请详细说明var,let,const三种声明变量方式之间的具体差别。

### 五、请说出下列代码最终输出的结果，并解释为什么。

```javascript
var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn()
```

### 六、简述 Symbol 类型的用途。

### 七、说说什么是浅拷贝，什么是深拷贝。

### 八、请简述 TypeScript 与 JavaScript 之间的关系。

### 九、请谈谈你所认为的 TypeScipt 优缺点。

### 十、描述引用计数的工作原理和优缺点。

### 十一、描述标记整理算法的工作流程。

### 十二、描述V8中新生代存储区垃圾回收的流程。

### 十三、描述增量标记算法在何时使用及工作原理。

