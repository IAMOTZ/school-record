import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  courses: [{ type: mongoose.Schema.Types.ObjectId }],
});


// Export the model
module.exports = mongoose.model('Student', StudentSchema);
