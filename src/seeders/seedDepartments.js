import Department from '../models/department.model';
import logger from '../logger';

const departments = [
  {
    name: 'Computer Science',
    lecturers: [
      { name: 'Tunmise' },
      { name: 'Osifo' },
    ],
  },
  {
    name: 'Bio Tech',
    lecturers: [
      { name: 'Demola' },
      { name: 'Seni' },
    ],
  },
];

const seedDepartment = async (department) => {
  try {
    const { name, lecturers } = department;
    const result = await Department.findOne({ name });
    if (!result) {
      await new Department({ name, lecturers }).save();
      logger.info('Success seeding department: ', department.name);
    }
  } catch (err) {
    logger.error('Error seeding department: ', department.name);
  }
};

export default async () => {
  const seedArray = [];
  departments.forEach(department => seedArray.push(seedDepartment(department)));
  await Promise.all(seedArray);
};
