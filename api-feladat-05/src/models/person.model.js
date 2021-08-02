const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    vaccine: {
        type: String,
        required: false
      }
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
