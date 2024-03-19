
import Area from '../models/area.model.js';
import { errorHandler } from '../utils/error.js';

export const createArea = async (req, res, next) => {
  try {
    const area = await Area.create(req.body);
    return res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

export const deleteArea = async (req, res, next) => {
  const area = await Area.findById(req.params.id);

  if (!area) {
    return next(errorHandler(404, 'Area not found!'));
  }

  try {
    await area.findByIdAndDelete(req.params.id);
    res.status(200).json('Area has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateArea = async (req, res, next) => {
  const area = await Area.findById(req.params.id);
  if (area) {
    return next(errorHandler(404, 'Area not found!'));
  }
  try {
    const updatedArea = await Area.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedArea);
  } catch (error) {
    next(error);
  }
};

export const getArea = async (req, res, next) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return next(errorHandler(404, 'Area not found!'));
    }
    res.status(200).json(area);
  } catch (error) {
    next(error);
  }
};

export const getAllAreas = async (req, res, next) => {
  try {
    const area = await Area.find({});
    if (!area) {
      return next(errorHandler(404, 'Area not found!'));
    }
    res.status(200).json(Area);
  } catch (error) {
    next(error);
  }
};

