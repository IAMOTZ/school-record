import courses from './seedCourses';
import lecturers from './seedLecturers';
import departments from './seedDepartments';

export default async () => {
  await Promise.all([courses(), lecturers(), departments()]);
};
