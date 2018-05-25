const mongoose = require('mongoose');

module.exports = function() {
	var PlaceSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true,"The place needs a name! What do you call this place?"]
        },
        latitude: {
            type: Number,
            required: [true, "Hmm. The system could not find the latitude. Please try submitting again."]
        },
        longitude: {
            type: Number,
            required: [true, "Hmm. The system could not find the longitude. Please try submitting again."]
        },
        submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        visited_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
	}, {timestamps: true });
	mongoose.model('Place', PlaceSchema);
	var Place = mongoose.model('Place');
}