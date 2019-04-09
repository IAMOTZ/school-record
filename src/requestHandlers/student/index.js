import Student from '../../models/student.model';
import helpers from './helpers';

const createStudent = async (req, res) => {
  const { name } = req.body;
  const { department } = res.locals;
  try {
    const student = await new Student({
      name, departmentId: department.id,
    }).save();
    department.students.push(student.id);
    await department.save();
    return res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error creating student' });
  }
};

const enrollStudent = async (req, res) => {
  const { courseId } = req.body;
  const { student } = res.locals;
  try {
    student.courses.push(courseId);
    await student.save();
    return res.status(200).json({ success: true, message: 'Student enrolled' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error enrolling student' });
  }
};

const listStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching all students' });
  }
};

const { validation } = helpers;

export default {
  createStudent: [...validation.createStudent, createStudent],
  enrollStudent: [...validation.enrollStudent, enrollStudent],
  listStudents,
};
