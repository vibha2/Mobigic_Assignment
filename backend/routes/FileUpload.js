const express = require("express");
const router = express.Router();


const {uploadFile} = require('../controllers/fileUpload');

// Route for file upload
router.post('/upload',uploadFile);


module.exports =  router;