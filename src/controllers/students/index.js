import Student from '../../models/student.model';
import helpers from './helpers';
import logger from '../../logger';

const createStudent = async (req, res) => {
  const { name } = req.body;
  const { department } = res.locals;
  try {
    logger.info('Creating a new student');
    const student = await new Student({
      name, departmentId: department.id,
    }).save();
    department.students.push(student.id);
    logger.info('Saving the new student');
    await department.save();
    return res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (err) {
    logger.error('Error executing create student controller: ', err);
    return res.status(500).json({ success: false, message: 'Error creating student' });
  }
};

const enrollStudent = async (req, res) => {
  const { courseId } = req.body;
  const { student } = res.locals;
  try {
    logger.info('Adding a new course into the student list of courses');
    student.courses.push(courseId);
    logger.info('Save the updated student info');
    await student.save();
    return res.status(200).json({ success: true, message: 'Student enrolled' });
  } catch (err) {
    logger.error('Error executing enroll student controller: ', err);
    return res.status(500).json({ success: false, message: 'Error enrolling student' });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    logger.info('Successfully fetched all students info from DB');
    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    logger.error('Error executing get students controller: ', err);
    return res.status(500).json({ success: false, message: 'Error fetching all students' });
  }
};

const { validation } = helpers;

export default {
  createStudent: [...validation.createStudent, createStudent],
  enrollStudent: [...validation.enrollStudent, enrollStudent],
  getStudents,
};
