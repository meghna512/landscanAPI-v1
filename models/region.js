const mongoose = require('mongoose');
const { prependListener } = require('./user');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    location: {
        type: {
            type: String
        },
        geometry: {
            type: {
                type: String
            },
            coordinates: [Number]
        }
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});

RegionSchema.pre("findOne", function (next) {
    this.populate("owner");
    next();
});

const region = mongoose.model('region', RegionSchema);

module.exports = region;