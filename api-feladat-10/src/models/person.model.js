const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    vaccine: {
        vaccine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vaccine',
        },
        count: Number,
        required: false
      }
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
