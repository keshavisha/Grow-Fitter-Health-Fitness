import mongoose from 'mongoose'

const GrievanceSchema = new mongoose.Schema({
      
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },

  grievance: {
    type: String,
    required:true
  }
});

const Grievance = mongoose.model('Grievances', GrievanceSchema);

export default Grievance;
