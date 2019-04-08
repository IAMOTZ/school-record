import Student from '../models/student.model';
import Department from '../models/department.model';


const createStudent = async (req, res) => {
  const { name, departmentId } = req.body;
  // @TODO: Add validation here
  // I need to validate if a student with this name does not exist already
  try {
    const chosenDepartment = await Department.findById(departmentId);
    if (chosenDepartment) {
      const student = await new Student({
        name, departmentId: chosenDepartment.id,
      }).save();
      chosenDepartment.students.push(student.id);
      await chosenDepartment.save();
      return res.status(201).json({ success: true, message: 'Student created successfully', data: student });
    }
    return res.status(400).json({ success: false, message: 'Chosen department does not exist' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error creating student' });
  }
};

const enrollStudents = async (req, res) => {
  // @TODO: Add more validation logic for studentname, courses, department
  // @TODO: Validate that this new course does not exist before
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).send('Rquired field missing'); // Make the error message more specific
  }
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ success: false, message: 'Student does not exist' });
    }
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


export default {
  enrollStudents,
  listStudents,
  createStudent,
};
