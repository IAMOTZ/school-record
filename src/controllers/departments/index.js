import Department from '../../models/department.model';
import logger from '../../logger';

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('students');
    logger.info('Successfully fetched all departments info from DB');
    return res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    logger.error('Error executing get departments controller: ', err);
    return res.status(500).json({
      success: false,
      message: 'There was an error getting all departments',
    });
  }
};

export default getDepartments;
