import courses from './seedCourses';
import lecturers from './seedLecturers';

export default async () => {
  await Promise.all([courses(), lecturers()]);
};
