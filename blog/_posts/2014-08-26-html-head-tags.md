---
title: HTML head 头标签
layout: post
tags:
- css
- html
---

HTML head头部分的标签、元素有很多，涉及到浏览器对网页的渲染，搜索引擎SEO等等，而各个浏览器内核以及各个国内浏览器厂商都有些自己的标签元素。了解每个标签的意义，写出满足自己需求的head标签，十分重要。下面介绍下常用的head头部结构，以及对各个标签、元素的意义以及使用场景一一介绍（本篇以[一丝大神的文章](https://github.com/yisibl/blog/issues/1)为基础，进行扩展总结）。

###[padding.me](http://padding.me)的head头结构
    <!DOCTYPE HTML>
    <html lang="zh-cmn-Hans">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=yes">
        <meta name="keywords" content="PaddingMe,front-end,前端,前端工程师,web开发工程师,HTML,CSS,JavaScript,HTML5,CSS3,git,Github">
        <meta name="description" content="PaddingMe - he is a front-end developer.">
        <meta name="robots" content="index,follow">
        <meta name="author" content="PaddingMe,padding4me@gmail.com">

        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <meta>

        <meta http-equiv="Cache-Control" content="no-siteapp">

        <title>PaddingMe</title>

        <link rel="author" href="https://plus.google.com/u/1/105241873904238310190/?rel=author">
        <link type="text/plain" rel="author" href="http://padding.me/humans.txt" />

        <link rel="stylesheet" href="/css/screen.css">
        <link rel="stylesheet" href="/css/font.css">
        <link rel="stylesheet" href="/css/social.css">
        <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="http://feeds.feedburner.com/paddingme" />
    </head>


###DOCTYPE

DOCTYPE(Document Type)，该声明位于文档中最前面的位置，处于`html`标签之前，此标签告知浏览器文档使用哪种HTML或者XHTML规范。

DTD(Document Type Definition)声明以`<!DOCTYPE>`开始，不区分大小写，前面没有任何内容，如果有其他内容(空格除外)会使浏览器在IE下开启怪异模式(quirks mode)渲染网页。公共DTD，名称格式为“注册//组织//类型 标签//语言”,“注册”指示组织是否由国际标准化组织(ISO)注册，+表示是，-表示不是。“组织”即组织名称，如：W3C；“类型”一般是DTD，“标签”是指定公开文本描述，即对所引用的公开文本的唯一描述性名称，后面可附带版本号。最后“语言”是DTD语言的ISO 639语言标识符，如：EN表示英文，ZH表示中文。XHTML 1.0可声明三种DTD类型。分别表示严格版本，过渡版本，以及基于框架的HTML文档。

- HTML 4.01 strict

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

- HTML 4.01 Transitional

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

- HTML 4.01 Frameset

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

- 而最新HTML5 推出更加简洁的书写，它向前向后兼容，推荐使用。

        <!doctype html>


HTML里的`doctype`有两个主要目的。

- 对文档进行有效性验证。
   它告诉用户代理和校验器这个文档是按照什么DTD写的。这个动作是被动的，每次页面加载时，浏览器并不会下载DTD并检查合法性，只有当手动校验页面时才启用。
- 决定浏览器的呈现模式
    对于实际操作，通知浏览器读取文档时用哪种解析算法。如果没有写，则浏览器则根据自身的规则对代码进行解析，可能会严重影响html排版布局。浏览器有三种方式解析HTML文档。
     * 非怪异（标准）模式
     * 怪异模式
     * 部分怪异（近乎标准）模式
关于IE浏览器的文档模式，浏览器模式，严格模式，怪异模式，DOCTYPE标签，可详细阅读[模式？标准！](http://padding.me/blog/2014/07/04/mode-or-standard/)，以及[盒子模型](http://paddingme/blog/todo)。

###charset
声明文档使用的字符编码，

    <meta charset='utf-8'>


html5之前网页中会这样写：

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

这两个是等效的，具体可移步阅读：<http://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type>，所以建议使用较短的，易于记忆。

###lang属性

简体中文

    <html lang="zh-cmn-Hans"> <!-- 更加标准的 lang 属性写法 <http://zhi.hu/XyIa> -->

繁体中文

    <html lang="zh-cmn-Hant"> <!-- 更加标准的 lang 属性写法 <http://zhi.hu/XyIa> -->

很少情况才需要加地区代码，通常是为了强调不同地区汉语使用差异，例如：

    <pre>
        <code>
        <p lang="zh-cmn-Hans">
        <strong lang="zh-cmn-Hans-CN">菠萝</strong>和<strong lang="zh-cmn-Hant-TW">鳳梨</strong>其实是同一种水果。只是大陆和台湾称谓不同，且新加坡、马来西亚一带的称谓也是不同的，称之为<strong lang="zh-cmn-Hans-SG">黄梨</strong>。
        </p>
        </code>
    </pre>

具体相关请移步<http://zhi.hu/XyIa>

###优先使用 IE 最新版本和 Chrome

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />


### 360 使用Google Chrome Frame

    <meta name="renderer" content="webkit">

360浏览器就会在读取到这个标签后，立即切换对应的极速核。
另外为了保险起见再加入

    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

这样写可以达到的效果是如果安装了Google Chrome Frame，则使用GCF来渲染页面，如果没有安装GCF，则使用最高版本的IE内核进行渲染。
相关链接：[浏览器内核控制Meta标签说明文档](http://se.360.cn/v6/help/meta.html)

###百度禁止转码
通过百度手机打开网页时，百度可能会对你的网页进行转码，脱下你的衣服，往你的身上贴狗皮膏药的广告，为此可在head内添加

    <meta http-equiv="Cache-Control" content="no-siteapp" />

相关链接：[SiteApp转码声明](http://m.baidu.com/pub/help.php?pn=22&ssid=0&from=844b&bd_page_type=1)

###SEO优化部分
- 页面标题`<title>`标签(head头部必须)

        <title>your title</title>

- 页面关键词keywords

        <meta name="keywords" content="your keywords">

- 页面描述内容description

        <meta name="description" content="your description">

- 定义网页作者author

        <meta name="author" content="author,email address">

- 定义网页搜索引擎索引方式,robotterms是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。

        <meta name="robots" content="index,follow">

相关链接：[WEB1038 - <meta name="robots"> 标记包含无效的值](http://msdn.microsoft.com/zh-cn/library/ff724037\(v=expression.40\).aspx)

###viewport
`viewport` 可以让布局在移动浏览器上显示的更好。
通常会写

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

`width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边([http://bigc.at/ios-webapp-viewport-meta.orz](http://bigc.at/ios-webapp-viewport-meta.orz))

content 参数：

 - width viewport 宽度(数值/device-width)
 - height viewport 高度(数值/device-height)
 - initial-scale 初始缩放比例
 - maximum-scale 最大缩放比例
 - minimum-scale 最小缩放比例
 - user-scalable 是否允许用户缩放(yes/no)
 - minimal-ui iOS 7.1 beta 2 中新增属性，可以在页面加载时最小化上下状态栏。这是一个布尔值，可以直接这样写：

        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">

而如果你的网站不是响应式的，请不要使用initial-scale或者禁用缩放。

    <meta name="viewport" content="width=device-width,user-scalable=yes">

相关链接：[非响应式设计的viewport](http://www.qianduan.net/non-responsive-design-viewport.html)

### ios 设备
添加到主屏后的标题（iOS 6 新增）

    <meta name="apple-mobile-web-app-title" content="标题"> <!-- 添加到主屏后的标题（iOS 6 新增） -->

是否启用 WebApp 全屏模式

    <meta name="apple-mobile-web-app-capable" content="yes" /> <!-- 是否启用 WebApp 全屏模式 -->

设置状态栏的背景颜色

    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> <!-- 设置状态栏的背景颜色，只有在 `"apple-mobile-web-app-capable" content="yes"` 时生效 -->

只有在 "apple-mobile-web-app-capable" content="yes" 时生效

content 参数：

- default 默认值。
- black 状态栏背景是黑色。
- black-translucent 状态栏背景是黑色半透明。
如果设置为 default 或 black ,网页内容从状态栏底部开始。
如果设置为 black-translucent ,网页内容充满整个屏幕，顶部会被状态栏遮挡。

禁止数字识自动别为电话号码

    <meta name="format-detection" content="telephone=no" /> <!-- 禁止数字识自动别为电话号码 -->


###iOS 图标

rel 参数：
apple-touch-icon 图片自动处理成圆角和高光等效果。
apple-touch-icon-precomposed 禁止系统自动添加效果，直接显示设计原图。
iPhone 和 iTouch，默认 57x57 像素，必须有

    <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png" /> <!-- iPhone 和 iTouch，默认 57x57 像素，必须有 -->

iPad，72x72 像素，可以没有，但推荐有

    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/apple-touch-icon-72x72-precomposed.png" /> <!-- iPad，72x72 像素，可以没有，但推荐有 -->

Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有

    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png" /> <!-- Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有 -->

Retina iPad，144x144 像素，可以没有，但推荐有

    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png" /> <!-- Retina iPad，144x144 像素，可以没有，但推荐有 -->


###iOS 启动画面

官方文档：<https://developer.apple.com/library/ios/qa/qa1686/_index.html>
参考文章：<http://wxd.ctrip.com/blog/2013/09/ios7-hig-24/>

iPad 的启动画面是不包括状态栏区域的。

iPad 竖屏 768 x 1004（标准分辨率）

    <link rel="apple-touch-startup-image" sizes="768x1004" href="/splash-screen-768x1004.png" /> <!-- iPad 竖屏 768 x 1004（标准分辨率） -->

iPad 竖屏 1536x2008（Retina）

    <link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash-screen-1536x2008.png" /> <!-- iPad 竖屏 1536x2008（Retina） -->

iPad 横屏 1024x748（标准分辨率）

    <link rel="apple-touch-startup-image" sizes="1024x748" href="/Default-Portrait-1024x748.png" /> <!-- iPad 横屏 1024x748（标准分辨率） -->

iPad 横屏 2048x1496（Retina）

    <link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash-screen-2048x1496.png" /> <!-- iPad 横屏 2048x1496（Retina） -->

iPhone 和 iPod touch 的启动画面是包含状态栏区域的。

iPhone/iPod Touch 竖屏 320x480 (标准分辨率)

    <link rel="apple-touch-startup-image" href="/splash-screen-320x480.png" /> <!-- iPhone/iPod Touch 竖屏 320x480 (标准分辨率) -->

iPhone/iPod Touch 竖屏 640x960 (Retina)

    <link rel="apple-touch-startup-image" sizes="640x960" href="/splash-screen-640x960.png" /> <!-- iPhone/iPod Touch 竖屏 640x960 (Retina) -->

iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina)

    <link rel="apple-touch-startup-image" sizes="640x1136" href="/splash-screen-640x1136.png" /> <!-- iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina) -->

添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）

    <meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"> <!-- 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari） -->


### Windows 8
Windows 8 磁贴颜色

    <meta name="msapplication-TileColor" content="#000"/> <!-- Windows 8 磁贴颜色 -->

Windows 8 磁贴图标

    <meta name="msapplication-TileImage" content="icon.png"/> <!-- Windows 8 磁贴图标 -->


### rss订阅

    <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" /> <!-- 添加 RSS 订阅 -->


### favicon icon

    <link rel="shortcut icon" type="image/ico" href="/favicon.ico" /> <!-- 添加 favicon icon -->

比较详细的favicon介绍可参考[https://github.com/audreyr/favicon-cheat-sheet](https://github.com/audreyr/favicon-cheat-sheet)



更多的meta 标签参考

- [COMPLETE LIST OF HTML META TAGS](http://code.lancepollard.com/complete-list-of-html-meta-tags/)
- [18 Meta Tags Every Webpage Should Have in 2013](http://www.iacquire.com/blog/18-meta-tags-every-webpage-should-have-in-2013)





参考文章：

- <https://github.com/yisibl/blog/issues/1>
- <https://gist.github.com/paddingme/6182708733917ae36331>
- <http://amazeui.org/css/>
- <http://www.douban.com/note/170560091/>


