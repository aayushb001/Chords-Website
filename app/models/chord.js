var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChordSchema   = new Schema({
    sheetname: String,
    author: String,
    chordsstring: String,
    viewstatus: String,
    sheetversion: String,
    datetime: String
});

module.exports = mongoose.model('Chord', ChordSchema);