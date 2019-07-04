const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for CentralEditor
let CentralEditor = new Schema({
	editorContent: {
		type: String
	}
});

module.exports = mongoose.model('CentralEditor', CentralEditor);