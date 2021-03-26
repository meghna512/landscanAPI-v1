const router = require('express').Router();
const {setUser} = require('../middleware/user');
const {createRegion} = require('../controller/region/region');

//create region
router.post('/',setUser, createRegion);

// //fetch all region
// router.get('/', );

// //fetch single region
// router.get('/:regionUid', );

// //update region
// router.patch('/:regionUid', );

// //delete region
// router.delete('/:regionUid', );


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