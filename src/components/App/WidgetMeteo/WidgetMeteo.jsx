import React, { Component } from "react";
import axios from 'axios';
import './WidgetMeteo.css';
import windIcon from './wind-icon.png'
import temperatureIcon from './temperature-icon.png'

class WidgetMeteo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '-',
			value: '-',
			unit: '-',
			error: null,
			isLoaded: false,
		}

		this.getObixData = this.getObixData.bind(this);
	}

	getObixData(pointUrl) {
		axios.post('/get-obix-point-data', {
			pointUrl: pointUrl
		})
		.then((response) => {
			this.setState({ 
				name: response.data.name,
				value: response.data.value,
				unit: response.data.unit
			});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	componentDidMount() {
		this.getObixData(this.props.pointUrl)
		this.interval = setInterval(() => {
			this.getObixData(this.props.pointUrl)
		}, 60000)
	}

	componentWillUnmount () {
		clearInterval(this.interval);
	}

	render() {
		const className = 'widget ' + this.props.type.toLowerCase() + '-widget';
		const altImg = this.props.type + '-icon';
		
		if(this.props.type == 'wind'){
			return (
				<div className={className}>
					<img src={windIcon} alt={altImg} />
					<p>{this.state.value + ' ' + this.state.unit}</p>
				</div>
			);
		} else {
			return (
				<div className={className}>
					<img src={temperatureIcon} alt={altImg} />
					<p>{this.state.value + ' ' + this.state.unit}</p>
				</div>
			);
		}
	}
}

export default WidgetMeteo;