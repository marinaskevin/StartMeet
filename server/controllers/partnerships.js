const mongoose = require('mongoose');
const Partnership = mongoose.model('Partnership');

module.exports = {
	showPartnerships: function(req,res) {
		Partnership.find({}).sort({_id: -1}).exec(function(err, partnerships) {
			if(err)
			{
				console.log("Error in finding partnerships",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(partnerships);
			}
		})
	},
	showPartnership: function(req,res,id) {
		Partnership.findOne({_id: id},function(err, partnership) {
			if(err)
			{
				console.log("Error in finding partnership",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json(partnership);
			}
		})
	},
	newPartnership: function(req,res,partnership_data) {
		var newPartnership = new Partnership(partnership_data);
		newPartnership.save(function(err,partnership){
			if(err)
			{
				console.log("Error in adding partnership",err);
				var errors = [];
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				res.json({ message: "Saved partnership!", partnership: partnership });
			}
		})
	},
	updatePartnership: function(req,res,id,partnership_data) {
		Partnership.updateOne({_id: id},{$set: partnership_data},function(err,partnership){
			if(err)
			{
				var message = "Error in updating partnership";
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
				res.json({ message: "Success", partnership: partnership });
			}
		})
	},
	removePartnership: function(req,res,gid) {
		Partnership.remove({gid: gid},function(err,partnership){
			if(err)
			{
				var message = "Error in removing partnership";
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
				res.json({ message: "Removed partnership!", partnership: partnership });
			}
		})
	},
}