const Place = require('../models/place');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places = [];

  try {
    places = await Place.find().where({ user: userId });
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  if (places.length === 0) {
    // return next(new HttpError('Places not found for selected user!', 404));
    return res.json({
      places: [],
    });
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError(err, 404));
  }

  if (!place) {
    return next(new HttpError('Place not found for selected id!', 404));
  }
  res.json(place.toObject({ getters: true }));
};

const createPlace = async (req, res, next) => {
  const { title, description, location, address } = req.body;
  const userId = req.userData.id;
  const place = new Place({
    title,
    description,
    location,
    address,
    user: userId,
  });

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Could not find user with provided id.', 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.save({ session });
    // push here is mongoose method which allows connection between
    // two models Place and User behind the scene, and then adds
    // place id to the reffered field in the User
    user.placeIds.push(place);
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  res.status(201).json({ place });
};

const updatePlaceById = async (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const filterById = { _id: placeId };
  const updateFields = { title, description };
  const userId = req.userData.id;
  let placeUpdate;
  let placeUserId;

  try {
    const checkPlace = await Place.findById(placeId);
    placeUserId = checkPlace.user.toString();
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  if (placeUserId !== userId) {
    return next(new HttpError('Authorization failed!', 401));
  }

  try {
    placeUpdate = await Place.findByIdAndUpdate(filterById, updateFields, {
      returnOriginal: false,
    });
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  res.status(200).json({ place: placeUpdate.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  const userId = req.userData.id;
  let place;

  try {
    place = await Place.findById(placeId).populate('user');
  } catch (err) {
    return next(new HttpError('Could not find place with provided id!', 401));
  }

  if (place.user.id !== userId) {
    return next(new HttpError('Authorization failed!', 401));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.deleteOne({ session });
    place.user.placeIds.pull(place);
    await place.user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError('Something went wrong, deleting failed!', 500));
  }
  res
    .status(200)
    .json({ success: `Place with id: ${placeId} successfully deleted!` });
};

const getAllPlaces = async (req, res, next) => {
  let places = [];
  try {
    places = await Place.find();
  } catch (err) {
    return next(new HttpError('There are no saved places at the moment!', 401));
  }
  res
    .status(200)
    .json({ places: places.map((p) => p.toObject({ getters: true })) });
};

module.exports = {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
  getAllPlaces,
};
