//jshint esversion: 8
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const { resolve } = require('path');



//Create Storage Engine
const storage = new GridFsStorage({
    url: 'connectDB',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {

});
 





module.exports = router;

