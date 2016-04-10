---
title: 【JavaScript】【学习心得】学习JavaScript 第六天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript), 作者：[@paddingme](http://padding.me/about.html) 。
原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/10](https://github.com/paddingme/Learning-JavaScript/issues/10)

# 动态创建标记

## 一些传统方法

### `document.write`

为什么不使用 `document.write`?

`document.write` 的最大缺点是它违背了“行为应该与结构分离”的原则。
MIME 类型 application/xhtml+xml 与之不兼容，不会被执行。

### `innerHTML` 属性

支持读取和写入。

## DOM 方法

### `createElement` 方法

```javascript
    document.createElement(nodeName);
```

### `appendChild` 方法

```javascript
    parent.appendChild(child);
```

### `createTextNode` 方法

```javascript
    document.createTextNode(text);
```

### 在已有元素前插入一个新元素

```javascript
    parentElement.insertBefore(newElement,tagetElement);
```

我们不必关心父元素到底是谁，因为 targetElement 的 parentNode 就是。

```javascript
    var gallery = document.getElementById("gallery");
    gallery.parentNode.insertBefore("p",gallery);
```


### 在现有元素后插入一个新元素

```javascript
    function insertAfter(newElement,targetElement){
        var parent = targetElement.parentNode;
        if(parent.lastChild == targetElement){
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    }
```

为了更好做到行为结构表现分离，我们应该去掉在上篇文章我们的代码结构中的
```
<img id="placeholder"  src="images/codercat.jpg" alt="">
<p id="decription">请选择一张图片</p>
```

让我们来动态创建它们。下面是完成的代码，仔细体会实现下。

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="UTF-8">
    <title>1-4 案例研究： JavaScript 图片库</title>
    <style>

        body {
           margin: 1em 10%;
           color: #333;
           background-color: #ccc;
           font-family: "Helvetica","Arial",serif;
        }

        h1 {
            color: #333;
            background-color: rgba(0, 0, 0, 0);
        }

        a {
            color: #c60;
            background-color: rgba(0, 0, 0, 0);
            font-weight: bold;
            text-decoration: none;
        }

        ul {
            padding: 0;
        }

        li {
            float: left;
            padding: 1em;
            list-style-type: none;
        }

        img {
            display: block;
            clear: both;
            width: 424px;
            height: 424px;
            border: 1px solid #ccc;
        }
    </style>

</head>

<body>
    <h1>Snapshots</h1>
    <ul id="image-gallery">
        <li>
            <a href="images/codercat.jpg"  title="This is codercat.jpg.">codercat</a>
        </li>
        <li>
            <a href="images/inspectocat.jpg" title="This is inspectocat.jpg.">inspectocat</a>
        </li>
        <li>
            <a href="images/maxtocat.gif" title="This is maxtocat.gif.">maxtocat</a>
        </li>
        <li>
            <a href="images/yaktocat.png" title="This is yaktocat.png.">yaktocat</a>
        </li>
        <li>
            <a href="images/octobiwan.jpg" title="This isoctobiwan.jpg.">octobiwan</a>
        </li>
    </ul>
<script src="1-7.js"></script>
</body>
```

```javascript
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof oldonload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSlibing);
    }
}

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("image-gallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/codercat.jpg");
    placeholder.setAttribute("alt", "my image gallery");

    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("choose an image");
    description.appendChild(desctext);

    var gallery = document.getElementById("image-gallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,gallery);
}

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("image-gallery")) return false;

    var gallery = document.getElementById("image-gallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    placeholder.setAttribute("src", source);

    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }

    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
```


demo：[codepen](http://codepen.io/paddingme/pen/jEERab)


## AJAX

AJAX 依赖 JavaScript, 故可能有浏览器不支持他，而搜索引擎的蜘蛛程序也不会抓取到有关内容。

AJAX 技术的核心是 XMLHttpRequest 对象。
