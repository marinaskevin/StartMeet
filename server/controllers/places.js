const mongoose = require('mongoose');
const Place = mongoose.model('Place');

module.exports = {
	showPlaces: function(req,res) {
		Place.find({}).sort({_id: -1}).exec(function(err, places) {
			if(err)
			{
				console.log("Error in finding places",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(places);
			}
		})
	},
	showPlace: function(req,res,id) {
		Place.findOne({_id: id}).populate("submitted_by").exec(function(err, place) {
			if(err)
			{
				console.log("Error in finding place",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(place);
			}
		})
	},
	newPlace: function(req,res) {
		var place_data = {
			name: req.body.name,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			submitted_by: mongoose.Types.ObjectId(req.body.id)
		}
		var newPlace = new Place(place_data);
		newPlace.save(function(err,place){
			if(err)
			{
				console.log("Error in adding place",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json({ message: "Saved place!", place: place });
			}
		})
	},
	updatePlace: function(req,res,gid,place_data) {
		Place.updateOne({gid: gid},{$set: place_data},function(err,place){
			if(err)
			{
				var message = "Error in updating place";
				console.log(message,err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: message, error: errors });
			}
			else
			{
				res.json({ message: "Success", place: place });
			}
		})
	},
	removePlace: function(req,res,gid) {
		Place.remove({gid: gid},function(err,place){
			if(err)
			{
				var message = "Error in removing place";
				console.log(message,err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: message, error: errors });
			}
			else
			{
				res.json({ message: "Removed place!", place: place });
			}
		})
	},
}