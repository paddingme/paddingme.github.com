---
title: 【JavaScript】【学习心得】学习JavaScript 第二十二天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript), 作者：[@paddingme](http://padding.me/about.html) 。
原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/24](https://github.com/paddingme/Learning-JavaScript/issues/24)

### 1. 空白
  空白用来间隔字符序列，这个很好理解。另Javascript 采取两种注释方法块注释/\* \*/和行注释//我们使用//，因为/\* \*/中会偶尔遇到正则表达式的注释会导致错误。

### 2. 标识符

标识符有一个字母开头，其后可加一个或多个字母、数字或下划线。不允许使用保留字。

`undefined` , `NaN` 和 `Infinity` 却不是保留字。JavaScript 不允许使用保留字来命名参数或者变量，也不允许在对象字面量中，或者再一个属性存取表达式的点号之后，使用保留字作为对象的属性名。

### 3. 数字

数字类型在内部表示为 64 位的浮点数。如果一个数字字面量有指数构成，则其值为由 e 之前的部分乘以 10 的 e 之后的部分的次方计算出来的值。** NaN 是一个不等于任何值，甚至包括其自身的值**。

### 4. 字符串

字符串字面量可以被包围在双引号或单引号之中，包含 0 个或多个字符。**JavaScript 中的所有字符都为 16 位**。\ 为转移字符，\u 约定允许指定用数字表示的字符码位。如`"A"==="\u0041"`

(这里说下===和==的区别)
 `==`（相等运算法），`===`（严格相等运算符） JavaScript 对象的比较是引用的比较，非值的比较，对象和其本身相等，和其他任何对象不相等。 `===` 首先计算其操作数的值，然后比较，比较过程无任何类型转换。 `==` 如果两个操作数不是同一类型的，则相等运算符进行一些类型转换进行比较。 `==` 这里截取 [JavaScript 相等表格](http://dorey.github.io/JavaScript-Equality-Table)上的的两张图片让大家更为直观的感受下。

<img src="http://paddingme.qiniudn.com/1396461120383-2.png" alt="关于===的相等表格">

<img src="http://paddingme.qiniudn.com/1396464279990-1.png" alt="关于==的相等表格" style="width:625px;">

引用下[温特大大](http://weibo.com/wintercn)的总结就是：**只要记住 `null` 只和`undefined` 相等，有 `number` 都转 `number`，有 `boolean` 也转 `number`，有 `string` 都转 `string`，对象互相不等，`NaN` 互相不等就可以了**。


字符串一旦创建无法改变，通过 `+` 可以连接字符串形成一个新的字符串。`'c' + 'a' + 't' === 'cat'` 就很好理解了,`'c' + 'a' + 't'`连接后创建了一个新的字符串和 `'cat'` 有着完全相同的字符和字符顺序所以严格相等。

### 5. 语句

Javascript 依赖于全局变量进行连接，所有编译单元的所有级别对象都被抛入全局对象的公共命名空间中。当 `var` 语句被用在函数的内部时，他定义了这个函数的私有变量。
`switch`、`while`、`for`、和 `do` ss语句允许一个可选的前置 `label` 配合 `break` 一起使用。
语句的执行顺序：从上到下。Javascript 可用过条件语句（`if`, `switch`），循环语句（`for`, `while`, `do`），**强制跳转语句（`return`, `break`, `throw`）** 和函数调用来改变执行顺序。
**`false`, `null`, `undefined`,空字符串 `''`,数字 `0`,数字 `NaN`都为假，其余皆为真。**
`for` 循环有两种形式，`for(var i=0; i < arr.length,i++){}` 和 `for(i in arr){}`,后者枚举一个对象的所有属性名（或键名），在每次循环中，对象的另一个属性名字付串被复制给 `for` 和 `in` 之间的变量。
`object.hasOwnProperty(variable)`来检测是否为该对象的成员，还是从原型链里找到的。

```javascript
for(myvar in obj){
     if(object.hasOwnProperty(myvar)){
         ...
     }
}
```


Javascript 不允许在 `return` 关键字和表示式之间换行,同样不允许 `break` 关键字和标签之间换行。

### 6. 表达式


最简单的表达式是字面量值（比如字符串或数字）、变量、内置的值（`true`、`false`、`null`、`undefined`、`NaN` 和 `Infinity`）、以 `new` 前导的调用表达式、以 `delete`前导的属性存取表达式、包在圆括号中的表达式、以一个前缀运算符作为前导的表达式，或者表达式后面跟着：

* 一个插入运算符与另一个表达式；
* 三元运算符?后面跟着另一个表达式，然后接一个:，再然后接第 -三个表达式；
* 一个函数调用；
* 一个属性存取表达式。


**函数调用引发函数的执行，函数调用运算符是跟随在函数名后面的一对圆括号。**圆括号中可能包含将会传递给这个函数的参数。一个属性存取表达式用于指定一个对象或数组的属性或元素。


下表按从最高到最低的优先级列出 JavaScript 运算符。具有相同优先级的运算符按从左至右的顺序求值。

运算符|描述
------|------
. [] ()|字段访问、数组下标、函数调用以及表达式分组
++ -- - ~ ! delete new typeof void	|一元运算符、返回数据类型、对象创建、未定义值
* / %	|乘法、除法、取模
+ - +	|加法、减法、字符串连接
<< >> >>>	|移位
< <= > >= instanceof	|小于、小于等于、大于、大于等于、instanceof
== != === !==	|等于、不等于、严格相等、非严格相等
&	|按位与
^	|按位异或
\|	|按位或
&&|	逻辑与
\|\|	|逻辑或
?:     |条件
= oP=	|赋值、运算赋值
,	|多重求值


`type of ` 运算符产生的值有 'number'、'string'、'boolean'、'undefined'、'function' 和 'object'（注意都是小写）**如果运算数是一个数组或者  `null`，那么结果是 `object`,这是不对的额**这里作何解？

### 7. 字面量

对象字面量是一种方便指定新对象的表示法。属性名可是标识符或者字符串。数组字面量是一个方便指定新数组的表示法，函数字面量定义了函数值（后续相继详细介绍）。

