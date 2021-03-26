const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VectorSchema = new Schema({
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
    classID: Number,
    className: String,
    polygon: {
        type: {
            type: String
        },
        geometry:{
            type: Polygon,
            coordinates: [[[Number]]]
        }
    },
    region: {
        type: mongoose.Types.ObjectId,
        ref: "region"
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});

const vector = mongoose.model("vector", VectorSchema);

module.exports = vector;