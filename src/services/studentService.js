import db from '../db';

const createStudent = async (data) => {
  const { name, departmentId } = data;
  const student = await db.student.createStudent({ name, departmentId });
  const department = await db.department.getDepartmentWithID(departmentId);
  await db.department.updateDepartment({
    departmentId,
    updateFields: { students: [...department.students, student.id] },
  });
  return student;
};

const enrollStudent = async (data) => {
  const { courseId, studentId } = data;
  const student = await db.student.getStudentWithId(studentId);
  const updatedStudent = await db.student.updateStudent({
    studentId,
    updateFields: { courses: [...student.courses, courseId] },
  });
  return updatedStudent;
};

const getStudents = async () => {
  const students = db.student.getAllStudents({ includeCourses: true });
  return students;
};

export default {
  createStudent,
  enrollStudent,
  getStudents,
};
