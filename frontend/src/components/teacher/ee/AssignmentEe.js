import React, { useState, useRef } from 'react';
import { useEffect,useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Context } from '../../../context';
import { toast } from "react-toastify";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import download from 'downloadjs';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { API_URL } from '../constants';
import Navbar from './EeTeacherNav'
import SubmittedAsByStudentEe from './SubmittedAsByStudentEe';
import Contact from '../../home/Contact';
import { Example } from '../THome';
import Footer from '../../home/Footer';
const AssignmentEe = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [filesList, setFilesList] = useState([]);

  const navigate = useNavigate();
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
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
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
          await axios.post(`${API_URL}/uploadeeass`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // props.history.push('/list');
          toast.success('Assignment added successfully');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      // HTTP request failed
      console.error(error);
      error && toast.error('Error while adding Assignment. Try again later');
    }
  };

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAlleeass`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/downloadeeas/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  //deleting materials
  const deleteFileeeass = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteFileeeass/${id}`);
      setFilesList(filesList.filter((file) => file._id !== id));
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Error while deleting file. Try again later');
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex justify-between">
      <div className="container mx-auto py-4 grid grid-cols-3 gap-4 h-screen">
        <div>
          <h2 className='text-center font-bold text-xl mb-6 mt-4 border-4 border-blue-500 p-4'>Upload Assignments</h2>
      <div className="col border-4 border-gray-500 p-4">
  <Form className="search-form" onSubmit={handleOnSubmit}>
    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    <Row className="mb-3">
      <Col>
        <Form.Group controlId="title">
          <Form.Label className="block mb-2 font-bold text-gray-700">Assignment Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={state.title}
            placeholder="Enter assignment title"
            onChange={handleInputChange}
            className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full focus:ring-2 focus:ring-blue-600"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Form.Group controlId="description">
          <Form.Label className="block mb-2 font-bold text-gray-700">Assignment Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={state.description}
            placeholder="Enter assignment description"
            rows={3}
            onChange={handleInputChange}
            className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full focus:ring-2 focus:ring-blue-600"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Dropzone
          onDrop={onDrop}
          onDragEnter={() => updateBorder('over')}
          onDragLeave={() => updateBorder('leave')}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="drop-zone flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-md w-full h-32"
              {...getRootProps()}
              ref={dropRef}
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">Drag and drop a file OR click here to select a file</p>
              {file && (
                <div className="mt-2">
                  <strong>Selected file:</strong> {file.name}
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </Col>
      <Col></Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Button
          variant="primary"
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </Button>
      </Col>
    </Row>
  </Form>
</div>
</div>
<div>
<h2 className='text-center font-bold text-xl mb-6 mt-4 border-4 border-blue-500 p-4'>Given Assignment</h2>

  <div className="col border-4 border-gray-500 p-4">
    <div className="bg-white shadow-md rounded my-6">
      <div className="flex flex-col py-4 px-6">
        {/* display component code here */}
        
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            <table className="table-auto w-full border-collapse border">
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Title</th>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Description</th>
                  <th className='px-4 py-2 text-center font-bold border'>Download Assignment</th>
                  <th className='px-4 py-2 text-center font-bold border'>Delete Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filesList.length > 0 ? (
                  filesList.map(
                    ({ _id, title, description, file_path, file_mimetype }) => (
                      <tr key={_id}>
                        <td className="px-4 py-2 border">{title}</td>
                        <td className="px-4 py-2 border">{description}</td>
                        <td className="px-4 py-2 text-center border">
                          <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline-blue'
                            onClick={() =>
                              downloadFile(_id, file_path, file_mimetype)
                            }
                          >
                            Download
                          </button>
                        </td>
                        <td className="px-4 py-2 text-center border">
                          <td className="px-4 py-2 text-center border">
                            <button
                              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"


                              onClick={() => deleteFileeeass(_id)}
                              >
                              Delete
                            </button>
                          </td>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3} className='bg-red-500 p-2 text-center text-white border'>
                      No files found. Please add some.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
         
      </div>
    </div>
  </div>
  </div>
  <div>
  <h2 className='text-center font-bold text-xl mb-6 mt-4 border-4 border-blue-500 p-4'>Assignment Submitted by Student</h2>

  <div className="col border-4 border-gray-500 p-4">
      <SubmittedAsByStudentEe />
    </div>
  </div>

  </div>
</div>
<div  className='h-screen'>
<Link to="/teacher/ee/uploadassignmentresult">
        <button className="py-3 mt-5 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Upload Assignment Result
        </button>
      </Link>
</div>
 <div><Example/></div>
<div><Contact/></div>
<div><Footer/></div>
    </div>
      
      
  );
};

export default AssignmentEe;