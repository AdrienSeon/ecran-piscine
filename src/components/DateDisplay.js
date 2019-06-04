import React, { Component } from "react";
import Moment from 'react-moment';
import 'moment/locale/fr';

class DateDisplay extends Component {

	render() {
		return (
			<div className='date-display'>
				<div className='date'>
					<Moment  interval={1000} format="dddd D MMMM YYYY" />
				</div>
				<div className='time'>
					<Moment className='time' interval={1000} format="HH:mm:ss" />
				</div>
			</div>
		);
	}
}

export default DateDisplay;