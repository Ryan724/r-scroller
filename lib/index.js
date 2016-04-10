/*
 * ReactScroller
 * http://github.com/Ryan724/react-scroller
 * ReactScroller 对 Scroller 库进行react封装, 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Scroller = require("./Scroller");

var _Scroller2 = _interopRequireDefault(_Scroller);

var ReactScroller = (function (_Component) {
	_inherits(ReactScroller, _Component);

	function ReactScroller(props, context) {
		_classCallCheck(this, ReactScroller);

		_get(Object.getPrototypeOf(ReactScroller.prototype), 'constructor', this).call(this, props, context);
		// 控制是否调整组件大小
		this.isReflow = false;
		//关闭
		this.isRender = true;
		this.state = { left: 0, top: 0, zoom: 1 };
		//针对浏览器获取封装样式的函数
		this.buildStyle = this.buildStyleFunc();
	}

	_createClass(ReactScroller, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// 初始化scroller
			this.initScoller();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// 父组件调用的才会执行reflow函数
			this.isReflow = true;
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return true;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			// 通知父组件，滑动距离
			if (this.props.callback && this.isReflow === false) {
				this.props.callback(this.state.left, this.state.top, this.state.zoom);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.isReflow) {
				this.reflow();
				this.isReflow = false;
			}
		}
	}, {
		key: 'initScoller',
		value: function initScoller() {
			var _this = this;

			var scrollerCallBack = function scrollerCallBack(left, top, zoom) {
				_this.setState({ left: left, top: top, zoom: zoom });
			};
			this.scroller = new _Scroller2['default'](scrollerCallBack, this.props.config);
			this.reflow();
			this.bulidfecth();
		}
	}, {
		key: 'bulidfecth',
		value: function bulidfecth() {
			var _this2 = this;

			if (!this.props.fetachConfig) return;
			var _props$fetachConfig = this.props.fetachConfig;
			var activateCallback = _props$fetachConfig.activateCallback;
			var deactivateCallback = _props$fetachConfig.deactivateCallback;
			var startCallback = _props$fetachConfig.startCallback;
			var dragLength = _props$fetachConfig.dragLength;

			if (!activateCallback) return;
			var activate = activateCallback || function () {};
			var deactivate = deactivateCallback || function () {};
			var start = function start() {
				_this2.scroller.finishPullToRefresh();
				startCallback();
			};
			this.scroller.activatePullToRefresh(dragLength, activate, deactivate, start);
		}
	}, {
		key: 'doTouchStart',
		value: function doTouchStart(e) {
			if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) return;
			this.scroller.doTouchStart(e.touches, e.timeStamp);
		}
	}, {
		key: 'doTouchMove',
		value: function doTouchMove(e) {
			this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
		}
	}, {
		key: 'doTouchEnd',
		value: function doTouchEnd(e) {
			this.scroller.doTouchEnd(e.timeStamp);
		}
	}, {
		key: 'doMouseEvent',
		value: function doMouseEvent(targetFun, e) {
			if ('ontouchstart' in window) return;
			targetFun === "doTouchEnd" ? this.scroller[targetFun](e.timeStamp) : this.scroller[targetFun]([{ pageX: e.pageX, pageY: e.pageY }], e.timeStamp);
		}
	}, {
		key: 'reflow',
		value: function reflow() {
			var content = _reactDom2['default'].findDOMNode(this.refs.reactScroller);
			var container = content.parentNode;
			var rect = container.getBoundingClientRect();
			this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
			this.scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
		}
	}, {
		key: 'render',
		value: function render() {
			var style = Object.assign({}, this.props.style);
			return _react2['default'].createElement(
				'div',
				{
					ref: 'reactScroller',
					onMouseDown: this.doMouseEvent.bind(this, "doTouchStart"),
					onMouseMove: this.doMouseEvent.bind(this, "doTouchMove"),
					onMouseUp: this.doMouseEvent.bind(this, "doTouchEnd"),
					onTouchStart: this.doTouchStart.bind(this),
					onTouchMove: this.doTouchMove.bind(this),
					onTouchEnd: this.doTouchEnd.bind(this),
					style: style },
				this.renderChildn()
			);
		}

		/**
   * 对children 进行再次scorll样式包装
   */
	}, {
		key: 'renderChildn',
		value: function renderChildn() {
			var _this3 = this;

			if (typeof this.props.children === "function") {
				return this.props.children(this.state);
			}
			return _react2['default'].Children.map(this.props.children, function (child) {

				var style = _this3.getCurrentStyle(child.props["scrollable"]);

				style = Object.assign({}, { zIndex: child.props["zIndex"] || 1, position: "relative" }, style);

				return _react2['default'].createElement(
					'div',
					{ style: style },
					child
				);
			});
		}
	}, {
		key: 'getCurrentStyle',
		value: function getCurrentStyle(scrollable) {
			var _state = this.state;
			var left = _state.left;
			var top = _state.top;
			var zoom = _state.zoom;

			if (scrollable === "x") top = 0;
			if (scrollable === "y") left = 0;
			return this.buildStyle(left, top, zoom);
		}
	}, {
		key: 'buildStyleFunc',
		value: function buildStyleFunc() {
			var docStyle = document.documentElement.style;
			var engine = undefined;
			if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
				engine = 'presto';
			} else if ('MozAppearance' in docStyle) {
				engine = 'gecko';
			} else if ('WebkitAppearance' in docStyle) {
				engine = 'webkit';
			} else if (typeof navigator.cpuClass === 'string') {
				engine = 'trident';
			}
			this.vendorPrefix = ({
				trident: 'ms',
				gecko: 'Moz',
				webkit: 'Webkit',
				presto: 'O'
			})[engine];
			var helperElem = document.createElement("div");
			var undef = undefined;
			var perspectiveProperty = this.vendorPrefix + "Perspective";
			var transformProperty = this.vendorPrefix + "Transform";
			if (helperElem.style[perspectiveProperty] !== undef) {

				return function (left, top, zoom) {
					var style = {};
					style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')';
					return style;
				};
			} else if (helperElem.style[transformProperty] !== undef) {

				return function (left, top, zoom) {
					var style = {};
					style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')';
					return style;
				};
			} else {

				return function (left, top, zoom) {
					var style = {};
					style.marginLeft = left ? -left / zoom + 'px' : '';
					style.marginTop = top ? -top / zoom + 'px' : '';
					style.zoom = zoom || '';
					return style;
				};
			}
		}
	}]);

	return ReactScroller;
})(_react.Component);

exports['default'] = ReactScroller;
module.exports = exports['default'];