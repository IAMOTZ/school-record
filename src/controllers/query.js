import Department from '../models/department.model';
import Student from '../models/student.model';
import logger from '../logger';


export default async (req, res) => {
  try {
    const department = await Department.findOne({ name: 'Computer Science' });
    logger.info('Successfully fetched all departments info from DB');
    const queryString = department.courses.map(courseId => ({ courses: courseId }));
    const result = await Student.find({ $or: queryString });
    logger.info('Successfully fetched all students info from DB');
    res.status(200).json({
      success: true,
      message: 'All students taking courses from computer science department',
      data: result,
    });
  } catch (err) {
    logger.error('Error executing query controller: ', err);
    res.status(500).json({
      success: false,
      message: 'Error getting all students taking one course from computer science department',
    });
  }
};
