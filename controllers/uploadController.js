var fs = require('fs');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload_dir/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        // console.log(req.body.title);
    }    
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb (null, true);
    } else {
        cb (null, false);
    }
}

const uploader = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = uploader;