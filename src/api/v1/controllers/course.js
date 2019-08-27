import utils from '../../../utils';
import courseValidation from '../validations/course';
import db from '../db';

const { logger } = utils;

const createCourse = async (req, res) => {
  const { name, departmentId } = req.body;
  try {
    logger.info('Creating a new course');
    const course = await db.course.createCourse({ name, departmentId });
    const department = await db.department.getDepartmentWithID(departmentId);
    department.courses.push(course.id);
    await db.department.updateDepartment({ departmentId, updateFields: department });
    return res.status(201).json({ success: true, message: 'Course created successfully', data: course });
  } catch (err) {
    logger.error('Error executing create course controller: ', err);
    return res.status(500).json({ success: false, message: 'There was an error creating a course' });
  }
};

export default { createCourse: [...courseValidation.createCourse, createCourse] };
