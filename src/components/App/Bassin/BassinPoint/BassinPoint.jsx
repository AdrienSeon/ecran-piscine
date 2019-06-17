import React, { Component } from "react";
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './BassinPoint.css';

class BassinPoint extends Component {

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.pointId,
			name: '-',
			value: '-',
			unit: '-',
			checked: true,
			error: null,
		}

		const localStorageState = window.localStorage.getItem(this.props.pointId);
		if (localStorageState) {
			console.log(JSON.parse(localStorageState))
			this.state = JSON.parse(localStorageState);
		}

		this.getObixData = this.getObixData.bind(this);
		this.handleInputChange= this.handleChange.bind(this);
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

	handleChange = event => {
		this.setState({checked: event.target.checked});
		window.localStorage.setItem(this.props.pointId, JSON.stringify({checked: event.target.checked}));
	};

	render() {
		if(this.state.checked && !this.props.isHovering){
			return <p>{this.state.name + " : "}<span>{this.state.value + " " + this.state.unit}</span></p>;
		}else if(this.props.isHovering){
			return(
				<FormControlLabel
					control={
						<Switch 
							onChange={this.handleChange} 
							checked={this.state.checked}
							color='primary'
						/>
					}
					label={this.state.name}
					labelPlacement="start"
				/>
			);
		}else{
			return null;
		}
	}
}

export default BassinPoint;