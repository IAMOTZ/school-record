import utils from '../../../utils';
import db from '../db';
import studentValidation from '../validations/student';

const { logger } = utils;

const createStudent = async (req, res) => {
  const { name, departmentId } = req.body;
  try {
    logger.info('Creating a new student');

    const student = await db.student.createStudent({ name, departmentId });
    const department = await db.department.getDepartmentWithID(departmentId);
    await db.department.updateDepartment({
      departmentId,
      updateFields: { students: [...department.students, student.id] },
    });
    return res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (err) {
    logger.error('Error executing create student controller: ', err);
    return res.status(500).json({ success: false, message: 'Error creating student' });
  }
};

const getStudents = async (req, res) => {
  try {
    logger.info('Getting all students info from DB');
    const students = await db.student.getAllStudents({ includeCourses: true });
    return res.status(200).json({ success: true, data: students });
  } catch (err) {
    logger.error('Error executing get students controller: ', err);
    return res.status(500).json({ success: false, message: 'Error fetching all students' });
  }
};

const enrollStudent = async (req, res) => {
  const studentId = req.body.studentId || req.params.studentId;
  const { courseId } = req.body;
  try {
    logger.info('Enrolling a student for a courses');
    const student = await db.student.getStudentWithId(studentId);
    await db.student.updateStudent({
      studentId,
      updateFields: { courses: [...student.courses, courseId] },
    });
    return res.status(200).json({ success: true, message: 'Student enrolled' });
  } catch (err) {
    logger.error('Error executing enroll student controller: ', err);
    return res.status(500).json({ success: false, message: 'Error enrolling student' });
  }
};


export default {
  createStudent: [...studentValidation.createStudent, createStudent],
  enrollStudent: [...studentValidation.enrollStudent, enrollStudent],
  getStudents,
};
