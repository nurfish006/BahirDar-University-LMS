
import React, { useState, useRef ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from './constants';
import Navbar from './TeachersNavbar'
import { Example } from './THome';
import Contact from '../home/Contact';
import Footer from '../home/Footer';

const Text = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');

  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();

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
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          setErrorMsg('');
          await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('Material added successfully');
          navigate("/teacher/ce/materials");
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      console.error(error);
      error && toast.error('Error while adding Assignment. Try again later');
    } 
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center py-6 h-screen">
        <div className="w-full max-w-md">
          <h2 className='text-center font-bold text-3xl mt-10 mb-7'>Upload course material</h2>
          <Form onSubmit={handleOnSubmit}>
            {errorMsg && <p className="text-red-500 my-4">{errorMsg}</p>}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Row>
                <Col>
                  <Form.Group controlId="title">
                    <Form.Label className="block text-gray-700 font-bold mb-2">Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={state.title || ''}
                      placeholder="Enter title"
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="description">
                    <Form.Label className="block text-gray-700 font-bold mb-2">Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={state.description || ''}
                      placeholder="Enter description"
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
                      <p className="text-gray-500 ">Drag and drop a file OR click here to select a file</p>
                      {file&& (
                        <div className="mt-4">
                          <strong>Selected file:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
                {/* {previewSrc ? (
                  isPreviewAvailable ? (
                    <div className="mt-4">
                      <img className="max-w-md" src={previewSrc} alt="Preview" />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="text-gray-500">No preview available for this file</p>
                    </div>
                  )
                ) : (
                  <div className="mt-4">
                    <p className="text-gray-500">Image preview will be shown here after selection</p>
                  </div>
                )} */}
              </div>
              <div className="flex items-center justify-between mt-8">
                <Button variant="primary" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Upload
                </Button>
                <Button variant="primary" type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Example/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Text;