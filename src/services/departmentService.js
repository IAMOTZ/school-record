import db from '../db';

const getDepartments = async () => {
  const departments = await db.department.getAllDepartments({ includeStudents: true });
  return departments;
};

export default {
  getDepartments,
};
