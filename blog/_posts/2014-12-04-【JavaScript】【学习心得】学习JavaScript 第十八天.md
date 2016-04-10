---
title: 【JavaScript】【学习心得】学习JavaScript 第十八天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript), 作者：[@paddingme](http://padding.me/about.html) 。
原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/22](https://github.com/paddingme/Learning-JavaScript/issues/22)

# 面向对象的程序设计

ECMA-262 把对象定义为

>无序属性的集合，其属性可以包含基本值、对象或者函数。

即对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。正因为这样，我们可以把 ECMAScript 的对象想象成散列表：无非就是一组明值对。其中值可以是数据或函数。

## 理解对象

### 属性类型
ECMAScript 第 5 版 在定义只有内部采用的特性（attribute）时, 描述了属性（property）的各种特征。ECMAScript 定义这些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为表示特性是内部直，改规范他们放在了两对儿括号中，例如 [[Enuermerable]]。

ECMAScript 中只有两种属性：数据属性和访问器属性。

1. 数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有描述其行为的特性4个：

 - [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
 - [[Enumberable]]: 表示能否通过 for-in 循环返回属性。
 - [[Writable]]: 表示能否修改属性的值。
 - [[value]]:包含这个属性的火速据知。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。

 要修改属性默认的特性，必须用 ECMAScript 5 的 `Object.defineProperty()` 方法。这个方法接受三个参数: 属性所在的对象，属性名，和一个描述符对象。其中，描述符（descriptor）对象的属性必须是：configurable、enumerable、writable 和 value。

 ```js
 var person = {};
 Object.defineProperty(person,"name",{
  writable: false,
  value: "Nicholas",
  configurable: false
});


 alert(person.name);//"Nicholas"
 person.name = "PaddingMe";
 alert(person.name);//"Nicholas"
 delete person.name;
 alert(person.name);//"Nicholas"
 ```

 一旦把属性定义为不可配置特性就不能再把它变为可配置。

 在调用 `Object.defineProperty()` 方法时，如果不指定， configurable, enumerable 和 writable 特性的默认值为 false。

2. 访问器属性  
 访问器属性不包含数据值，他们包含一对 getter 和 setter 函数（不过不是必须的），在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值。在写入访问器属性时，会调用 setter 函数并传入新值，此函数负责决定如何处理数据。访问器也有4个特性：

 - [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
 - [[Enumberable]]: 表示能否通过 for-in 循环返回属性。
 - [[get]]: 在读取属性时调用的函数。默认值为 undefined。
 - [[set]]: 在写入属性时调用的函数。默认值为 undefined。

 访问器不能直接定义，必须使用 `object.defineProperty()` 来定义。

 ```js
 var book = {
    _year: 2004,
    edition: 1
 };

 Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },
    set: function() {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue -2004;
        }
    }
});

book.year = 2005;
alert(book.edition); //2
 ```

__year 前面的下划线用于表示只能通过对象方法访问的属性。book.edition 变为 2 这是使用访问器属性的常见方式。即设置一个属性的值会导致其他属性发生变化。


### 定义多个属性
`Object.definePorperties()` 接受两个对象参数：第一个要添加或修改其属性的对象，第二个对象的属性 与第一个对象中要添加或修改的属性一一对应。

### 读取属性的特性

`Object.getOwnPropertyDescriptor()` 方法获取给定属性的描述符。
此方法接受2个参数：属性所在的对象和要读取其描述符的属性名称。
返回值是一个对象。

```js
var book = {};
Object.defineProperties(book,{
    _year: {value: 2004},
    edition: {value: 1},
    year: {
        get: function() {
            return this._year;
            },
        set: function() {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue -2004;
            }
        }
    }
});


var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.value); //2004
alert(descriptor.configurable);//false
alert(typeof descriptor.get); // "undefined"

var descriptor = Object.getOwnPropertyDescriptor(book,"year");
alert(descriptor.value); //undefined
alert(descriptor.enumerable);//false
alert(typeof descriptor.get); //function

```
