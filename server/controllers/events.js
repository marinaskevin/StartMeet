const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = {
	showEvents: function(req,res) {
		Event.find({}).sort({_id: -1}).exec(function(err, events) {
			if(err)
			{
				console.log("Error in finding events",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(events);
			}
		})
	},
	showUserEvents: function(req,res) {
		Event.find({}).populate("submitted_by").find({"submitted_by": req.params.id}).sort({_id: -1}).exec(function(err, events) {
			if(err)
			{
				console.log("Error in finding events submitted by this user",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(events);
			}
		})
	},
	showEvent: function(req,res,id) {
		Event.findOne({_id: id}).populate("submitted_by").exec(function(err, event) {
			if(err)
			{
				console.log("Error in finding event",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(event);
			}
		})
	},
	newEvent: function(req,res,event_data) {
		var event_data = {
			name: req.body.name,
			description: req.body.description,
			location: mongoose.Types.ObjectId(req.body.location),
			start_time: req.body.start_time,
			end_time: req.body.end_time,
			submitted_by: mongoose.Types.ObjectId(req.body.id)
		}
		var newEvent = new Event(event_data);
		newEvent.save(function(err,event){
			if(err)
			{
				console.log("Error in adding event",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json({ message: "Saved event!", event: event });
			}
		})
	},
	updateEvent: function(req,res,id,event_data) {
		Event.updateOne({_id: id},{$set: event_data},function(err,event){
			if(err)
			{
				var message = "Error in updating event";
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
				res.json({ message: "Success", event: event });
			}
		})
	},
	removeEvent: function(req,res,gid) {
		Event.remove({gid: gid},function(err,event){
			if(err)
			{
				var message = "Error in removing event";
				console.log(message,err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: meesage, error: errors });
			}
			else
			{
				res.json({ message: "Removed event!", event: event });
			}
		})
	},
}