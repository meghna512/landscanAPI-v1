const router = require('express').Router();
const {setUser} = require('../middleware/user');
const {createRegion, updateRegion, deleteRegion, getRegion} = require('../controller/region/region');
const { checkRegion } = require('../middleware/region');

router.use(setUser);


//create region
router.post('/', createRegion);

//fetch all region
router.get('/', getRegion);

//fetch single region
router.get('/:regionUid', checkRegion, getRegion);

//update region
router.patch('/:regionUid', checkRegion, updateRegion);

//delete region
router.delete('/:regionUid', checkRegion, deleteRegion);


// //create a vector in a region
// router.post('/:regionUid/vector', );

// //fetch all vectors in a region
// router.get('/:regionUid/vector/', );

// //fetch single vector in a region
// router.get('/:regionUid/vector/:vectorUid', );

// //update vector in a region
// router.patch('/:regionUid/vector/:vectorUid', );

// //delete vector
// router.delete('/:regionUid/vector/:vectorUid', );

module.exports = router;