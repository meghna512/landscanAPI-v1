const shortid = require('shortid');
const Regions = require('../../models/region');


const createRegion = async (req, res) =>{
    const newRegion = new Regions();
    newRegion.uid = shortid.generate();
    newRegion.name = req.body.name;
    newRegion.description = req.body.description;
    newRegion.location = req.body.location;
    newRegion.owner = req.user;
    try{
        await newRegion.save();
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    return res.status(201).json({newRegion});
}

module.exports= {
    createRegion
};