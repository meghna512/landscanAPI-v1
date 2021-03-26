const Regions = require("../models/region");

const checkRegion = async (req, res, next) => {
    const regionUid = req.params.regionUid;
    let region;
    try {
        region = await Regions.findOne({ uid: regionUid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (region) {
        res.locals.region = region;
    } else {
        return res.status(404).json({ message: "Region not found" });
    }
    return next();
}

module.exports = {
    checkRegion
}