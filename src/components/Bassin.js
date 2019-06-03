import React, { Component } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from "classnames";

class Bassin extends Component {
// TODO
// Enlever unité du state et la mettre dans le render comme le widget
// ID et name avec les propsname et virer le name du state
	constructor(props) {
		super(props);
		
		const bassinName = props.name;
		const localStorageState = window.localStorage.getItem(bassinName);
		
		if (localStorageState) {
			this.state = JSON.parse(localStorageState);
			this.state.isHovering = false;
		} else {
			this.state = {
				isHovering: false,
				measureList: [{
					id: bassinName+"-temperature",
					name: 'Température',
					value: '22',
					unit: '°C',
					checked: true
				},{
					id: bassinName+"-ph",
					name: 'PH',
					value: '2',
					unit: '-',
					checked: false
				},{
					id: bassinName+"-debit",
					name: 'Débit',
					value: '123',
					unit: 'm3/h',
					checked: false
				},{
					id: bassinName+"-test4",
					name: 'Test4',
					value: '123',
					unit: 'm3/h',
					checked: false
				},{
					id: bassinName+"-test5",
					name: 'Test5',
					value: '123',
					unit: 'm3/h',
					checked: false
				}]
			};
		}

		this.handleInputChange= this.handleInputChange.bind(this);
		this.handleMouseHover = this.handleMouseHover.bind(this);
	}

	handleInputChange(event) {   
		for(const each of this.state.measureList){
			if( each.id === event.target.value){
				each.checked = event.target.checked;
			}
		}
		this.setState({ measureList: this.state.measureList});
		const bassinName = this.state.measureList[0].id.substring(0, 7);
		window.localStorage.setItem(bassinName, JSON.stringify(this.state));
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
				className={classNames('bassin ' + this.props.name.toLowerCase())}
				onMouseEnter={this.handleMouseHover}
				onMouseLeave={this.handleMouseHover}
				>
				<h2>{this.props.name}</h2>
				{ 
					this.state.measureList.map(measure => {
						return measure.checked && !this.state.isHovering ?
						    <p>{measure.name + " : "}<span>{measure.value}</span></p>
						: this.state.isHovering ?
							<div className='measure-list'>
									<FormControlLabel
										className='test'
				        				control={
											<Switch 
												value={measure.id}
												onChange={this.handleInputChange} 
												checked={measure.checked}
												color='primary'
											/>
										}
									label={measure.name + " : " + measure.value}
									labelPlacement="start"
			      					/>
							</div>
							:
							<span></span>
					})
				}
			</div>
		);
	}
}

export default Bassin;