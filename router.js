var router = require('express').Router();
var videoController = require('./controllers/videoController');
var userController = require('./controllers/userController');
var jwt = require('jsonwebtoken');
var settings = require('./config/settings');
var uploader = require('./controllers/uploadController');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log(token)
        jwt.verify(token, settings.jwtTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get('/video/getAll', authenticateJWT, videoController.getAllVideo);
//router.get('/video/getAll', videoController.getAllVideo);
router.get('/video/getVideo/:id', authenticateJWT, videoController.getVideo);
router.post('/video/addVideo', authenticateJWT, videoController.addVideo);
router.put('/video/updVideo/:id', authenticateJWT, videoController.updVideo);
router.patch('/video/enableVideo/:id', authenticateJWT, videoController.enableVideo);
router.delete('/video/delVideo/:id', authenticateJWT, videoController.delVideo);
router.post('/video/imgUpload/:id', uploader.array('file', 2), authenticateJWT, videoController.uploadImg);

router.post('/user/add', userController.saveUser);
router.post('/user/login', userController.login);

module.exports = router;