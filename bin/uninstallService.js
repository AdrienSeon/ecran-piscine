var Service = require('node-windows').Service;
var EventLogger = require('node-windows').EventLogger;
 
// Create a new service object
var svc = new Service({
	name:'ecran-piscine',
	description: 'Webserver pour l\'application ecran-piscine',
	script: require('path').join(__dirname,'www'),
	env: [{
		name: "NODE_ENV",
		value: "dev"
	}]
});
 
// Windows Event Logger
var log = new EventLogger('ecran-piscine');

// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
	console.log('Désinstallation du service "ecran-piscine" terminée');
	console.log('The service exists: ',svc.exists);
	log.info('Désinstallation du service "ecran-piscine" terminée');
});

// Uninstall the service.
svc.uninstall();