import React, { useState, useRef ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from './constants';
import Navbar from './TeachersNavbar';
import { Context } from '../../context';
import Footer from '../home/Footer';
import Contact from '../home/Contact';

const UploadassResult = (props) => {
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);


  const [file, setFile] = useState(null); // state for storing actual image
  // const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: '',
   
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
      const {  title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
      
          formData.append('title', title);
          formData.append('description', description);


          setErrorMsg('');
          await axios.post(`${API_URL}/uploadresultce`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('Result uploaded successfully');
          navigate("/teacher/ce/assignment");
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

        <div className="w-full max-w-md">
          <h2 className="text-black text-xl font-bold text-center my-6">Upload Assignment Result   </h2>
          <Form className="bg-white p-6 rounded-lg" onSubmit={handleOnSubmit}>
            {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}


            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
             
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
               
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit" className="py-2 mt-5 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Upload
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Contact/>
      <div><Footer /></div>
    </div>
  );
};

export default UploadassResult;