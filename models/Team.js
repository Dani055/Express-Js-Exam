const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const teamSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref:"User" }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;