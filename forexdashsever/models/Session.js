// imports statements
const mongoose = require("mongoose");

// creating a Scheme for mongoose and setting expected data to be received
const SessionSchema = new mongoose.Schema({
	error: {
		type: Boolean,
		required: true,
	},
	message: {
		type: String,
		required: false,
	},
	session: {
		type: String,
		required: false,
	},
});

// create a Model and export to be used globally
const SessionModel = mongoose.model("sessions", SessionSchema);
module.exports = SessionModel;
