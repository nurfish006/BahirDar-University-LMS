import React, { useState, useRef ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from '../teacher/constants';
import Navbar from './StudentNavbar';
import { Example } from './logedinstudent/HomeL';
import Footer from '../home/Footer';

const SubmitAss = (props) => {

  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
  const [file, setFile] = useState(null); // state for storing actual image
  // const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: '',
    studname: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  // const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    // setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.classList.add('border-green-500', 'border-2');
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.classList.add('border-green-500', 'border-2');
    } else if (dragState === 'leave') {
      dropRef.current.classList.remove('border-green-500', 'border-2');
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { studname, title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('studname', studname);
          formData.append('title', title);
          formData.append('description', description);


          setErrorMsg('');
          await axios.post(`${API_URL}/cesubmitass`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('assignment submitted successfully');
          navigate("/student/ce/assignment");
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      console.error(error);
      error && toast.error('Error while Submitting Assignment. Try again later');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-6 h-screen">

        <div className="w-full max-w-md h-screen">
          <h2 className="text-black text-xl font-bold text-center my-6">Submit your Assignment here</h2>
          <Form className="bg-white p-6 rounded-lg" onSubmit={handleOnSubmit}>
            {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}


            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Row className="mb-4">
                <Col>
                  <Form.Label className="block text-gray-700 font-bold mb-2">Student Name</Form.Label>
                  <Form.Group controlId="studname">
                    <Form.Control
                      type="text"
                      name="studname"
                      value={state.studname || ''}
                      placeholder="Enter Student Name"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Label className="block text-gray-700 font-bold mb-2">Assignment Title
                  </Form.Label>
                  <Form.Group controlId="title">
                    <Form.Control
                      type="text"
                      name="title"
                      value={state.title || ''}
                      placeholder="Enter  Aignment Title"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Label className="block text-gray-700 font-bold mb-2">Assignment Description</Form.Label>
                  <Form.Group controlId="description">
                    <Form.Control
                      type="text"
                      name="description"
                      value={state.description || ''}
                      placeholder="Enter  Assignment Description"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="upload-section p-6 mt-8 border-dashed border-2 border-gray-600">
                <Dropzone
                  onDrop={onDrop}
                  onDragEnter={() => updateBorder('over')}
                  onDragLeave={() => updateBorder('leave')}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                      <input {...getInputProps()} />
                      <p className="text-gray-500">Drag and drop a file OR click here to select a file</p>
                      {file && (
                        <div className="mt-2">
                          <strong>Selected file:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
                {/* {previewSrc ? (
              isPreviewAvailable ? (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )} */}
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit" className="py-2 mt-5 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div><Example /></div>
      <div><Footer /></div>
    </div>
  );
};

export default SubmitAss;