import React, { Component } from "react";
import classNames from "classnames";
import BassinPoint from './BassinPoint.js';

class Bassin extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isHovering : false
		};

		this.handleMouseHover = this.handleMouseHover.bind(this);
	}

	handleMouseHover() {
		this.setState(this.toggleHoverState);
	}

	toggleHoverState(state) {
		return {
			isHovering: !state.isHovering,
		};
	}

	render() {
		return (
			<div
				className={classNames('bassin ' + this.props.id.toLowerCase())}
				onMouseEnter={this.handleMouseHover}
				onMouseLeave={this.handleMouseHover}
				>
				<h2>{this.props.name}</h2>
				<div className='measure-list'>
					<BassinPoint pointId={this.props.id.toLowerCase() + 'Point1'} pointUrl={this.props.pointUrl1} isHovering={this.state.isHovering}/>
					<BassinPoint pointId={this.props.id.toLowerCase() + 'Point2'} pointUrl={this.props.pointUrl2} isHovering={this.state.isHovering}/>
					<BassinPoint pointId={this.props.id.toLowerCase() + 'Point3'} pointUrl={this.props.pointUrl3} isHovering={this.state.isHovering}/>
					<BassinPoint pointId={this.props.id.toLowerCase() + 'Point4'} pointUrl={this.props.pointUrl4} isHovering={this.state.isHovering}/>
					<BassinPoint pointId={this.props.id.toLowerCase() + 'Point5'} pointUrl={this.props.pointUrl5} isHovering={this.state.isHovering}/>
				</div>
			</div>
		);
	}
}

export default Bassin;