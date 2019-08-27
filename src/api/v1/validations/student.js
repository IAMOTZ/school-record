import { body, validationResult, param } from 'express-validator/check';
import utils from '../../../utils';
import db from '../db';

const { logger } = utils;

const validation = {
  createStudent: [
    body('name', 'name is not valid')
      .isAlpha().isLength({ min: 2, max: 30 }), // Assume we are just taking first name alone
    body('departmentId', 'departmentId is not valid')
      .isString().custom(db.student.validateDatabaseID),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          messge: 'Invalid fields',
          errors: errors.array(),
        });
      }
      return next();
    },
    async (req, res, next) => {
      try {
        const { name, departmentId } = req.body;
        const student = await db.course.getCourseWithName(name);
        logger.info('Checking if a student with the given name already exist');
        if (student) {
          return res.status(400).json({
            success: false,
            message: 'Student with this name already exist',
          });
        }
        const department = await db.department.getDepartmentWithID(departmentId);
        logger.info('Checking if the chosen department exist');
        if (!department) {
          return res.status(400).json({
            success: false,
            message: 'Chosen department does not exist',
          });
        }
        return next();
      } catch (err) {
        logger.error('Error validating student details: ', err);
        return res.status(500).json({ success: false, message: 'Error creating student' });
      }
    },
  ],
  enrollStudent: [
    param('studentId', 'student ID is not valid')
      .isString().custom(db.student.validateDatabaseID),
    body('courseId', 'courseId is not valid')
      .isString().custom(db.student.validateDatabaseID),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          messge: 'Invalid fields',
          errors: errors.array(),
        });
      }
      return next();
    },
    async (req, res, next) => {
      try {
        const studentId = req.body.studentId || req.params.studentId;
        const { courseId } = req.body;
        const student = await db.student.getStudentWithId(studentId);
        logger.info('Checking if the given student exist');
        if (!student) {
          return res.status(400).json({
            success: false,
            message: 'Student does not exist',
          });
        }
        const course = await db.course.getCourseWithId(courseId);
        logger.info('Checking if the given course exist');
        if (!course) {
          return res.status(400).json({
            success: false,
            message: 'Course does not exist',
          });
        }
        return next();
      } catch (err) {
        logger.error('Error validating student details: ', err);
        return res.status(500).json({ success: false, message: 'Error enrolling student' });
      }
    },
  ],
};

export default validation;
