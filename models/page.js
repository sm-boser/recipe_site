var monngoose = require('mongoose');

var pageSchema = monngoose.Schema({
    pageTitle: String,
    pageUrl: String,
    pageContent: String,
    pageSerial: Number,
    pageMeta: String,
    pageKey: String,
    pageStatus: {type: Boolean, default: true },
    pageCreated: {type: Date, default: Date.now},
    pageModified: {type: Date, default: Date.now}
}, {collection: 'pages'});

var Page = monngoose.model('Page', pageSchema);
module.exports = Page;