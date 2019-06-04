import React, { Component } from "react";
import axios from 'axios';
import xmlParser from 'fast-xml-parser';

class WidgetMeteo extends Component {

	constructor(props) {
		super(props);

		const widgetName = props.type + 'Widget';

		this.state = {
			id: widgetName,
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
				withCredentials: true,
				responseType: 'arraybuffer',
		})
		.then((response) => {
			console.log(String.fromCharCode.apply(null, new Uint8Array(response.data)));

			//console.log(response.data.toString('latin1'));
/*			let xmlParsed = xmlParser.parse(response.data.toString('latin1'), {localeRange: 'fr', ignoreAttributes: false, attrNodeName: "_attr", attributeNamePrefix: '',})
			console.log(xmlParsed);
			return xmlParsed*/
		})
		.catch((error) => {
			console.log(error);
		})
		.then((obixData) => {
/*			const name = obixData.real.str._attr.display.split(',')[4].split('=')[1];
			const value = obixData.real._attr.val;
			const unit = obixData.real.str._attr.display.split(',')[0].split('=')[1];

			this.setState({ name });
			this.setState({ value });
			this.setState({ unit });*/
		});


/*axios.interceptors.response.use((response) => {
	console.log('interceptor')
	var ctype: string = response.headers["content-type"];
	response.data = ctype.includes("charset=iso-8859-1") ?
	ctype.decode(response.data, 'iso-8859-1') :
	ctype.decode(response.data, 'utf-8');
    return response;
  }, (error) => {
    // Do something with response error
    return Promise.reject(error);
  });*/




	}





/*		  .then(response => response.arrayBuffer())
		  .then(buffer => {
		    let decoder = new TextDecoder("iso-8859-1");
		    let text = decoder.decode(buffer);
		    console.log(text)
		  });*/

	componentDidMount() {
		this.getObixData(this.props.ipGTB, this.props.pointUrl)
	}


	render() {
		const className = 'widget ' + this.props.type.toLowerCase() + '-widget';
		const iconUrl = '/img/' + this.props.type + '-icon.png';

		return (
			<div className={className}>
				<img src={iconUrl} alt={this.state.id} />
				<p>{this.state.value + ' ' + this.state.unit + ' ' + this.state.name}</p>
			</div>
		);
	}
}

export default WidgetMeteo;