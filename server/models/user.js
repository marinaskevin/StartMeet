const mongoose = require('mongoose');

module.exports = function() {
	var UserSchema = new mongoose.Schema({
        gid: {
            id_type: {
                type: String,
                required: true,
                select: false
            },
            id_string: {
                type: String,
                required: true,
                select: false
            },
        },
        first_name: {
            type: String,  
            required: [true,"First name is missing."]
        },
        last_name: {
            type: String,
            required: [true,"Last name is missing."]
        },
	    email: {
            type: String,
            match: [/\S+@\S+\.\S+/,"Please enter a valid email."],
            required:[true,'Email is missing.'],
        },
        events: {
            submitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
            liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
            visited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
        },
        places: {
            submitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
            liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
            visited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
        },
        people: {
            following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            audible_to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            visible_to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        }
	}, {timestamps: true });
	mongoose.model('User', UserSchema);
	var User = mongoose.model('User');
}