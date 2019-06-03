import React, { Component } from "react";
import xmlParser from 'fast-xml-parser';
import axios from 'axios';

class WidgetMeteo extends Component {

	constructor(props) {
		super(props);

		const widgetName = props.type + 'Widget';

		this.state = {
			id: widgetName,
			name: '-',
			value: '-',
			unit: '-',
			error: null,
			isLoaded: false,
		}

		this.xhr = null
	}

componentDidMount() {

	const url = 'http://' + this.props.ipGTB + '/obix/config/Drivers/' + this.props.pointUrl;







axios.get(url, {
		auth: {
			username: 'obix',
			password: 'syscom'
		},
		withCredentials: true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		responseType: 'text',
})
.then((response) => {
	console.log(response.data);
	return xmlParser.parse(response.data, {localeRange: 'fr', ignoreAttributes: false, attrNodeName: "_attr", attributeNamePrefix: '',})
})
.catch((error) => {
	console.log(error);
})
.then((obixData) => {
	const unit = obixData.real.str._attr.display.split(',')[0].split('=')[1];
	const name = obixData.real.str._attr.display.split('=')[5];
	const value = obixData.real._attr.val;

	this.setState({ name });
	this.setState({ value });
	this.setState({ unit });
});

/*		  .then(response => response.arrayBuffer())
		  .then(buffer => {
		    let decoder = new TextDecoder("iso-8859-1");
		    let text = decoder.decode(buffer);
		    console.log(text)
		  });*/



}

    componentWillUnmount() {
        // Cancel the xhr request, so the callback is never called
        if (this.xhr && this.xhr.readyState != 4) {
            this.xhr.abort();
        }
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