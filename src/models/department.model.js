import mongoose from 'mongoose';

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
});


// Export the model
module.exports = mongoose.model('Department', DepartmentSchema);
