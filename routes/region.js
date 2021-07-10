const router = require('express').Router();
const {setUser} = require('../middleware/user');
const {createRegion, updateRegion, deleteRegion, getRegion} = require('../controller/region/region');
const {checkRegion, checkVector } = require('../middleware/region');
const {createVector, updateVector, deleteVector, getVector} = require('../controller/vector/vector');

router.use(setUser);


//create region
router.post('/', createRegion);

//fetch all region
router.get('/', getRegion);

//fetch single vector in a region
router.get('/vector', getVector );

//fetch single region
router.get('/:regionUid', checkRegion, getRegion);

//update region
router.patch('/:regionUid', checkRegion, updateRegion);

//delete region
router.delete('/:regionUid', checkRegion, deleteRegion);


//create a vector in a region
router.post('/:regionUid/vector', checkRegion ,createVector);

//update vector in a region
router.patch('/:regionUid/vector/:vectorUid', checkRegion, checkVector, updateVector);

//delete vector
router.delete('/:regionUid/vector/:vectorUid', checkRegion, checkVector, deleteVector);

module.exports = router;