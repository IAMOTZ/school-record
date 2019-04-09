import student from './student';
import course from './course';
import getDepartments from './department';
import query from './query';

export default {
  createStudent: student.createStudent,
  enrollStudent: student.enrollStudent,
  listStudents: student.listStudents,
  createCourse: course.createCourse,
  listDepartments: getDepartments,
  query,
};
