import Course from '../models/course.model';

const courses = [
  { name: 'Computer Science 101', department: 'Computer Science' },
  { name: 'Bio Science 202', department: 'Bio Tech' },
];

const seeder = () => {
  courses.forEach(async (course) => {
    try {
      const result = await Course.findOne({ name: course.name });
      if (!result) {
        new Course({
          name: course.name,
          department: course.department,
        }).save((err) => {
          if (err) {
            console.log('Error seeding course: ', course.name);
          }
          console.log('Success seeding course: ', course.name);
        });
      }
    } catch (err) {
      console.log('Error seeding course: ', course.name);
    }
  });
};

export default seeder;
