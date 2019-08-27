import utils from '../../../utils';
import db from '../db';

const { logger } = utils;

const getDepartments = async (req, res) => {
  try {
    const departments = await db.department.getAllDepartments({ includeStudents: true });
    logger.info('Successfully fetched all departments info from DB');
    return res.status(200).json({ success: true, data: departments });
  } catch (err) {
    logger.error('Error executing get departments controller: ', err);
    return res.status(500).json({ success: false, message: 'There was an error getting all departments' });
  }
};

export default {
  getDepartments,
};
