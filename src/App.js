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
		const ipGTB = '192.168.1.18:81'
		return (
			<div className="bg">
				<CssBaseline />
				<figure></figure>
				<figure></figure>
				<figure></figure>
				<div className="vagues">
					<div className="App">
						<WidgetMeteo 
							type="temperature"
							ipGTB={ ipGTB }
							pointUrl="BacnetNetwork/AE%242dCH/points/AE%242dCH%2420Commun/AnalogValue/Temperature_Exterieure"
						/>
						<WidgetMeteo 
							type="wind"
							ipGTB={ ipGTB }
							pointUrl="BacnetNetwork/AE%242dCH/points/AE%242dCH%2420Commun/AnalogInput/Anemometre"
						/>
						<DateDisplay />
						<EditeurCentral />
						<Bassin
							id="bassin1"
							name="Bassin bien-être"
							ipGTB={ ipGTB }
							pointUrl1="BacnetNetwork/AE_V2/points/Echangeur4/AnalogInput/Temperature_retour_goulotte"
							pointUrl2="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_3/Debit_bassin"
							pointUrl3="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_3/Taux_CL_combine"
							pointUrl4="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_3/Taux_CL_libre"
							pointUrl5="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_3/Taux_PH"
						/>
						<Bassin
							id="bassin2"
							name="Bassin extérieur"
							ipGTB={ ipGTB }
							pointUrl1="BacnetNetwork/AE_V2/points/Echangeur5/AnalogInput/Temperature_retour_goulotte"
							pointUrl2="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_4/Debit_bassin"
							pointUrl3="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_4/Taux_CL_combine"
							pointUrl4="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_4/Taux_CL_libre"
							pointUrl5="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_4/Taux_PH"
						/>
						<Bassin
							id="bassin3"
							name="Bassin apprentissage"
							ipGTB={ ipGTB }
							pointUrl1="BacnetNetwork/AE_V2/points/Echangeur2/AnalogInput/Temperature_retour_goulotte"
							pointUrl2="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Debit_bassin_mixte"
							pointUrl3="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_CL_combine"
							pointUrl4="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_CL_bassin$20mixte_libre"
							pointUrl5="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_PH_bassin_mixte_pataugeoire"
						/>
						<Bassin
							id="bassin4"
							name="Pataugeoire"
							ipGTB={ ipGTB }
							pointUrl1="BacnetNetwork/AE_V2/points/Echangeur3/AnalogInput/Temperature_retour_goulotte"
							pointUrl2="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Debit_Pataugeoire"
							pointUrl3="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_CL_combine"
							pointUrl4="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_CL_pataugeoire_libre"
							pointUrl5="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_2/Taux_PH_bassin_mixte_pataugeoire"
						/>
						<Bassin
							id="bassin5"
							name="Bassin sportif"
							ipGTB={ ipGTB }
							pointUrl1="BacnetNetwork/AE_V2/points/Echangeur_1/AnalogInput/Temperature_retour_goulotte"
							pointUrl2="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_1/Debit_bassin"
							pointUrl3="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_1/Taux_CL_combine"
							pointUrl4="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_1/Taux_CL_libre"
							pointUrl5="ModbusTcpNetwork/Plomberie_Herve_Thermique/points/Circuit_1/Taux_PH"
						/>
					</div>
				</div>
				<div className="bulles"></div>
			</div>
		);
	}
}

export default App;
