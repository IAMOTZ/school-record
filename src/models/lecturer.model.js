import mongoose from 'mongoose';

const { Schema } = mongoose;

const LecturerSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Lecturer', LecturerSchema);
