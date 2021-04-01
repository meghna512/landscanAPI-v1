const shortid = require('shortid');
const Regions = require('../../models/region');


const createRegion = async (req, res) => {
    const newRegion = new Regions();
    newRegion.uid = shortid.generate();
    newRegion.name = req.body.name;
    newRegion.description = req.body.description;
    newRegion.location = req.body.location;
    newRegion.owner = req.user;
    try {
        await newRegion.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ newRegion });
}

const updateRegion = async (req, res) => {
    res.locals.region.name = req.body.name ? req.body.name : res.locals.region.name;
    res.locals.region.description = req.body.description ? req.body.description : res.locals.region.description;
    res.locals.region.location = req.body.location ? req.body.location : res.locals.region.location;
    try {
        await res.locals.region.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ updatedRegion: res.locals.region });
}

const deleteRegion = async (req, res) => {
    if (req.user.uid == res.locals.region.owner.uid) { //if logged in user and region owner are same
        try {
            await Regions.deleteOne({ uid: res.locals.region.uid });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(401).json({ mesage: "unauthorised access" });
    }
    return res.status(203).send();
}

const getRegion = async (req, res) => {
    if(res.locals.region){
        return res.status(200).json(res.locals.region);
    }

    let regionFilter = [];
    let ownerFilter = [];
    if (req.query.regionUid) {
        regionFilter = [{ "uid": { $eq: req.query.regionUid } }];
    }
    if (req.query.ownerUid) {
        ownerFilter = [{ "owner.uid": { $eq: req.query.ownerUid } }];
    }
    let getRegion;
    try {
        getRegion = await Regions.aggregate(
            [
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    }
                },
                {
                    $unwind: "$owner"
                    
                },
                {

                    $match: {
                        $and: [
                            { uid: { $ne: null } },
                            ...regionFilter,
                            ...ownerFilter
                        ]
                    }

                }
            ]
        )
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(getRegion);

}
module.exports = {
    createRegion,
    updateRegion,
    deleteRegion,
    getRegion
};