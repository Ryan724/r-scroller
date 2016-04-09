import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactScroller from '../../src';

export default class Demo extends Component{
	
	constructor(props, context) {
		super(props, context);
		this.state={liArr:this.buildLi()};
	}
	buildLi(){
		let count =100,
			liArr = [];
			while(count--) liArr.push(count);
		return liArr;
	}
	render(){
		let {liArr } = this.state;
		return(
				<div>
					<div className="header">react-scroller</div>
					<div style={this.getParentStyle()}>
			 			<ReactScroller>
			 				<ul scrollable="y">
			               	{ liArr.map((value,index)=>
			               			<li key={index} style={this.getLiStyle()}>{"Pretty row "+index}</li>)
			               	}
			               	</ul>
		                </ReactScroller>
					</div>
				</div>
			 );
	}
	getParentStyle(){
		return {
			height:700,
			overflow:"hidden"
		}
	}
	getLiStyle(){
		return {
			height:40,
			lineHeight:"40px",
			borderBottom:"1px solid #ccc",
			background:"#fafafa",
			paddingLeft:10,
			textAlign:"left"
		}
	}

}