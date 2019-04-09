import Department from '../../models/department.model';

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('students');
    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'There was an error getting all departments',
    });
  }
};

export default getDepartments;
