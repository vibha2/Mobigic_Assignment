import React, { useEffect, useState } from 'react';
import './profile.css';
import { useParams } from 'react-router-dom';
import FileService from '../../../services/fileService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile(){
  
  const { userId } = useParams();
  const [fileData, setFileData] = useState([]);
  const [show, setShow] = useState(false);
  const [passcode, setPasscode] = useState(-1);
  const [fileId, setFileId] = useState(0);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  useEffect(() => {
    //console.log("userId profile=> ",userId);
    FileService.getFile(userId).then(
      (res) => {
        //console.log("response =>", res);
        const data = res?.data;
        //console.log("type of file url=> ", data[0].data);
        //console.log("file url=> ", data);
        setFileData(data);
        
      },
      (err) => {
        //console.log("err =>", err);
      }
    );
  },[userId]);

  function handleSubmitPasscode(){
    FileService.downloadFile(passcode).then(
      (res) => {
        //console.log("response=> ",res);
        if (res) {
          const blob = new Blob([res]);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
         
          
        }
      },
      (err) => {
        //console.log("err =>", err);
      }
    )

    handleClose();
    toast.success("Downloaded Successfully");
  }

  const handleDownload = (fileId, fileName) => {
    setFileId(fileId);
    setFileName(fileName);
    handleShow();

  };

  const handleDelete = (fileId) =>{
    FileService.deleteFile(fileId, userId).then(
      (res) => {
        //console.log("response=> ",res);
        const filterFiledata = fileData.filter(x => x._id != fileId);

        setFileData(filterFiledata);
        toast.success("Deleted successfully");
      },
      (err) => {
        //console.log("err =>", err);
      }
    )
  }
  
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className='profileWrapper'>
        <h4>List of files</h4>
        <div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Filename</th>
      <th scope="col">Passcode</th>
      <th scope="col">Download</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
        <tbody>
        {
          fileData.map((data, index)=> (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.passcode}</td>
              <td><button onClick={()=> handleDownload(data._id, data.name)}>Download</button></td>
              <td><button onClick={()=> handleDelete(data._id)}>Delete</button></td>
          </tr>
          ))
        }
         
         
        </tbody>
        </table>
        </div>

        <div>
           <button onClick={handleBack}>Back</button>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Passcode Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Enter passcode to download the file</label>
          <input type="number" required onChange={(event)=> setPasscode(event.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitPasscode}>
            Submit & Download
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default Profile