const shortid = require('shortid');

const { Buffer } = require('buffer');
const Vectors = require('../../models/vector');
const {classMapping, parseVectors} = require('../../helpers/vector');

const createVector = async (req, res) => {
    const newVector = new Vectors();
    newVector.uid = shortid.generate();
    newVector.name = req.body.name;
    newVector.description = req.body.description ? req.body.description : newVector.description;
    newVector.classId = req.body.classId;
    newVector.className = classMapping.getClassName(req.body.classId);
    newVector.polygon = req.body.polygon;
    newVector.region = res.locals.region;
    newVector.owner = req.user;

    try {
        await newVector.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ newVector });

}

const updateVector = async (req, res) => {
    res.locals.vector.name = req.body.name ? req.body.name : res.locals.vector.name;
    res.locals.vector.description = req.body.description ? req.body.description : res.locals.region.description;
    res.locals.vector.classId = req.body.classId ? req.body.classId : res.locals.vector.classId;
    res.locals.vector.className = req.body.classId ? classMapping.getClassName(req.body.classId) : res.locals.vector.className;
    res.locals.vector.polygon = req.body.polygon ? req.body.polygon : res.locals.vector.polygon;

    try {
        await res.locals.vector.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({ updatedVector: res.locals.vector });
}

const deleteVector = async (req, res) => {
    if (req.user.uid == res.locals.vector.owner.uid) {
        try {
            await Vectors.deleteOne({ uid: res.locals.vector.uid });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(401).json({ mesage: "unauthorised access" });
    }
    return res.status(203).send();
}

const getVector = async (req, res) => {
    let vectorFilter = [];
    let ownerFilter = [];
    let regionFilter = [];
    let classNameFilter = [];
    if (req.query.vectorUid) {
        vectorFilter = [{ "uid": { $eq: req.query.vectorUid } }];
    } else if (req.query.ownerUid) {
        ownerFilter = [{ "owner.uid": { $eq: req.query.ownerUid } }];
    } else if (req.query.regionUid) {
        regionFilter = [{ "region.uid": { $eq: req.query.regionUid } }];
    } else if (req.query.className) {
        classNameFilter = [{ "className": { $eq: req.query.className } }];
    } else if (req.query.polygon) {

        let buf = JSON.parse(Buffer.from(req.query.polygon, 'base64').toString('utf8'));
        polygonFilter = [{
            "region.location.geometry": {
                $geoWithin: {
                    $geometry: buf.geometry  //if this region lies within given polygon or not
                }
            }
        }]
       
    }

    let getVector;
    try {
        getVector = await Vectors.aggregate([

            {
                $lookup: {
                    from: "regions",
                    localField: "region",
                    foreignField: "_id",
                    as: "region"
                }
            },
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
                $unwind: "$region"
            },
            {

                $match: {
                    $and: [
                        { uid: { $ne: null } },
                        ...vectorFilter,
                        ...ownerFilter,
                        ...regionFilter,
                        ...classNameFilter,
                        ...polygonFilter
                    ]
                }
            }
        ])

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
        getVector = parseVectors(getVector, req.query);
    return res.status(200).json(getVector);
}



module.exports = {
    createVector,
    updateVector,
    deleteVector,
    getVector
}