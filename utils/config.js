const env = process.env.NODE_ENV; // 'dev' or 'prod'

const prod = {
	app: {
		port: parseInt(process.env.PROD_APP_PORT) || 80,
		obix: {
			host: '192.168.200.238',
			port: 81,
			username: 'obix',
			password: 'syscom'
		}
	},
	db: {
		host: process.env.PROD_DB_HOST || 'localhost',
		port: parseInt(process.env.PROD_DB_PORT) || 27017,
		name: process.env.PROD_DB_NAME || 'ecran-piscine'
	}
};

const dev = {
	app: {
		port: parseInt(process.env.DEV_APP_PORT) || 3001,
		obix: {
			host: 'localhost',
			port: 81,
			username: 'obix',
			password: 'syscom'
		}
	},
	db: {
		host: process.env.DEV_DB_HOST || 'localhost',
		port: parseInt(process.env.DEV_DB_PORT) || 27017,
		name: process.env.DEV_DB_NAME || 'test'
	}
};

const config = {
	prod,
	dev
};

module.exports = config[env];