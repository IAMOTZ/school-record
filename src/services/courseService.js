import db from '../db';

const createCourse = async (data) => {
  const { name, departmentId } = data;
  const course = await db.course.createCourse({ name, departmentId });
  const department = await db.department.getDepartmentWithID(departmentId);
  department.courses.push(course.id);
  await db.department.updateDepartment({ departmentId, updateFields: department });
  return course;
};

export default {
  createCourse,
};
