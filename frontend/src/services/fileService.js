import axios_api from "../axios/index";

const FileService = {

  fileUpload: async function (file, userId) {
    return axios_api.post("/file/upload/" + userId, file);
  },
  
  getFile: async function (userId) {
    return axios_api.get("/file/list/"+userId);
  },

  downloadFile: async function (passcode) {
    return axios_api.get("/file/download/"+passcode, {responseType: 'arraybuffer'});
  },
  
  deleteFile: async function(fileId, userId){
    return axios_api.delete("/file/delete/"+fileId, {userId: userId});
  }

};

export default FileService;
