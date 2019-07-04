const Service = require('node-windows').Service;
const EventLogger = require('node-windows').EventLogger;

// Create a new service object
var svc = new Service({
	name:'ecran-piscine',
	description: 'Webserver pour l\'application ecran-piscine',
	script: require('path').join(__dirname,'www'),
	env: [{
		name: "NODE_ENV",
		value: "prod"
	}]
});

// Windows Event Logger
var log = new EventLogger('ecran-piscine');

// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
	console.log('Installation du service "ecran-piscine" terminée');
	console.log('The service exists: ',svc.exists);
	log.info('Installation du service "ecran-piscine" terminée');
	svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('Le service est déja installé');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' démarré');
});

// install the service
svc.install();