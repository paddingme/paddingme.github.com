---
title: 【JavaScript】【学习心得】学习JavaScript 第五天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript)， 作者：[@paddingme](http://padding.me/about.html) 。
  原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/9](https://github.com/paddingme/Learning-JavaScript/issues/9)



经过昨天的学习，我们掌握了 JavaScript 的一些最佳实践，还记得之前我们所作的
那个简单的 JavaScript 图片库吗，DEMO 地址请戳[这里](http://codepen.io/paddingme/pen/qCuDo),什么？ DEMO 都懒的戳，好吧我给贴出来吧。

```html
    <ul>
        <li><a href="images/codercat.jpg"  title="This is codercat.jpg." onclick="showPic(this);return false;">codercat</a></li>
        <li><a href="images/inspectocat.jpg" title="This is inspectocat.jpg." onclick="showPic(this);return false;">inspectocat</a></li>
        <li><a href="images/maxtocat.gif" title="This is maxtocat.gif." onclick="showPic(this);return false;">maxtocat</a></li>
        <li><a href="images/yaktocat.png" title="This is yaktocat.png." onclick="showPic(this);return false;">yaktocat</a></li>
        <li><a href="images/octobiwan.jpg" title="This isoctobiwan.jpg." onclick="showPic(this);return false;">octobiwan</a></li>
    </ul>

    <img id="placeholder"  src="images/codercat.jpg" alt="">

    <p id="decription">请选择一张图片</p>
```


```javascript
   function showPic(whichpic){
        var source = whichpic.getAttribute('href');
        var placeholder = document.getElementById('placeholder');
        placeholder.setAttribute('src',source);
        var text = whichpic.getAttribute('title');
        var decription = document.getElementById('decription');
        decription.firstChild.nodeValue = text;
    }
```

下面我们来根据昨天学的最佳实践考虑以下问题：

## 它支持平稳退化吗？
如果用户浏览器不支持 JavaScript 会怎么样？

## 它的 JavaScript 与 HTML 标记是否分离？

**如果你想用 JavaScript 给某个网页添加一些行为，就不应该让  JavaScript 代码对这个网页的结构有任何依赖。**

不符合， `a` 标签嵌入了大量的 click 事件, HTML 应该改写为：

```html
    <ul id="image-gallery">
        <li>
            <a href="images/codercat.jpg"  title="This is codercat.jpg.">codercat</a>
        </li>
        <li>
            <a href="images/inspectocat.jpg" title="This is inspectocat.jpg.">inspectocat</a>
        </li>
        <li>
            <a href="images/maxtocat.gif" title="This is maxtocat.gif."maxtocat</a>
        </li>
        <li>
            <a href="images/yaktocat.png" title="This is yaktocat.png.">yaktocat</a>
        </li>
        <li>
            <a href="images/octobiwan.jpg" title="This isoctobiwan.jpg.">octobiwan</a>
        </li>
    </ul>

    <img id="placeholder"  src="images/codercat.jpg" alt="">

    <p id="decription">请选择一张图片</p>
```

JavaScript 则改写为：

```javascript
    function prepareGallery() {
        if(!document.getElementsByTagName) return false;
        if(!document.getElementById) return false;
        if(!document.getElementsById("image-gallery")) return false;
        var gallery = document.getElementsById("image-gallery");
        var links = gallery.getElementsByTagName("a");
        for(var i = 0;i < links.length;i++) {
            links[i].onclick = function() {
                showPic(this);
                return false;
            }
        }
    }
```

## 共享 onload 事件

```javascript
    window.onload = firstFunction;
    window.onload = secondFunction;
```

这里只会执行 `secondFunction`。如果想要在网页加载完毕同时执行这两个函数可以写：

```javascript
    window.onload = function(){
        firstFunction();
        secondFunction();
    }
```

还有一种 方法 `addLoadEvent`:
- 把现有的 window.onload 事件处理函数的值存入变量 oldonload；
- 若在这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它；
- 若在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾。

```javascript
    function addLoadEvent(func){
        var oldonload = window.onload;
        if(typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            }
        }
    }
```

```javascript
    addLoadEvent(firstFunction);
    addLoadEvent(secondFunction);
```


对于图片库，咱们可以使用 `addLoadEvent(prepareGallery)`。

## 不要做太多的假设

```javascript
    function prepareGallery() {
        if(!document.getElementsByTagName) return false;
        if(!document.getElementById) return false;
        if(!document.getElementById("image-gallery")) return false;
        var gallery = document.getElementsById("image-gallery");
        var links = gallery.getElementsByTagName("a");
        for(var i = 0;i < links.length;i++) {
            links[i].onclick = function() {
                return !showPic(this);
            }
        }
    }
```


```javascript
   function showPic(whichpic) {
        if(!document.getElementById('placeholder')) return false;
        var placeholder = document.getElementById('placeholder');
        var source = whichpic.getAttribute('href');
        placeholder.setAttribute('src',source);
        if(document.getElementById('decription')){
            var text = whichpic.getAttribute('title');
            var decription = document.getElementById('decription');
            decription.firstChild.nodeValue = text;
        }
        return true;
    }
```


## 优化
```javascript
   function showPic(whichpic) {
        if(!document.getElementById('placeholder')) return false;
        var source = whichpic.getAttribute('href');
        var placeholder = document.getElementById('placeholder');
        if(placeholder.nodeName != "IMG") return false; //nodeName 属性总返回大写字母的值
        placeholder.setAttribute('src',source);
        if(document.getElementById('decription')){
            var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : "";
            var decription = document.getElementById('decription');
            if(decription.firstChild.nodeValue == 3) {
             decription.firstChild.nodeValue= text;
            }
        }
        return true;
    }
```

## 键盘访问

`onkeypress` 事件会在键盘按键被按下并释放一个键时发生。最好不要使用 `onkeypress` 处理函数，因为在几乎所有的浏览器里，用 tab 键移动到某个链接然后按下回车键的动作也会触发 `onclick`事件。

综上，咱们的改进版的 JavaScript 图片库就出来了, 在线 DEMO 地址：http://codepen.io/paddingme/pen/MYYzWZ