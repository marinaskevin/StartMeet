const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const User = mongoose.model('User');

module.exports = {
	showUsers: function(req,res) {
		User.find({}).sort({_id: -1}).exec(function(err, users) {
			if(err)
			{
				console.log("Error in finding users",err);
			var errors = [];
			for(var key in err.errors)
			{
				errors.push(err.errors[key].message);
			}
			res.json({ message: "Error", error: errors });
		}
			else
			{
				res.json(users);
			}
		})
	},
	showUser: function(req,res,id) {
		User.findOne({_id: id},function(err, user) {
			if(err)
			{
				console.log("Error in finding user",err);
			var errors = [];
			for(var key in err.errors)
			{
				errors.push(err.errors[key].message);
			}
			res.json({ message: "Error", error: errors });
		}
			else
			{
				res.json(user);
			}
		})
	},
	newUser: function(req,res) {
		var errors = [];
		User.find({email: req.body.email},function(err,users) {
			if(err)
			{
				for(var key in err.errors)
				{
					errors.push(err.errors[key].message);
				}
				res.json({ message: "Error", error: errors });
			}
			else
			{
				if(users.length != 0)
				{
					errors.push("User with email "+req.body.email+" already exists.");
					res.json({ message: "Error", error: errors });
				}
				else
				{
					if(req.body.password.length < 8)
					{
						errors.push("Password must have at least 8 characters.")
						res.json({ message: "Error", error: errors });
					}
					else if(req.body.password != req.body.cpassword)
					{
						errors.push("Passwords do not match.");
						res.json({ message: "Error", error: errors });
					}
					else
					{
						bcrypt.genSalt(10, (err, salt) => { // generate random salt
							if (err) {
                                                                errors.push(err);
                                                                errors.push("salting error");
                                                                res.json({ message: "Error", error: errors });
							}
						bcrypt.hash(req.body.password,salt,null,function(err,hashed_password){
							if(err)
							{
                                                                for(var key in err.errors)
                                                                {
                                                                        errors.push(err.errors[key].message);
                                                                }
								errors.push(err);
								errors.push("hash password error");
								res.json({ message: "Error", error: errors });
							}
							else
							{
							var user = new User({
								gid: {
									id_type: req.body.id_type,
									id_string: hashed_password
								},
								first_name: req.body.first_name,
								last_name: req.body.last_name,
								email: req.body.email
							});
							user.save(function(err){
								if(err)
								{
									for(var key in err.errors)
									{
										errors.push(err.errors[key].message);
									}
									res.json({ message: "Error", error: errors });
								}
								else
								{
									User.findOneAndUpdate({email: req.body.email},{password: hashed_password},function(err,user){
										if(err)
										{
											errors.push("Error in saving password. Please try again.");
											res.json({ message: "Error", error: errors });
										}
										else
										{
											res.json({ message: "Success", user: user });
										}
									})
								}
							})
							}
						})
						})
					}
				}
			}
		})
	},
	loginUser: function(req,res)
	{
		console.log(req.body);
		var errors = [];
		if(req.body.email == '' || req.body.password == '')
		{
			errors.push("Username and/or password does not match.");
			res.json({ message: "Error", error: errors });
		}
		else
		{
			User.findOne({email: req.body.email}).select('+gid.id_string').exec(function(err,_user){
				if(err)
				{
					for(var key in err.errors)
					{
						errors.push(err.errors[key].message);
					}
					res.json({ message: "Error", error: errors });
				}
				else if(_user==null)
				{
					errors.push("Username and/or password does not match.");
					res.json({ message: "Error", error: errors });
				}
				else
				{
					bcrypt.compare(req.body.password,_user.gid.id_string,(err,result) => {
						if(err)
						{
							for(var key in err.errors)
							{
                	                        	        errors.push(err.errors[key].message);
							}
							res.json({ message: "Error", error: errors });
						}
						else if(!result)
						{
							errors.push("Username and/or password does not match.");
							res.json({ message: "Error", error: errors });
						}
						else
						{
							User.findOne({email: req.body.email},function(err,user){
								res.json({ message: "Success", user: user });
							});
						}
					})
				}
			})
		}
	},
	updateUser: function(req,res,id,user_data) {
		User.updateOne({_id: id},{$set: user_data},function(err,user){
			if(err)
			{
				var message = "Error in updating user";
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
				res.json({ message: "Success", user: user });
			}
		})
	},
	removeUser: function(req,res,gid) {
		User.remove({gid: gid},function(err,user){
			if(err)
			{
				var message = "Error in removing user";
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
				res.json({ message: "Removed user!", user: user });
			}
		})
	},
}
