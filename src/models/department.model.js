import mongoose from 'mongoose';

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  lecturers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' }],
});


// Export the model
module.exports = mongoose.model('Department', DepartmentSchema);
