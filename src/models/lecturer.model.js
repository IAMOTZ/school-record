import mongoose from 'mongoose';

const { Schema } = mongoose;

const LecturerSchema = new Schema({
  name: { type: String, required: true, max: 100 },
});


// Export the model
module.exports = mongoose.model('Lecturer', LecturerSchema);
