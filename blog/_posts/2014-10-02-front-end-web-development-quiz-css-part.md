---
title: web前端开发测验之css部分
layout: post
tags:
- 前端笔试题
- css
---

### 这是<http://davidshariff.com/quiz/>给出的web前端开发测试题。

1. Q: CSS 属性是否区分大小写？

    ```
    ul {
        MaRGin: 10px;
    }
    ```

    A: 不区分。

    HTML，CSS都对大小写不敏感，但为了更好的可读性和团队协作一般都小写，而在XHTML 中元素名称和属性是必须小写的。

2. Q: 行内(inline)元素 设置`margin-top`和`margin-bottom` 是否起作用？

    A: 不起作用。(答案是起作用，个人觉得不对。)

    html 里的元素分为替换元素（replaced element）和非替换元素（non-replaced element）。
      - 替换元素是指用作为其他内容占位符的一个元素。最典型的就是`img`，它只是指向一个图像文件。以及大多数表单元素也是替换，例如`input`等。
      - 非替换元素是指内容包含在文档中的元素。例如，如果一个段落的文本内容都放在该元素本身之内，则这个段落就是一个非替换元素。

    讨论`margin-top`和`margin-bottom`对行内元素是否起作用，则要对行内替换元素和行内非替换元素分别讨论。

    首先我们应该明确外边距可以应用到行内元素，规范中是允许的，不过由于在向一个行内非替换元素应用外边距，对行高(line-height)没有任何影响。由于外边距实际上是透明的。所以对声明`margin-top`和`margin-bottom`没有任何视觉效果。其原因就在于行内非替换元素的外边距不会改变一个元素的行高。而对于行内非替换元素的左右边距则不是这样，是有影响的。

    而为替换元素设置的外边距会影响行高，可能会使行高增加或减少，这取决于上下外边距的值。行内替换元素的左右边距与非替换元素的左右边距的作用一样。来看看demo:

    <http://codepen.io/paddingme/pen/JwCDF>

3. Q: 对内联元素设置`padding-top`和`padding-bottom`是否会增加它的高度？（原题是Does setting padding-top and padding-bottom on an inline element add to its dimensions?）

    A: 答案是不会。同上题比较纠结，不太明白这里的 dimensions指的是到底是什么意思？放置一边，咱们来分析下。对于行内元素，设置左右内边距，左右内边距将是可见的。而设置上下内边距，设置背景颜色后可以看见内边距区域有增加，对于行内非替换元素，不会影响其行高，不会撑开父元素。而对于替换元素，则撑开了父元素。看下demo，更好的理解下：

    <http://codepen.io/paddingme/pen/CnFpa>

4. Q: 设置`p`的`font-size:10rem`，当用户重置或拖曳浏览器窗口时，文本大小是否会也随着变化？

    A: 不会。

    `rem`是以'html'根元素中`font-size`的大小为基准的相对度量单位，文本的大小不会随着窗口的大小改变而改变。

5. Q: 伪类选择器`:checked`将作用与`input`类型为`radio`或者`checkbox`,不会作用于`option`。

    A: 不对。

    伪类选择器`checked`的定义很明显:

    > The :checked CSS pseudo-class selector represents any radio (`<input type="radio">`), checkbox (`<input type="checkbox">`) or option (`<option>`in a `<select>`) element that is checked or toggled to an on state. The user can change this state by clicking on the element, or selecting a different value, in which case the :checked pseudo-class no longer applies to this element, but will to the relevant one.

6. Q: 在HTML文本中，伪类`:root`总是指向`html`元素？

    A: 不是（答案中给出了是 ==||）。以下摘自知乎[:root 与 html 在 CSS3 中指的是同一个元素吗？](http://www.zhihu.com/question/20312140)的答案：

    单指创建的根。这个根可能不是 html ，如果是片段html，没有创建根，则为片段的根。把这下面 URL 打到支持 data URL 的瀏覽器看看（Firefox, Chrome, Safari, Opera），可见一斑：
    ```
    data:application/xhtml+xml,<div xmlns="http://www.w3.org/1999/xhtml"><style>:root { background: green; } html { background: red !important; }</style></div>
    ```
7. Q:'translate()'方法能移动一个元素在z轴上的位置？

    A: 不能。`translate()`方法只能改变x轴，y轴上的位移。


8. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    ul {color:red;}
    li {color:blue;}
    ```
    A: blue。

9. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    ul {color:red;}
    #must-buy {color:blue;}
    ```
    A: blue。

10. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    .shopping-list .favorite {
        color: red;
    }
    #must-buy {
        color: blue;
    }
    ```
    A: blue。

11. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    ul#awesome {
        color: red;
    }
    ul.shopping-list li.favorite span {
        color: blue;
    }
    ```
    A: blue。

12. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    ul#awesome #must-buy {
        color: red;
    }
    .favorite span {
        color: blue!important;
    }
    ```
    A: blue。

13. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    ul.shopping-list li .highlight {
        color: red;
    }
    ul.shopping-list li .highlight:nth-of-type(odd) {
        color: blue;
    }
    ```
    A: blue。

14. Q: 如下代码中文本“Sausage”的颜色是?

    ```
    <ul class="shopping-list" id="awesome">
        <li><span>Milk</span></li>
        <li class="favorite" id="must-buy"><span class="highlight">Sausage</span></li>
    </ul>
    ```
    ```
    #awesome .favorite:not(#awesome) .highlight {
        color: red;
    }
    #awesome .highlight:nth-of-type(1):nth-last-of-type(1) {
        color: blue;
    }
    ```
    A: blue。

15. Q:`#example`位置如何变化：

    ```
    <p id="example">Hello</p>
    ```
    ```
    #example {margin-bottom: -5px;}
    ```
    A: 向上移动5px。

16. Q: `#example`位置如何变化：

    ```
    <p id="example">Hello</p>
    ```
    ```
    #example {margin-left: -5px;}
    ```
    A: 想做移动5px。

17. `#i-am-useless` 会被浏览器加载吗？

    ```
    <div id="test1">
        <span id="test2"></span>
    </div>
    ```
    ```
    #i-am-useless {background-image: url('mypic.jpg');}
    ```
    A: 不会

18. `mypic.jpg` 会被浏览器加载吗？

    ```
    <div id="test1">
        <span id="test2"></span>
    </div>
    ```
    ```
    #test2 {
        background-image: url('mypic.jpg');
        display: none;
    }
    ```
    A: 会被下载。

19. `mypic.jpg` 会被浏览器加载吗？

    ```
    <div id="test1">
        <span id="test2"></span>
    </div>
    ```
    ```
    #test1 {
        display: none;
    }
    #test2 {
        background-image: url('mypic.jpg');
        visibility: hidden;
    }
    ```
    A: 不会被下载。


20. Q: `only` 选择器的作用是？

    ```
    @media only screen and (max-width: 1024px) {argin: 0;}
    ```
    A：停止旧版本浏览器解析选择器的其余部分。

    only用来定某种特定的媒体类型，可以用来排除不支持媒体查询的浏览器。其实only很多时候是用来对那些不支持Media Query但却支持Media Type的设备隐藏样式表的。其主要有：支持媒体特性（Media Queries）的设备，正常调用样式，此时就当only不存在；对于不支持媒体特性(Media Queries)但又支持媒体类型(Media Type)的设备，这样就会不读了样式，因为其先读only而不是screen；另外不支持Media Qqueries的浏览器，不论是否支持only，样式都不会被采用。

21. Q:`overfloa:hidden` 是否形成新的块级格式化上下文？

    ```
    <div>
        <p>I am floated</p>
        <p>So am I</p>
    </div>
    ```
    ```
    div {overflow: hidden;}
    p {float: left;}
    ```
    A：会形成。

    会触发BFC的条件有：

    - float的值不为none。
    - overflow的值不为visible。
    - display的值为table-cell, table-caption, inline-block中的任何一个。
    - position的值不为relative和static。

22. Q: 'screen'关键词是指设备物理屏幕的大小还是指浏览器的视窗？

    ```
    @media only screen and (max-width: 1024px) {margin: 0;}
    ```
    A: 浏览器视窗