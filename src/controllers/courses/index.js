import Course from '../../models/course.model';
import helpers from './helpers';
import logger from '../../logger';

const createCourse = async (req, res) => {
  const { name, departmentId } = req.body;
  const { department } = res.locals;
  try {
    logger.info('Creating a new course');
    const course = await new Course({ name, departmentId }).save();
    department.courses.push(course.id);
    logger.info('Saving the new course');
    await department.save();
    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (err) {
    logger.error('Error executing create course controller: ', err);
    return res.status(500).json({
      success: false,
      message: 'There was an error getting all departments',
    });
  }
};

const { validation } = helpers;
export default { createCourse: [...validation.createCourse, createCourse] };
