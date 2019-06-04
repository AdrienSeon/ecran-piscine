import React, { Component } from "react";
import axios from 'axios';
import xmlParser from 'fast-xml-parser';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from "classnames";

class Bassin extends Component {

	constructor(props) {
		super(props);
		
		
		const bassinId = props.id;
		const localStorageState = window.localStorage.getItem(bassinId);
		
		if (localStorageState) {
			this.state = JSON.parse(localStorageState);
			this.state.isHovering = false;
		} else {
			this.state = {
				isHovering: false,
				measureList: [{
					id: 'point1',
					name: 'Température',
					value: '23',
					unit: '°C',
					checked: true,
					error: null,
				},{
					id: 'point2',
					name: 'Débit',
					value: '123',
					unit: 'm3/h',
					checked: false,
					error: null,
				},{
					id: 'point3',
					name: 'PH',
					value: '2',
					unit: '',
					checked: false,
					error: null,
				},{
					id: 'point4',
					name: 'Taux de chlore libre',
					value: '3',
					unit: '',
					checked: false,
					error: null,
				},{
					id: 'point5',
					name: 'Taux de chlore combiné',
					value: '1',
					unit: '',
					checked: false,
					error: null,
				}]
			};
		}

		this.handleInputChange= this.handleInputChange.bind(this);
		this.handleMouseHover = this.handleMouseHover.bind(this);
		this.getObixData = this.getObixData.bind(this);
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

	getObixData(ipGTB, pointUrl) {
		const url = 'http://' + ipGTB + '/obix/config/Drivers/' + pointUrl;

		axios.get(url, {
				auth: {
					username: 'obix',
					password: 'syscom'
				},
				responseType: 'document',
		})
		.then((response) => {
			const facet = response.data.getElementsByTagName("str")[0].getAttribute('display');
			const name = facet.split(',')[4].split('=')[1];
			const value = parseInt(response.data.getElementsByTagName("real")[0].getAttribute('val'));
			const unit = facet.split(',')[0].split('=')[1];

			this.setState({ name });
			this.setState({ value });
			this.setState({ unit });
		})
		.catch((error) => {
			console.log(error);
		})
	}

	componentDidMount() {
		this.getObixData(this.props.ipGTB, this.props.pointUrl1)
		this.getObixData(this.props.ipGTB, this.props.pointUrl2)
		this.getObixData(this.props.ipGTB, this.props.pointUrl3)
		this.getObixData(this.props.ipGTB, this.props.pointUrl4)
		this.getObixData(this.props.ipGTB, this.props.pointUrl5)
	}

	render() {
		return (
			<div
				className={classNames('bassin ' + this.props.id.toLowerCase())}
				onMouseEnter={this.handleMouseHover}
				onMouseLeave={this.handleMouseHover}
				>
				<h2>{this.props.name}</h2>
				{ 
					this.state.measureList.map(measure => {
						return measure.checked && !this.state.isHovering ?
						    <p>{measure.name + " : "}<span>{measure.value + " " + measure.unit}</span></p>
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
									label={measure.name + " : " + measure.value + " " + measure.unit}
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