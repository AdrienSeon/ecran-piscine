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
	const basicAuth = 'Basic ' + btoa('obix' + ':' + 'syscom');

	var headers = new Headers();
	headers.append('Access-Control-Allow-Origin', '*');
	headers.append('Authorization', basicAuth);
	headers.append('Content-Type','text/xml; charset=UTF-8');

	var myInit = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default',
		credentials: 'include'
	};

/*		  .then(response => response.arrayBuffer())
		  .then(buffer => {
		    let decoder = new TextDecoder("iso-8859-1");
		    let text = decoder.decode(buffer);
		    console.log(text)
		  });*/

/*
	fetch(url,myInit)
		.then(response => response.text())
		.then(obixData => {
			console.log(obixData);
			return obixData = xmlParser.parse(obixData, {localeRange: 'fr', ignoreAttributes: false, attrNodeName: "_attr", attributeNamePrefix: '',})
		})
		.then(obixData => {
			console.log(obixData);
			let unit = obixData.real.str._attr.display.split(',')[0].split('=')[1];
			let name = obixData.real.str._attr.display.split('=')[5];
			let value = obixData.real._attr.val;

			console.log(unit);
			console.log(name);
			console.log(value);
			this.setState({name});
			this.setState({value});
			this.setState({unit});
		});
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --start-fullscreen --disable-web-security --user-data-dir
*/



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
/*.then((obixData) => {
	const unit = obixData.real.str._attr.display.split(',')[0].split('=')[1];
	const name = obixData.real.str._attr.display.split('=')[5];
	const value = obixData.real._attr.val;

	this.setState({ name });
	this.setState({ value });
	this.setState({ unit });
});*/

/*
var xhr = new XMLHttpRequest;
xhr.open('GET', url);

// If specified, responseType must be empty string or "document"
xhr.responseType = 'document';
xhr.setRequestHeader("Authorization", basicAuth);
// Force the response to be parsed as XML
xhr.overrideMimeType('text/xml');

xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    console.log(xhr.responseXML);
  }

};

xhr.send();
*/


/*    this.xhr = new XMLHttpRequest()

	this.xhr.open('GET', url, true);

	// If specified, responseType must be empty string or "document"
	//this.xhr.responseType = 'document';
	this.xhr.setRequestHeader("Authorization", basicAuth);
	this.xhr.setRequestHeader("Content-Type", 'text/xml; charset=UTF-8');
	// Force the response to be parsed as XML
	this.xhr.overrideMimeType('text/xml; charset=UTF-8');

	this.xhr.onload = () => {
	    if (this.xhr.readyState === this.xhr.DONE) {
	       console.log(this.xhr.responseText)
	    }
	};
	this.xhr.send();
*/

/*	let xml = '<real val="0.0" status="down"href="https://192.168.1.18/obix/config/Drivers/BacnetNetwork/AE%242dCH/points/AE%242dCH%2420Commun/AnalogValue/Temperature_Exterieure_Secourue/"is="/obix/def/control:NumericWritable /obix/def/control:NumericPoint obix:Point"display="0.0 °C {vers le bas,éventé} @ def"icon="/ord?module://icons/x16/control/numericPoint.png"unit="obix:units/celsius"xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"><strname="facets" val="units=u:celsius;°C;(K);+273.15;|precision=i:1|min=d:-inf|max=d:+inf|trueText=s:Temp$e9rature"href="facets/"display="units=°C,precision=1,min=-inf,max=+inf,trueText=Température"displayName="Facets"writable="true"></str><refname="proxyExt"status="down"href="proxyExt/"is="/obix/def/bacnet:BacnetNumericProxyExt"display="analogValue:2:Present Value:-1:REAL"displayName="Proxy Ext"icon="/ord?module://icons/x16/control/controlExtension.png"></ref><realname="out"val="0.0"status="down"href="out/"is="/obix/def/baja:StatusNumeric"display="0.0 °C {vers le bas,éventé} @ def"displayName="Out"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in1"val="0.0"href="in1/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In1"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in2"val="0.0"href="in2/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In2"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in3"val="0.0"href="in3/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In3"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in4"val="0.0"href="in4/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In4"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in5"val="0.0"href="in5/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In5"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in6"val="0.0"href="in6/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In6"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in7"val="0.0"href="in7/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In7"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in8"val="0.0"href="in8/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In8"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in9"val="0.0"href="in9/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In9"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in10"val="0.0"href="in10/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In10"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in11"val="0.0"href="in11/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In11"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in12"val="0.0"href="in12/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In12"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in13"val="0.0"href="in13/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In13"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in14"val="0.0"href="in14/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In14"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in15"val="0.0"href="in15/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In15"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="in16"val="0.0"href="in16/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="In16"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><realname="fallback"val="0.0"href="fallback/"is="/obix/def/baja:StatusNumeric"null="true"display="- {nulle}"displayName="Fallback"icon="/ord?module://icons/x16/statusNumeric.png"unit="obix:units/celsius"> </real><abstimename="overrideExpiration"val="1970-01-01T01:00:00.000+01:00"href="overrideExpiration/"null="true"display="null"displayName="Override Expiration"tz="Europe/Paris"></abstime><opname="emergencyOverride"href="emergencyOverride/"in="obix:real"displayName="Emergency Override"></op><opname="emergencyAuto"href="emergencyAuto/"displayName="Emergency Auto"></op><opname="override"href="override/"in="/obix/def/control:NumericOverride /obix/def/control:Override"displayName="Override"></op><opname="auto"href="auto/"displayName="Auto"></op><opname="set"href="set/"in="obix:real"displayName="Set"></op></real>';
	let js = xmlParser.parse(xml, {localeRange: 'fr', ignoreAttributes: false, attrNodeName: "_attr", attributeNamePrefix: '',})
	console.log(js);

	let unit = js.real.strname._attr.display.split(',')[0].split('=')[1];
	let name = js.real.strname._attr.display.split('=')[5];
	let value = js.real._attr.val;
	console.log(unit);
	console.log(name);
	console.log(value);*/

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