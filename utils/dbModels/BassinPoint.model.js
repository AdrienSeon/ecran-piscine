const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for BassinPoint
let BassinPoint = new Schema({
	name: {
		type: String
	},
	checked: {
		type: Boolean
	}
});

module.exports = mongoose.model('BassinPoint', BassinPoint);