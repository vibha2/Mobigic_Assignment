const File = require('../models/File');

const uploadFile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const uploadedFile = req.files.file;

    const file = new File({
      name: uploadedFile.name,
      data: uploadedFile.data,
    });

    await file.save();

    res.status(201).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  uploadFile,
};
