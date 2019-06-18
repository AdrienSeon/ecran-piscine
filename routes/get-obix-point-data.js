var express = require('express');
var router = express.Router();
var axios = require('axios');
var parseString = require('xml2js').parseString;

router.post('/', function(req, res, next) {
	const ipGTB = '192.168.1.124:81';
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
				obixPointData.name = facet.split(',')[4].split('=')[1];
				
				let value = parseFloat(result.real.$.val);
				value = +value.toFixed(2)
				obixPointData.value = value;

				if(facet.split(',')[0].split('=')[1] === 'null'){
					obixPointData.unit = '';
				} else {
					obixPointData.unit = facet.split(',')[0].split('=')[1];
				}
				console.log(JSON.stringify(obixPointData, null, 4))
			    res.send(obixPointData);
			} catch(error) {
				console.log('Error while parsing xml : ' + error);
			}
		});
	})
	.catch((error) => {
		console.log(error);
	})
});

module.exports = router;