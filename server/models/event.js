const mongoose = require('mongoose');

module.exports = function() {
	var EventSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true,"Event name is missing."],
            minlength: [3,"The event name must have at least 3 characters."]
        },
        description: {
            type: String,
            required: [true,"Event description is missing."],
            minlength: [10,"Event description must be at least 10 characters long!"]
        },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: [true,"Event location is missing."]
        },
        start_time: {
            type: Date,
            required: [true,"Event start time is missing."]
        },
        end_time: {
            type: Date
        },
        submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        visited_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        partnerships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partnerships' }]
	}, {timestamps: true });
	mongoose.model('Event', EventSchema);
	var Event = mongoose.model('Event');
}