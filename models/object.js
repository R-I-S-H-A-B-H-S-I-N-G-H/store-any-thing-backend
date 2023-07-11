const mongoose = require("mongoose");
const object = new mongoose.Schema({
	data: Map,
	updatedAt: {
		type: Date,
		default: () => new Date(),
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => new Date(),
	},
});
module.exports = mongoose.model("object", object);