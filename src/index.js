/*
 * ReactScroller
 * http://github.com/Ryan724/react-scroller
 * ReactScroller 对 Scroller 库进行react封装, 
 * 基本配置：
 * 		config:   给Scroller 库的配置项
 * 		｛
 * 			scrollingX ： true  
 * 			scrollingY ： true   //也可以根据chrilden的scrollable属性设置
 * 			animating ： true   //是否滑动停止
 * 			animationDuration ： 250 //滑动到静止过渡时间
 * 			bouncing ： true // 弹性复位
 * 			locking ： true  
 * 			paging ： false   //启用分页
 * 			snapping ： false //启用网格对齐
 * 			zooming ： false  //大小缩放
 * 			minZoom ： 0.5
 * 			maxZoom ： 3
 * 		｝
 * 		snap:{   //考虑当中。。。。。。
 * 			width:
 * 			height:
 * 		} 
 * 		fetachConfig ：  配置获取数据
 * 		｛
 * 			dragLength： 20 //正数向上，负数向下拖拽执行
 * 			activateCallback,  //准备获取数据回调函数
 * 			deactivateCallback, //获取数据结束回调函数
 * 			startCallback,   // 获取数据的回调函数
 * 		｝
 * 		style:{       //本组件在父组件中滚动
 * 			width:
 * 			height:  
 * 		}
 */

import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Scroller from "./Scroller";

class ReactScroller extends Component {

	constructor(props, context) {
		super(props, context);
		// 控制是否调整组件大小
		this.isReflow =false;
		//关闭
		this.isRender = true; 
		this.state = {left: 0, top: 0, zoom: 1 };
		//针对浏览器获取封装样式的函数
		this.buildStyle = this.buildStyleFunc(); 
	}

	componentDidMount() {
		// 初始化scroller
		this.initScoller();
	}
	componentWillReceiveProps(nextProps){
		// 父组件调用的才会执行reflow函数
		this.isReflow = true; 
	}
	shouldComponentUpdate(nextProps,nextState){
		return true;
	}
	componentWillUpdate (){
		// 通知父组件，滑动距离
		if(this.props.callback&&this.isReflow===false) {
			this.props.callback(this.state.left,this.state.top,this.state.zoom);
		}
	}
	componentDidUpdate() {
		if(this.isReflow){
			this.reflow();
			this.isReflow = false; 
		}
	}

	initScoller(){
		let scrollerCallBack = (left, top, zoom) => {
			this.setState({left: left, top: top, zoom: zoom }); 
		}
		this.scroller = new Scroller(scrollerCallBack , this.props.config);
		this.reflow();
		this.bulidfecth();
	}

	bulidfecth() {
		if(!this.props.fetachConfig) return;
		let { activateCallback, deactivateCallback, startCallback, dragLength } = this.props.fetachConfig;
		if(!activateCallback) return;
		let activate = activateCallback||function(){};
		let deactivate= deactivateCallback||function(){};
		let start= ()=>{
			this.scroller.finishPullToRefresh();
			startCallback();
		};
		this.scroller.activatePullToRefresh(dragLength, activate, deactivate, start);
	}

	doTouchStart = (e) => { 
		if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) return;
		this.scroller.doTouchStart(e.touches, e.timeStamp);
	}

	doTouchMove = (e) => {
		this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
	}

	doTouchEnd = (e) => {
		this.scroller.doTouchEnd(e.timeStamp);
	}
	doMouseEvent =(targetFun,e)=>{
		if('ontouchstart' in window) return;
		targetFun === "doTouchEnd"
				?this.scroller[targetFun](e.timeStamp)
				:this.scroller[targetFun]([{pageX: e.pageX, pageY: e.pageY }], e.timeStamp);
	}
	reflow() {
		let content = ReactDOM.findDOMNode(this.refs.reactScroller)
		let container = content.parentNode;
		let rect = container.getBoundingClientRect();
		this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
		this.scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
	};

	render() {
		let style = Object.assign({}, this.props.style)
		return (<div
					ref="reactScroller"
					onMouseDown = {this.doMouseEvent.bind(this,"doTouchStart")}
					onMouseMove = {this.doMouseEvent.bind(this,"doTouchMove")}
					onMouseUp = {this.doMouseEvent.bind(this,"doTouchEnd")}
					onTouchStart = {::this.doTouchStart}
					onTouchMove = {::this.doTouchMove}
					onTouchEnd = {::this.doTouchEnd}
					style = {style}>
					{this.renderChildn()}
		        </div>);
	}
	/**
	 * 对children 进行再次scorll样式包装
	 */
	renderChildn() {
		if(typeof this.props.children === "function"){
			return this.props.children(this.state);
		}
		return React.Children.map(this.props.children,(child)=>{

			let style = this.getCurrentStyle(child.props["scrollable"]);

			style=Object.assign({},{zIndex:child.props["zIndex"]||1,position:"relative"},style)

			return (<div style={style}>{child}</div>);
		});
	}
	getCurrentStyle(scrollable){
		let {left, top, zoom} =this.state;
		if(scrollable==="x") top = 0;
		if(scrollable==="y") left = 0;
		return this.buildStyle(left, top, zoom);
	}
	buildStyleFunc() {
		let docStyle = document.documentElement.style;
		let engine;
		if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
			engine = 'presto';
		} else if ('MozAppearance' in docStyle) {
			engine = 'gecko';
		} else if ('WebkitAppearance' in docStyle) {
			engine = 'webkit';
		} else if (typeof navigator.cpuClass === 'string') {
			engine = 'trident';
		}
		this.vendorPrefix = {
			trident: 'ms',
			gecko: 'Moz',
			webkit: 'Webkit',
			presto: 'O'
		}[engine];
		let helperElem = document.createElement("div");
		let undef;
		let perspectiveProperty = this.vendorPrefix + "Perspective";
		let transformProperty = this.vendorPrefix + "Transform";
		if (helperElem.style[perspectiveProperty] !== undef) {

			return (left, top, zoom ) => {
				let style = {};
				style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
				return style;
			};

		} else if (helperElem.style[transformProperty] !== undef) {

			return (left, top, zoom ) => {
				let style = {};
				style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
				return style;
			};

		} else {

			return (left, top, zoom ) => {
				let style = {};
				style.marginLeft = left ? (-left / zoom) + 'px' : '';
				style.marginTop = top ? (-top / zoom) + 'px' : '';
				style.zoom = zoom || '';
				return style;
			};
		}
	}
}

export default ReactScroller;