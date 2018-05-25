const mongoose = require('mongoose');

module.exports = function() {
	var PartnershipSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true,"Partnership name is missing."]
        },
        slogan: {
            type: String,
            required: [true,"Partnership slogan is missing."],
            minlength: [3,"You partnership slogan must have at least 3 characters."]
        },
        description: {
            type: String,
            required: [true,"Partnership description is missing."],
            minlength: [10,"You partnership description must have at least 10 characters."]
        },
        submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        chatlog: [{
            username: { type: String, required: true },
            timestamp: { type: Date, required: true },
            message: { type: String, required: true }
        }],
        locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
	}, {timestamps: true });
	mongoose.model('Partnership', PartnershipSchema);
	var Partnership = mongoose.model('Partnership');
}