import React, { Component } from "react";
import axios from 'axios';
import xmlParser from 'fast-xml-parser';

class WidgetMeteo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			value: '25',
			unit: '°C',
			error: null,
			isLoaded: false,
		}

		this.getObixData = this.getObixData.bind(this);
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
		this.getObixData(this.props.ipGTB, this.props.pointUrl)
	}

	render() {
		const className = 'widget ' + this.props.type.toLowerCase() + '-widget';
		const iconUrl = '/img/' + this.props.type + '-icon.png';
		const altImg = this.props.type + 'Widget';
		return (
			<div className={className}>
				<img src={iconUrl} alt={altImg} />
				<p>{this.state.value + ' ' + this.state.unit}</p>
			</div>
		);
	}
}

export default WidgetMeteo;