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
			this.setState({ 
				name: '-',
				value: '-',
				unit: '-'
			});
		})
	}

	componentDidMount() {
		this.hydrateStateWithDB();

		window.addEventListener(
			"beforeunload",
			this.saveCheckedToDB.bind(this)
		);

		this.getObixData(this.props.pointUrl)
		this.interval = setInterval(() => {
			this.hydrateStateWithDB();
			this.getObixData(this.props.pointUrl);
		}, 60000)
	}

	componentWillUnmount () {
		clearInterval(this.interval);

		window.removeEventListener(
			"beforeunload",
			this.saveCheckedToDB.bind(this)
		);

		this.saveCheckedToDB();
	}

	hydrateStateWithDB() {
		axios.get('/bassin-point/'+this.state.id)
		.then((response) =>{
			this.setState({checked: response.data[0].checked});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	saveCheckedToDB() {
		axios.post('/bassin-point/save/'+this.state.id, {
			'name': this.state.id,
			'checked': this.state.checked
		})
		.catch((error) => {
			console.log(error);
		})
	}

	handleChange = event => {
		this.setState({checked: event.target.checked}, () => this.saveCheckedToDB());
	};

	render() {
		if(this.state.checked && !this.props.isHovering){
			return <p>{this.state.name + " : "}<span>{this.state.value + " " + this.state.unit}</span></p>;
		}else if(this.props.isHovering){
			return(
				<div>
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
				</div>
			);
		}else{
			return null;
		}
	}
}

export default BassinPoint;