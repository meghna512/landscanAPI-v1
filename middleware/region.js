const Regions = require("../models/region");
const Vectors = require("../models/vector");


const checkRegion = async (req, res, next) => { //check if region exists
    const regionUid = req.params.regionUid;
    let region;
    try {
        region = await Regions.findOne({ uid: regionUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (region) {
        res.locals.region = region; //to avoid checking again and again in db
    } else {
        return res.status(404).json({ message: "Region not found" });
    }
    return next();
}

const checkVector = async (req, res, next) => { //check if vector exists
    const vectorUid = req.params.vectorUid;
    let vector;
    try {
        vector = await Vectors.findOne({ uid: vectorUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (vector) {
        res.locals.vector = vector; //to avoid checking again and again in db
    } else {
        return res.status(404).json({ message: "Vector not found" });
    }
    return next();
}

module.exports = {
    checkRegion,
     checkVector
}