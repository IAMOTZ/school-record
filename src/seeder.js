import db from './db';
import utils from './utils';

const { logger } = utils;

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
    const result = await db.department.getDepartmentWithName(name);
    if (!result) {
      await db.department.createDepartment({ name, lecturers });
      logger.info('Success seeding department: ', department.name);
    } else {
      logger.info(department.name, ' department already seeded.');
    }
  } catch (err) {
    logger.error('Error seeding department: ', department.name, ' ', err);
  }
};

export default async () => {
  const seedArray = [];
  departments.forEach(department => seedArray.push(seedDepartment(department)));
  await Promise.all(seedArray);
};
