---
title: 【JavaScript】【学习心得】学习JavaScript 第七天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript)， 作者：[@paddingme](http://padding.me/about.html) 。 
 &nbsp;原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/11](https://github.com/paddingme/Learning-JavaScript/issues/11)

眼看着七天马上就要结束。这个周末你有没有好好休息，有没有 get 什么新技能呢？
如果没有的话，我们快来抓紧时间学点有用的吧。

在上一章中我们已经学习了如何动态的创建标记，今天我们来学习如何充实文档的内容。

# 充实文档的内容

## 不应该做什么

### 渐进增强（progressive enhancement）
从核心的部分开始，即从内容开始。根据内容实现良好的结构，再逐步增强这些内容。
可以通过 CSS 改进呈现效果，通过 DOM 添加各种行为。核心内容应该在刚开始时
编写文档时就成为文档的组成部分。

### 平稳退化（graceful degradation）
渐进增强的实现必然支持平稳退化。如果你按照渐进增强的原则去充实内容，你为内容添加的样式和行为就自然支持平稳退化，那些缺乏必要的 CSS 和 DOM 支持的访问者可以访问到你的核心内容。

## 把“不可见”变为“可见”
alt 属性原本的作用是：在图片不可用（无法显示）时用一段描述文字来解释这个位置的图片。

## 内容

```html
<h1>What is the Document Object Model</h1>
<p>
    The <abbr title="World Wide Web Consortium">W3C</abbr> defines the <abbr title="Document Object Model">DOM</abbr> as:
</p>
<blockquote cite="http://www.w3.org/DOM">
    <p>
        A platform- and language-neutral interface that will allow programs and scripts to dynamically access and update the content,structure and style of documents.
    </p>
</blockquote>
<p>It is an <abbr title="Application Programming Interface">API</abbr>
that cam be used to navigate <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="eXtensible Markup Language">XML</abbr> documents.
</p>
```

`<abbr>` 标签的含义是“缩略语(abbreviation)”，它是对单词或短语的简写形式的统称。
`<acronym>` 标签的含义是被当成一个单词来读的“首字母缩写词”。为避免混淆，在 HTML5中 `<acronym>` 已被 `<abbr>` 取代。

### HTML?XHTML?HTML5

XHTML 语法更严格，标签字母必须全小写，不可以省略结束标签，所有的标签都必须闭合。

### CSS

```css
    body {
        font-family: "Helvetica","Arial",sans-serif;
        font-size: 10pt;
    }
    abbr {
        text-decoration: none;
        border: 0;
        font-style: normal;
    }
```

### JavaScript

可以用 DOM 改变浏览器的默认行为。

## 显示 “缩略语列表”

```javascript
    function displayAbbreviations() {
        var abbreviations = document.getElementsByTagName("abbr");
        if (abbreviations.length < 1) return false;
        var defs = new Array();
        for (var i=0; i<abbreviations.length; i++) {
            var current_abbr =  abbreviations[i];
            var definition = current_abbr.getAttribute("title");
            var key = current_abbr.lastChild.nodeValue;
            defs[key] = definition;
        }
    }
```

### 创建标记

```html
<dl>
    <dt>Title 1</dt>
    <dd>Description1</dd>
    <dt>Title 2</dt>
    <dd>Description2</dd>
</dl>
```

```javascript
var dlist = document.createElement("dl");

for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
}
```


```javascript
var header = document.createElement("h2");
var headerText = document.createTextNode("Abbreviations");
header.appendChild(headerText);
```


引用 DOM 标签：
+ DOM Core

 ```
 document.getElementsByTagName("body")[0]
 ```

+ HTML-DOM

 ```
 document.body
 ```

```
document.body.appendChild(dlist);
```

`displayAbbreviations` 函数：

```javascript
function displayAbbreviations() {
        var abbreviations = document.getElementsByTagName("abbr");
        if (abbreviations.length < 1) return false;
        var defs = new Array();
        for (var i=0; i<abbreviations.length; i++) {
            var current_abbr =  abbreviations[i];
            var definition = current_abbr.getAttribute("title");
            var key = current_abbr.lastChild.nodeValue;
            defs[key] = definition;
        }
        var dlist = document.createElement("dl");
        for (key in defs) {
            var definition = defs[key];
            var dtitle = document.createElement("dt");
            var dtitle_text = document.createTextNode(key);
            dtitle.appendChild(dtitle_text);
            var ddesc = document.createElement("dd");
            var ddesc_text = document.createTextNode(definition);
            ddesc.appendChild(ddesc_text);
            dlist.appendChild(dtitle);
            dlist.appendChild(ddesc);
        }

        var header = document.createElement("h2");
        var headerText = document.createTextNode("Abbreviations");
        header.appendChild(headerText);
        document.body.appendChild(header);
        document.body.appendChild(dlist);
}
```


### 一个浏览器“地雷”
IE 浏览器直到 IE7 才支持 `abbr`。

```javascript
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        //如果当前元素没有子节点，就立刻开始下一次循环。
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
```

```javascript
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
```


### 显示“文献来源连接表”

如上只能处理让不识别 `abbr` 的低版本 IE 浏览器 不报错，却不显示我们的自定义列表，肿么办呢？  
我们让文献以链接形式显示出来。

```javascript
    function displayCitations() {
        if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;

        //取得所有引用
        var quotes = document.getElementById("blockquote");
        //遍历所有引用
        for (var i=0; i<quotes.length; i++) {
            //如果没有 cite 属性，继续循环
            if(!qutotes[i].getAttribute("cite")) continue;
            //保存 cite  属性
            var url = quotes[i].getAttribute("cite");
            //取得引用中的所有元素节点
            var quoteElements = quotes[i].getElementsByTagName("*");
            //如果没有元素节点，继续循环
            if (quoteElements.length < 1) continue;
            //取得引用中最后一个元素节点
            var elem = quoteElements[quoteElements.length-1];
            //创建标记
            var link = document.createElement("a");
            var link_text = document.createTextNode("source");
            link.appendChild(link_text);
            link.setAttribute("href",url);
            var siperscript = document.createElement("sup");
            siperscript.appendChild(link);
            //把标记添加到引用中的最后一个元素节点
            elem.appendChild(siperscript);
        }
    }
```

## 显示快捷键菜单

access 属性可以把一个元素(如链接)与肩哦按上的某个特定按键关联在一起，一般来说，在适应于 Winodws 的系统的浏览器里，快捷键的用法是在键盘上同时按下 Alt 键和特定按键，在适用于 Mac 系统的浏览器里，快捷键的用法是同时按下 Ctrl 键和特定按键。

> 设置太多的快捷键会适得其反，他们会与浏览器内建的快捷方式发生冲突

一些基本的快捷键都有约定俗成的设置方法，详细的可参考: <http://www.clagnut.com/blog/193/>
- accesskey="1"对应着一个 “返回到本网站主页” 的链接；
- accesskey="2"对应着一个 “后退到前一个页面” 的链接；
- accesskey="4"对应着一个 “打开本网站的搜索表单/页面” 的链接；
- accesskey="9"对应着一个 “本网站联系方法” 的链接；
- accesskey="0"对应着一个 “查看本网站的快捷键清单” 的链接；

```html
<ul id="navigation">
    <li><a href="index.html" accesskey="1">Home</a></li>
    <li><a href="search.html" accesskey="4">Search</a></li>
    <li><a href="contact.html" accesskey="9">Contact</a></li>
</ul>
```

来创建一份快捷键清单

```javascript
    function displayAccesskeys() {
        if (!document.getElementsByTagName || !document.createTextNode || !document.createElement) return false;
        //取得文章当中的所有链接
        var links = document.getElementsByTagName("a");
        //创建一个数组，保存快捷键
        var akeys = new Array();
        //遍历链接
        for (var i=0; i<links.length; i++) {
            var current_link = links[i];
            //如果没有 accesskey 属性，继续循环
            if (!links[i].getAttribute("accesskey")) continue;
            //取得 accesskey 的值
            var key = current_link.getAttribute("accesskey");
            // 取得链接文本
            var text = current_link.lastChild.nodeValue;
            //添加到数组
            akeys[key] = text;
        }

        //创建列表
        var list = document.createElement("ul");
        //遍历快捷键
        for ( key in akeys) {
            var text = akeys[key];
            //创建放到列表中的字符串
            var str = key + ":" +text;
            //创建列表象
            var item = document.createElement("li");
            var item_text = document.createTextNode(str);
            item.appendChild(item_text);
            //把列表创建到列表中
            list.appendChild(item);
        }

        //创建标题
        var header = document.createElement("h1");
        var header_text = document.createTextNode("Acceskeys");
        header.appendChild(header_text);
        //把标题添加到主体上
        document.body.appendChild(header);
        //把列表放到主体上
        document.body.appendChild(list);
    }

    addLoadEvent(displayAccesskeys);
```

在线 DEMO 地址：[codepen](http://codepen.io/paddingme/pen/XJJGjv) or [github](https://github.com/paddingme/Learning-JavaScript/blob/master/Demo/1-8.html)。

好了，今天的学习就到了，明天周一了，请记得定闹钟！