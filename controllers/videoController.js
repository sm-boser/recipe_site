var videoModel = require('../models/video');

exports.getAllVideo = (req, res) => {
    this.getAllVideoFn().then(vid => {
        if (vid.length > 0) {
            res.json(vid);
        } else {
            res.status(404).send({
                'success': false,
                'msg': 'No record found'
            })
        }
    }).catch(err => {
        res.status(500).send({
            'success': false,
            'msg': `Error: ${err}`
        })
    })
}

exports.getVideo = (req, res) => {
    let videoId = req.params.id;
    videoModel.find({ _id: videoId }, function (err, vid) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': 'Error'
            })
        } else {
            if (vid.length > 0) {
                res.json(vid);
            } else {
                res.status(404).send({
                    'success': false,
                    'msg': 'No record found'
                })
            }
        }
    })
}

exports.addVideo = (req, res) => {
    let video = new videoModel({
        title: req.body.title,
        url: req.body.url,
        desc: req.body.desc,
        meta: req.body.meta,
        key: req.body.key,
        serial: req.body.serial,
        img: req.body.img,
        status: req.body.status
    });

    videoModel.create(video, function (err, vid) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': 'Error'
            })
        } else {
            res.json({
                'success': true,
                'msg': `Record added successfully with id ${vid.id} and title ${req.body.title}`
            })
        }
    })
}

exports.updVideo = (req, res) => {
    let videoId = req.params.id;
    let video = ({
        title: req.body.title,
        url: req.body.url,
        desc: req.body.desc,
        meta: req.body.meta,
        key: req.body.key,
        serial: req.body.serial,
        // videoPrevImg: req.body.img,
        status: req.body.status,
        updated: new Date()
    });

    videoModel.updateOne({ _id: videoId }, video, function (err, vid) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': 'Error'
            })
        } else {
            res.json({
                'success': true,
                'msg': `Record updated successfully with id ${videoId} and title ${req.body.title}`
            })
        }
    })
}

exports.delVideo = (req, res) => {
    let videoId = req.params.id;
    videoModel.deleteOne({ _id: videoId }, function (err, vid) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': 'Error'
            })
        } else {
            res.status(200).send({
                'success': true,
                'msg': `Id ${videoId} Deleted`
            })
        }
    })
}

exports.enableVideo = (req, res) => {
    let videoId = req.params.id;
    let status = req.body.stat;

    videoModel.updateOne({ _id: videoId }, { status: status, updated: new Date() }, function (err, vid) {
        if (err) {
            res.status(500).send({
                'success': false,
                'msg': 'Error'
            })
        } else {
            res.status(200).send({
                'success': true,
                'msg': `Id ${videoId} Status Updated to ${status}`
            })
        }
    })
}

exports.getAllVideoFn = () => {
    return new Promise((resolve, reject) => {
        videoModel.find(function (err, vid) {
            if (err) {
                reject(err)
            } else {
                resolve(vid)
            }
        }).sort({ 'serial': 'asc' })
    })

    // return null
}

exports.uploadImg = (req, res) => {
    if (req.files && req.files.length > 0 && req.files[0].originalname) {
        let videoId = req.params.id;
        let imageName = req.files[0].originalname;
        videoModel.updateOne({ _id: videoId }, { img: imageName, updated: new Date() }, function (err, vid) {
            if (err) {
                res.status(500).send({
                    'success': false,
                    'msg': 'Error'
                })
            } else {
                res.status(200).send({
                    'success': true,
                    'msg': `${imageName} uploaded for Id ${videoId}`
                })
            }
        })
    }
}