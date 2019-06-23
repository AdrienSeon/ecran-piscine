const express = require('express');
const centralEditorRoutes = express.Router();

// Require CentralEditor model in our routes module
let CentralEditor = require('../utils/dbModels/CentralEditor.model');

// Defined store route
centralEditorRoutes.route('/add').post(function (req, res) {
	let editor = new CentralEditor(req.body);

	editor.save()
		.then(editor => {
			res.status(200).json({'editor': 'editor in added successfully'});
		})
		.catch(err => {
			res.status(400).send("Unable to save to database");
		});
});

// Defined get data(index or listing) route
centralEditorRoutes.route('/').get(function (req, res) {
	CentralEditor.find(function(err, editor){
		if (err) {
			console.log(err);
		} else {
			res.json(editor);
		}
	});
});

// Defined get id route
centralEditorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    CentralEditor.findById(id, function(err, editor) {
        res.json(editor);
    });
});

//  Defined update route
centralEditorRoutes.route('/update/:id').post(function (req, res) {
	CentralEditor.findById(req.params.id, function(err, editor) {
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
});

// Defined delete | remove | destroy route
centralEditorRoutes.route('/delete/:id').get(function (req, res) {
    CentralEditor.findByIdAndRemove({_id: req.params.id}, function(err, editor){
        if (err) {
        	res.json(err);
        } else {
        	res.json('Successfully removed');
        }
    });
});

module.exports = centralEditorRoutes;