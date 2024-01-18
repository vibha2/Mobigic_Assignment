import axios_api from "../axios/index";

const FileService = {

  fileUpload: async function (file) {
    return axios_api.post("/file/upload/", file);
  },


};

export default FileService;
