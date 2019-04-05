import Lecturer from '../models/lecturer.model';

const lecturers = [
  { name: 'Tunmise', department: 'Computer Science' },
  { name: 'Osifo', department: 'Bio Tech' },
];

const seeder = () => {
  lecturers.forEach(async (lecturer) => {
    try {
      const result = await Lecturer.findOne({ name: lecturer.name });
      if (!result) {
        const lec = new Lecturer({
          name: lecturer.name,
          department: lecturer.department,
        });
        lec.save((err) => {
          if (err) {
            console.log('Error seeding course: ', lecturer.name);
          }
          console.log('Success seeding course: ', lecturer.name);
        });
      }
    } catch (err) {
      console.log('Error seeding course: ', lecturer.name);
    }
  });
};

export default seeder;
