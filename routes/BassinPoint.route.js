const express = require('express');
const bassinPointRoutes = express.Router();

let BassinPoint = require('../utils/dbModels/BassinPoint.model');

bassinPointRoutes.route('/').get(function (req, res) {
	BassinPoint.find(function(err, point){
		if (err) {
			console.log(err);
		} else {
			res.json(point);
		}
	});
});

bassinPointRoutes.route('/:name').get(function(req, res) {
    BassinPoint.find({ name: req.params.name }, function(err, point) {
		if (!err && point == 0) {
			res.status(404).send("data is not found");
		} else {
			res.status(200).json(point)
		}
    });
});

bassinPointRoutes.route('/save/:name').post(function (req, res) {
	console.log('tryin to save '+req.params.name)
    BassinPoint.find({ name: req.params.name }, function(err, point) {
		if (!err && point == 0) {
			let point = new BassinPoint(req.body);
			point.save()
				.then(point => {
					res.status(200).json({'point': 'point in added successfully'});
				})
				.catch(err => {
					res.status(400).send("Unable to save to database");
				});
		} else {
   			BassinPoint.findById(point[0]._id, function(err, point) {
				if (!point)
					res.status(404).send("data is not found");
				else {
					point.checked = req.body.checked;
					point.save()
						.then(point => {
							res.status(200).json('Update complete');
						})
						.catch(err => {
							res.status(400).send("Unable to update the database");
						});
				}
			});
		}
	});
});

bassinPointRoutes.route('/deleteByName/:name').delete(function (req, res) {
	BassinPoint.find({ name: req.params.name }, function(err, point) {
		if (!err && point == 0) {
			res.status(404).send("data is not found");
		} else {
		    BassinPoint.findByIdAndRemove(point[0]._id, function(err, point){
		        if (err) {
		        	res.status(400).json(err);
		        } else {
		        	res.status(200).json('Successfully removed');
		        }
		    });
		}
	});
});

bassinPointRoutes.route('/deleteById/:id').delete(function (req, res) {
    BassinPoint.findByIdAndRemove({_id: req.params.id}, function(err, point){
        if (err) {
        	res.status(400).json(err);
        } else {
        	res.status(200).json('Successfully removed');
        }
    });
});

module.exports = bassinPointRoutes;