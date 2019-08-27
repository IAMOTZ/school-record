// For implementing properties and methods common to all models.
export default class BaseModel {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.validateDatabaseID = this.validateDatabaseID.bind(this);
  }

  validateDatabaseID(id) {
    return this.mongoose.Types.ObjectId.isValid(id);
  }
}
