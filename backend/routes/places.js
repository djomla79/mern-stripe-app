const { Router } = require('express');
const {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
  getAllPlaces,
} = require('../controllers/places');
const router = Router();
const checkAuthToken = require('../middleware/auth-token');

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.get('/', getAllPlaces);

router.use(checkAuthToken);

router.patch('/:pid', updatePlaceById);

router.delete('/:pid', deletePlaceById);

router.post('/new', createPlace);

module.exports = router;
