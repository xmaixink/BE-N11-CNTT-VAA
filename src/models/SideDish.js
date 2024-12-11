let mongoose = require('mongoose');

let SideDishSchema = new mongoose.Schema({
	vendorId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: false,

	}
}, { timestamps: true, collection: 'side_dishes' });

module.exports = mongoose.model('SideDish', SideDishSchema);
