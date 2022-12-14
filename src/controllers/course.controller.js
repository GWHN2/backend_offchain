const courseModel = require('../models/course.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');

const getAllCourses = asyncWrapper(async (req, res) => {
  const courses = await courseModel.find({});
  res.status(200).json({ status: 200, data: courses });
});

const createCourse = asyncWrapper(async (req, res) => {
  const course = await courseModel.create(req.body);
  res.status(200).json({
    status: 200,
    data: course,
  });
});

const getCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await courseModel.findOne({ _id: courseID });
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({
    status: 200,
    data: course,
  });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await courseModel.findOneAndUpdate(
    { _id: courseID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({
    status: 200,
    data: course,
  });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await courseModel.findOneAndDelete({ _id: courseID });
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({
    status: 200,
    data: course,
  });
});

module.exports = {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
