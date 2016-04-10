---
title: 【JavaScript】【学习心得】学习JavaScript 第八天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript)， 作者：[@paddingme](http://padding.me/about.html)    
原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/12](https://github.com/paddingme/Learning-JavaScript/issues/12)

已经坚持了一周的学习，学到了不少 DOM 的基础知识，对一些基本概念也有了深入里概念，今天主要学习如何利用 DOM 技术去获取（读）和设置（写）CSS 信息。


## 三位一体的网页
- 结构层（ structural layer） ：由 HTML 或 XHTML 之类的标记语言负责创建。标签（ tag ）,也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述。
- 行为层（ presentation layer）：由 CSS 负责完成。 CSS 描述页面内容应该如何呈现。
- 表现层（ behavior layer）：负责内容应该如何响应事件这一问题，这是 JavaScript 语言 和 DOM 主宰的领域。

===》结构、行为、表现 分离。

## style 属性

文档中的每个元素都是一个对象，每个对象由着各种各样的属性。
- 有一些属性告诉我们元素在节点树上的位置信息，即各节点之间关系信息：`parentNode`,`nextSibling`,`previousSibling`,`childNodes`,`firstChild`,`lastChild` 等;
- 包含元素本身的信息：`nodeType`,`nodeName`;
- style 属性包含着元素的样式。查询这个属性将返回一个对象。样式都存放在这个 style 对象的属性里。

 ```js
  element.style.property
 ```


###  获取样式

```js
    element.style.color;//获取element 的颜色
    element.style.font-family;// xx 应该是：
    element.style.fontFamily;
```

DOM 在表示样式属性时采用的单位并不总是与它们在 CSS 样式表里的设置相同。

```html
<p id="example" style="color:#999999"></p>
<script>
    var example = document.getElementById(example);
    alert(example.style.color);//在某些浏览器里会弹出 rgb(153,153,153)
</script>
```

对于其他单位 em、px，DOM 能正确解析。

```html
<p id="example" style="font:12px 'Apral',sans-serif">我行，我行，我行行行！</p>
<script>
    var example = document.getElementById(example);
    alert(example.style.fontSize);//能正确打印出 12px
</script>
```

**DOM style 属性只能检测内嵌样式,不能用来检测在外部 CSS 文件里声明的样式，在head 头里的样式也是不能检测到**

### 设置样式

style 对象的各个属性都是可读写的。
```js
document.style.property = value;// value 的值必须放在引号内
```

## 何时该用 DOM 脚本设置样式

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <title>Man bites dog</title>
</head>
<body>
    <h1>Hold the front page</h1>
    <p>This first paragraph leads you in.</p>
    <p>Now you get  the nitty-gritty of th story.</p>
    <p>The most improtant information is delivered first.</p>
    <h1>Extra! Extra!</h1>
    <p>Further developements are unfolding.</p>
    <p>You can read all about it here.</p>

    <script src="addLoadEvent.js"></script>
    <script src="1-9.js"></script>
</body>
</html>
```

```js
function styleHeaderSiblings() {
  if (!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName("h1");
  var elem;
  for (var i = headers.length - 1; i >= 0; i--) {
    elem = getNextElement(headers[i].nextSibling);
    elem.style.fontWeight = "bold";
    elem.style.fontSize = "1.2em";
  };
}
function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  } else {
    return getNextElement(node.nextSibling);
  }
  return null;
}
addLoadEvent(styleHeaderSiblings);//请见上篇文章
```

在线 DEMO：http://codepen.io/paddingme/pen/ogXjyB

### 根据某种条件反复设置某种样式

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <title>Cities</title>
    <link rel="stylesheet" href="1-9-2.css">
</head>
<body>
    <table>
        <caption>Itinerary</caption>
        <thead>
            <tr>
                <th>When</th>
                <th>Where</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>June 9th</td>
                <td>Protlan, <abbr title="Oregon">OR</abbr>
                </td>
            </tr>
            <tr>
                <td>June 10th</td>
                <td>Seattle, <abbr title="Washington">WA</abbr></td>
            </tr>
            <tr>
                <td>June 12th</td>
                <td>Sacramento, <abbr title="California">CA</abbr></td>
            </tr>
        </tbody>
    </table>
    <script src="addLoadEvent.js"></script>
    <script src="1-9-2.js"></script>
</body>
</html>
```

```css
body {
    font-family: "Helvatica","Aprial",sans-serif;
    background-color: #fff;
    color: #000;
}

table {
    margin: auto;
    border: 1px solid #699;
}

caption {
    margin:auto;
    padding: .2em;
    font-size: 1.2em;
    font-weight: bold;
}
th {
    font-weight: normal;
    font-style: italic;
    text-align: left;
    border: 1px dotted #699;
    background-color: #9cc;
    color: #000;
}
th,td {
    width: 10em;
    padding: .5em;
}

/*css3 选择器 在低级浏览器无法使用我们用 DOM 来解决它*/

/*tr:nth-child(odd) {
    background-color: #ffc;
}

tr:nth-child(even) {
    background-color: #fff;
}
*/
```

```js
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  var odd, rows;
  for (var i = 0; i < tables.length; i++) {
    odd = false;
    rows = tables[i].getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
        if (odd == true) {
            rows[j].style.backgroundColor = "#ffc";
            odd = false;
        } else {
            odd = true;
        }
    };
  };
}

function displayAbbreviations() {
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    //遍历这些缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        //如果当前元素没有子节点，就立刻开始下一次循环。
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //创建定义列表
    var dlist = document.createElement("dl");
    //遍历定义
    for (key in defs) {
        var definition = defs[key];
        //创建定义标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //对于 dl 没有任何子节点，则立即退出 displayAbbreviations。
    if (dlist.childNodes.length < 1) return false;
    // 创建标题
    var header = document.createElement("h2");
    var headerText = document.createTextNode("Abbreviations");
    header.appendChild(headerText);
    //把标题页添加到页面主体
    document.body.appendChild(header);
    //把定义列表添加到页面主体
    document.body.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);
```
在线 demo:http://codepen.io/paddingme/pen/vEOLyr
### 响应事件

对于
```css
    tr:hover {
        font-weight: bold;
    }
```
部分浏览器不支持（尚未做测试）可以使用 DOM 来做。

```
function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].onmouseover = function() {
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function() {
            this.style.fontWeight = "normal";
        }
    };
}
```

在这一类场合中，需要决定是采用纯粹的 CSS 来解决，还是利用 DOM 来设置样式，需要考虑如下要素：
- 这个问题最简单的解决方式是什么？
- 那种解决方案会得到更多浏览器的支持？

这就要求我们对 CSS 和 DOM 技术有足够深入的了解。

如果你想改变某个元素的呈现效果，请用 CSS；如果你想改变某个元素的行为，使用 DOM，如果你想根据某个元素的行为去改变它的呈现效果，请运用你的智慧。

## className 属性
```js
elem.className = value;// 这里是替换 class 而不是追加 class
```

```js
    function addClass(element,value) {
        if (!element.className) {
            element.className = value;
        } else {
            newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }
    }
```

这样的话现在是通过 CSS 而不是 DOM 去设置样式。 JavaScript 函数现在更新的是 className 属性，根本没碰 style属性。 这确保了网页的表示层和行为层分离得更加彻底。

**对函数进行抽象**

```js
function styleHeaderSiblings(tag.theClass) {
  if (!document.getElementsByTagName) return false;
  var elems = document.getElementsByTagName(tag);
  var elem;
  for (var i = headers.length - 1; i >= 0; i--) {
    elem = getNextElement(elems[i].nextSibling);
    addClass(elem,theClass);
  };
}

```


这一章我们使用 JavaScript 入侵了 CSS 领地。我们这么做的理由无非：

1. CSS 无法让我们找到想要处理的目标元素；
2. CSS寻找目标元素的哦方法还未得到广泛的支持。

虽然未来 CSS 会让我们远离这种“不务正业” 的DOM 脚本编程技术。但有一种应用 CSS 大概永远也无法与 DOM 竞争： JavaScript 脚本能定时重复执行一组操作。

好了 晚安，我还要去写论文TNT。
