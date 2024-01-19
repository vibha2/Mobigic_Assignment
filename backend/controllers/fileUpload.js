const File = require('../models/File');

function generatePasscode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const uploadFile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const uploadedFile = req.files.file;
    const passcode = generatePasscode();
    //console.log("passcode=> ", passcode);

    const file = new File({
      name: uploadedFile.name,
      data: uploadedFile.data,
      passcode,
      userId
    });

    await file.save();

    res.status(201).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllUploadedFiles = async(req, res) => {
  try {
    const files = await File.find({ userId:req.params.userId });
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const downloadFile = async(req,res) => {
  try{
      // const {userId, passcode} = req.body;
      // //console.log("req body=> ", req.body);
      // //console.log("file in => ",req.params.fileId,passcode, userId );
      const passcode = req.params.passcode;
      const file= await File.findOne({ passcode });
      //console.log("file in controller=> ", file?.data);
      const fileData = file?.data;
      if(!file)
      {
        res.status(500).json({
          message: "Invalid Passcode"
        })
      }
      // res.set('Content-type', 'application/octet-stream');
      res.set('Content-Disposition', `attachment; filename=${file.name}`);
      res.send(file.data);

     
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteFile = async(req,res) => {
  try{
     
      const fileId = req.params.fileId;
      // //console.log("fileid and userid=> ", fileId, " ", );
      const file = await File.findOneAndDelete({_id: fileId});
      //console.log("file=> ",file);
      if(file){
        res.status(200).json({ message: 'File Deleted Successfully' });
      }
      else
      {
        res.status(500).json({ message: 'File Not Found' });

      }

  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



module.exports = {
  uploadFile,
  getAllUploadedFiles,
  downloadFile,
  deleteFile
};
