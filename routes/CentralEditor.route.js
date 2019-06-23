const express = require('express');
const centralEditorRoutes = express.Router();

let CentralEditor = require('../utils/dbModels/CentralEditor.model');

centralEditorRoutes.route('/').get(function (req, res) {
	CentralEditor.find(function(err, editor){
		if (err) {
			console.log(err);
		} else {
			res.json(editor);
		}
	});
});

centralEditorRoutes.route('/get-editor').get(function (req, res) {
	CentralEditor.find(function(err, editor){
		if (err) {
			console.log(err);
		} else {
			res.json(editor[0]);
		}
	});
});

centralEditorRoutes.route('/save').post(function (req, res) {
	CentralEditor.countDocuments(function (err, count) {

		if (!err && count === 0) {
			let editor = new CentralEditor(req.body);

			editor.save()
				.then(editor => {
					res.status(200).json({'editor': 'editor in added successfully'});
				})
				.catch(err => {
					res.status(400).send("Unable to save to database");
				});
		} else {
			CentralEditor.find(function(err, editor){
				if (err) {
					console.log(err);
				} else {
					CentralEditor.findById(editor[0]._id, function(err, editor) {
						if (!editor)
							res.status(404).send("data is not found");
						else {
							editor.editorContent = req.body.editorContent;
							editor.save().then(editor => {
								res.json('Update complete');
							})
							.catch(err => {
								res.status(400).send("Unable to update the database");
							});
						}
					});
				}
			});
		}
	});
});

centralEditorRoutes.route('/delete').delete(function (req, res) {
	CentralEditor.find(function(err, editor){
		if (err) {
			console.log(err);
		} else {
		    CentralEditor.findByIdAndRemove({_id: editor[0]._id}, function(err, editor){
		        if (err) {
		        	res.json(err);
		        } else {
		        	res.json('Successfully removed');
		        }
		    });
		}
	});
});

module.exports = centralEditorRoutes;