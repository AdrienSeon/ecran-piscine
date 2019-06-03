import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import EditeurCentral from './components/EditeurCentral.js';
import Bassin from './components/Bassin.js';
import DateDisplay from './components/DateDisplay.js';
import WidgetMeteo from './components/WidgetMeteo.js';
import './App.css';

//https://stackoverflow.com/questions/8652948/using-port-number-in-windows-host-file
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --start-fullscreen --disable-web-security --user-data-dir

class App extends Component {

	render() {
		return (
			<div className="bg">
				<CssBaseline />
				<figure></figure>
				<figure></figure>
				<figure></figure>
				<div className="vagues">
					<div className="App">
						<WidgetMeteo type="temperature" ipGTB="192.168.1.18:81" pointUrl="BacnetNetwork/AE%242dCH/points/AE%242dCH%2420Commun/AnalogValue/Temperature_Exterieure/" />
{/*						<WidgetMeteo type="wind"  />*/}
						<DateDisplay />
						<EditeurCentral />
						<Bassin name="Bassin1" />
						<Bassin name="Bassin2" />
						<Bassin name="Bassin3" />
						<Bassin name="Bassin4" />
						<Bassin name="Bassin5" />
					</div>
				</div>
				<div className="bulles"></div>
			</div>
		);
	}
}

export default App;
