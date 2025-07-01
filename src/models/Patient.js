// models/Patient.js
import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  medication: String,
  dosage: String,
  frequency: String,
}, { _id: false });

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: [String],
  allergies: [String],
  prescriptions: [prescriptionSchema],
}, {
  timestamps: true,
});

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
