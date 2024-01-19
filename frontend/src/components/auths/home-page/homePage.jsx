import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/authService";
import './homePage.css';
import FileService from "../../../services/fileService";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  
   useEffect(() => {
    AuthService.getUserById(userId).then(
      (res) => {
        //console.log("user =>", res.data.user);
        setUser(res.data.user);
      },
      (err) => {
        //console.log("err =>", err);
      }
    );
  }, [userId]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    if(!selectedFile)
    {
      toast.error("Please Upload the file");
    }
    // Make an API request to your Node.js server to handle file upload
    FileService.fileUpload(formData, userId)
      .then(data =>{ 
        //console.log("file uploaded =>",data)
      }
      )
      .catch(error => console.error(error));
  };

  
  return (
    <div className="homepage-container">
      <div class="image-container">
        <p className="greet-text">
          <span className="greet-welcome">Hey</span> {user?.firstName},<span className="greet-welcome">{"    "}welcome to File Uploader</span> 
        </p>
        
         <div className="form-container">
         <form >
          <div class="form-group">
            <label for="email" style={{color:"white"}}>Upload File here:</label>
            <input type="file" class="form-control" onChange={handleFileChange} />
          </div>

          <button onClick={handleFileUpload} style={{backgroundColor:"white"}} class="btn btn-default">Upload File</button>
         </form>
         </div>
        
      </div>
          
        
    </div>
  )
}

export default HomePage