import Department from '../models/department.model';

const departments = [
  { name: 'Computer Science' },
  { name: 'Bio Tech' },
];

const seeder = () => {
  departments.forEach(async (department) => {
    try {
      const result = await Department.findOne({ name: department.name });
      if (!result) {
        const lec = new Department({
          name: department.name,
        });
        lec.save((err) => {
          if (err) {
            console.log('Error seeding course: ', department.name);
          }
          console.log('Success seeding course: ', department.name);
        });
      }
    } catch (err) {
      console.log('Error seeding course: ', department.name);
    }
  });
};

export default seeder;
