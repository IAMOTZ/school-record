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
        new Department({
          name: department.name,
        }).save((err) => {
          if (err) {
            console.log('Error seeding department: ', department.name);
          }
          console.log('Success seeding department: ', department.name);
        });
      }
    } catch (err) {
      console.log('Error seeding department: ', department.name);
    }
  });
};

export default seeder;
