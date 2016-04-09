react-scroller
============
react-scroller 是对[zynga/scroller]的封装；


 ###  基本配置：
```javascript

  		config:   //给Scroller 库的配置项
  		｛
  			scrollingX ： true  
  			scrollingY ： true   //也可以根据chrilden的scrollable属性设置
 			animating ： true   //是否滑动停止
  			animationDuration ： 250 //滑动到静止过渡时间
  			bouncing ： true // 弹性复位
  			locking ： true  
  			paging ： false   //启用分页
  			snapping ： false //启用网格对其
  			zooming ： false  //大小缩放
  			minZoom ： 0.5
  			maxZoom ： 3
  		｝
  		snap:{   //考虑当中。。。。。。
  			width:
  			height:
  		} 
  		fetachConfig ：  //配置获取数据
  		｛
  			dragLength： 20 //正数向上，负数向下拖拽执行
  			activateCallback,  //准备获取数据回调函数
  			deactivateCallback, //获取数据结束回调函数
  			startCallback,   // 获取数据的回调函数
  		｝
  		style:{       //本组件在父组件中滚动
  			width:
  			height:  
  		}
```

### demo

    [demo0-simple-scroller](http://ryan724.github.io/project/react-scroller/build/demo0-simple-scroller)
    ![demo0-simple-scroller](https://raw.githubusercontent.com/Ryan724/Ryan-blog/master/image/simple-scroller.gif)

[zynga/scroller]:http://github.com/zynga/scroller