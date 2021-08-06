var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    title: String,
    url: String,
    desc: String,
    meta: String,
    key: String,
    serial: Number,
    img: String,
    status: {type: Boolean, default: true},
    created: {type: Date, default: Date.now },
    updated: {type: Date, default: Date.now }
}, {collection: 'videos'})

var Video = mongoose.model('Video', videoSchema);
module.exports = Video;