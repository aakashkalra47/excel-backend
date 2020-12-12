const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: String,
  dateOfBirth: Date,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String
});

module.exports = mongoose.model('Candidate', CandidateSchema);
