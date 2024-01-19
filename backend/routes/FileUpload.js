const express = require("express");
const router = express.Router();


const {uploadFile,getAllUploadedFiles, downloadFile, deleteFile } = require('../controllers/fileUpload');

// Route for file upload
router.post('/upload/:userId',uploadFile);
router.get('/list/:userId', getAllUploadedFiles);
router.get('/download/:passcode', downloadFile);
router.delete('/delete/:fileId',deleteFile);



module.exports =  router;