react-scroller
============

react-scroller 是对[zynga/scroller]的封装；

## Install & Run
    
    $ npm install react-scroll
    $ cd react-scroll
    $ npm install
    $ npm start

用浏览器打开`localhost:8080`,即可

## Examples

### demo0 
[demo0-simple-scroller](http://ryan724.github.io/project/react-scroller/build/demo0-simple-scroller)

![demo0-simple-scroller](https://raw.githubusercontent.com/Ryan724/Ryan-blog/master/image/simple-scroller.gif)

## How to use 
  在你的代码当中如下使用
```javascript

var React =require('react');
var ReactScroller  = require('r-scroller'); 

module.exports = React.createClass({
    render:function(){
      return (
             <div style={{"overflow":"hidden"}}>
               <ReactScroller>
                {your components}
               </ReactScroller>
             </div>
            )
  }
});

```

## Options

### config
给Scroller 库的配置项

- `scrollingX` ：`true`  
- `scrollingY` ：`true`   也可以根据chrilden的scrollable属性设置
- `animating` ： `true`   是否滑动停止
- `animationDuration` ： `250`   滑动到静止过渡时间
- `bouncing` ： `true`  弹性复位
- `locking` ： `true`  
- `paging` ： `false`   启用分页
- `snapping` ： `false` 启用网格对其
- `zooming` ： `false` 大小缩放
- `minZoom` ： `0.5`
- `maxZoom` ： `3`

### fetachConfig 

配置获取数据

- `dragLength`：`20` 正数向上，负数向下拖拽执行
- `activateCallback`：`fun` 准备获取数据回调函数
- `deactivateCallback`：`fun` 获取数据结束回调函数
- `startCallback`：`fun` 获取数据的回调函数

### snap

考虑当中。。。。。。



[zynga/scroller]:http://github.com/zynga/scroller