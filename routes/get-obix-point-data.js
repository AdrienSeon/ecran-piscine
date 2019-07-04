var express = require('express');
var router = express.Router();
var axios = require('axios');
var parseString = require('xml2js').parseString;

router.post('/', function(req, res, next) {
	const ipGTB = '192.168.1.18:81';
	const url = 'http://' + ipGTB + '/obix/config/Drivers/' + req.body.pointUrl;

	axios.get(url, {
			auth: {
				username: 'obix',
				password: 'syscom'
			},
	})
	.then((response) => {
		parseString(response.data, function (err, result) {
		    try {
	    		let obixPointData = {};
				const facet = result.real.str[0].$.display;
//tests plus poussés a faire suivant les data recues
				obixPointData.name = facet.split(',')[4].split('=')[1];

				let value = parseFloat(result.real.$.val);
				let precision = 1;
				if(facet.split(',')[1].split('=')[0] === 'precision'){
					precision = parseInt(facet.split(',')[1].split('=')[1]);
				}
				value = +value.toFixed(precision);
				obixPointData.value = value;

				if(facet.split(',')[0].split('=')[1] === 'null'){
					obixPointData.unit = '';
				} else {
					obixPointData.unit = facet.split(',')[0].split('=')[1];
				}

				res.status(200).json(obixPointData);
			} catch(error) {
				res.status(400).send('Error while parsing xml : ' + error);
			}
		});
	})
	.catch((error) => {
		console.log(error);
	})
});

module.exports = router;