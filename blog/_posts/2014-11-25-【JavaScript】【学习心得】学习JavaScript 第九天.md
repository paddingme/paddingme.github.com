---
title: 【JavaScript】【学习心得】学习JavaScript 第九天
layout: post
tags:
- Mu-Help-Plan
---


 文章取自我的 Github  repos: [Learning-JavaScript](https://github.com/paddingme/Learning-JavaScript)， 作者：[@paddingme](http://padding.me/about.html) 。 
 &nbsp;原文链接：[https://github.com/paddingme/Learning-JavaScript/issues/13](https://github.com/paddingme/Learning-JavaScript/issues/13)

# 用 JavaScript 实现动画效果

## 动画的基础知识

如前文所说，如果我们想随着时间的变化而不断改变某个元素的样式，目前 CSS 尚且无能为力，只能使用 JavaScript。JavaScript 能够按照预定的时间间隔重复调用一个函数，而这意味着我们可以随着世家的推移而不断改变某个某个元素的样式。

动画是样式随时间变化的完美例子之一，简单的说，动画就是让元素的位置随着时间而不断的发生变化。

```html
    <p id="message">Whee!</p>
```

```js
function positionMessage () {
  if (!document.getElementById) return false;
  if (!document.getElementById("message")) return false;
  var elem = document.getElementById("message");
  elem.style.position = "absolute";
  elem.style.left = "50px";
  elem.style.top = "100px";
}

addLoadEvent(positionMessage);
```

加载之后立刻发生变化。

### 时间

```js
    setTimeout("function",interval);// "function" 为函数名，interval 为以毫秒为单位的时间
```

```js
function moveMessage() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.left = "500px";
}

function positionMessage () {
  if (!document.getElementById) return false;
  if (!document.getElementById("message")) return false;
  var elem = document.getElementById("message");
  elem.style.position = "absolute";
  elem.style.left = "250px";
  elem.style.top = "100px";
  movement = setTimeout("moveMessage()",5000);
}

addLoadEvent(positionMessage);
```

取消某个正在排队等待执行的函数：

```js
var variable = setTimeout("function",interval);
clearTimeout(variable);
```

在线 DEMO: http://codepen.io/paddingme/pen/jEPBqg

## 实用的动画

看完实用的动画一节之后，发现这里的其实和我之前学习的 imooc 的视频教程[回到顶部效果](http://www.imooc.com/learn/65) 是一样的。建议大家观看学习，
这里记录下我学这节课的笔记，供大家参考：

在浏览网页时我们会发现很多页面太长，需要通过拖动滚动条才能回到顶部，这个用户体验并不好，所以很多网站会在窗口右下角出现一个回到**回到顶部**的按钮，点击它便会回到顶部。怎么制作回到顶部这个效果呢，可以通过两种方法。

+ 使用**锚连接**，使用`<a href="#"></a>`标签默认返回顶部。这种使用锚链接回到顶部效果:
  - 优点：简单快速，没有任何兼容性问题;
  - 缺点：视觉上不够直观（会突然快速回到页面顶部），用户体验不好。
+ 用JavaScript来实现

我们主要来学习如何使用JavaScript实现。如何实现呢，我们在脑海里演绎这个场景：当我们打开一个页面，鼠标向下滚动到一定程度，会出现“回到顶部”这个按钮，我们点击按钮，页面会由快到慢滚动到顶部，最后停留在顶部。这里涉及到的知识点有：

- DOM操作：
  + `document.getElementById`  根据ID获取标签元素
  + `document.documentElement.scrollTop` 滚动条的数值，可读写
- 事件运用：
  + `window.onload` 页面加载完毕后触发
  + `onclick` 鼠标点击后触发
  + `window.onscroll` 滚动条滚动触发
- 定时器
  + `setInterval()` 设置定时器，需传2个参数
  + `clearInterval()` 关闭定时器，需传一个参数

好了，根据以上知识点，首先在html中增加按钮

```html
<a href="javascript:;" id="btn" title="回到顶部"></a>
```
然后在层叠样式表里添加

```css
#btn {
  width:38px;
  height: 38px;/*按钮大片大小*/
  display: none;
  /*在一个屏幕的可见范围内没必要显示“回到顶部”按钮，所以默认不显示*/
  /*再通过当滚动条滚动超过一个屏幕时再用JavaScript显示按钮*/
  position: fixed;
  left:50%;
  bottom:30px;/*固定定位，相对于屏幕的可见范围位置*/
  background:url(http://paddingme.qiniudn.com/top.png) no-repeat;margin-left: 25%;
  /*按钮背景图片，这里我用的是bootstrap官网的scrolltop图片*/
}
```

好了重点是JavaScript可以这样写：

```javascript
window.onload=function() {
    var obtn=document.getElementById("btn"); //取得标签元素
    var clientHeight=document.documentElement.clientHeight;
    //获得一个屏幕的高度即可视区域高度
    var timer=null;//设置计时器
    var isTop=true;//见最后注释

    window.onscroll=function(){//滚动条滚动时触发
        var osTop=document.documentElement.scrollTop||document.body.scrollTop;
        //获得滚动条到顶部的高度，document.documentElement.scrollTop取得IE高度，
        //document.body.scrollTop取得chrome高度
        if(osTop>=clientHeight){
        //滚动条到顶部的高度大于等于一个屏幕高度时，显示“回到顶部”按钮
            obtn.style.display="block";
        }else{
            obtn.style.display="none";//否则隐藏按钮
        }

        //下面为了实现当回到顶部的时候，用户想要停下来观看页面，
        //滚动滚动条可以停下来中断回到顶部的效果。
        if(!isTop) clearInterval(timer);
        //如果没有到顶部，滚动条滚动，则关闭计时器，见最后注释
            isTop=false; //置未到顶部，见最后注释
    }

    obtn.onclick= function() {
        timer = setInterval(function() {//setInterval，30ms执行一次函数
            var osTop=document.documentElement.scrollTop||document.body.scrollTop;
            //获得滚动条到顶部的高度
            var ispeed=Math.floor(-osTop/5);//速度
            document.documentElement.scrollTop=document.body.scrollTop=osTop+ispeed;
            //越来越小，写滚动条到顶部的高度，实现回到顶部由快到慢的效果。

            isTop=true;//见最后注释

            if(osTop==0)//到达顶部关闭计时器
                clearInterval(timer);
        },30)
    }
}

//如何实现当回到顶部时候，想突然中断呢？首先设置全局变量var isTop=true;
//则obtn.onclick事件中置isTop为true,
//当点击按钮，则滚动条开始想顶部滚动，触发window.onscroll事件，
//这里!istop为false不执行clearInterval(timer);
//但是下面的isTop=false;再将isTop置为false。
//这时候你人为滚动鼠标，则再次触发window.onscroll 事件，
//此时！istop为true 执行clearInterval(timer);则滚动条停下来。

```

看看效果，啧啧啧，用户体验灰常到位，想停就停，不想停则由快到慢回到顶部，让用户有一个适应的心理预期，还可能看到想看的风景停下来驻足欣赏。所以你心动没，赶紧打开[回到顶部效果](http://www.imooc.com/learn/65) 学习一下，涨涨姿势。


今天暂时学习到这里，我还是乖乖的滚去写论文了。
