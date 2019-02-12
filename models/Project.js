const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const projectSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    description: { type: mongoose.Schema.Types.String, required:true},
    team: { type: mongoose.Schema.Types.ObjectId, ref:"Team" }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;