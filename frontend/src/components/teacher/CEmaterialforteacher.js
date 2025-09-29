import { toast } from "react-toastify";
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from './constants';
import React, { useEffect, useState ,useContext} from "react";
import Navbar from "./TeachersNavbar"
import { Link, useNavigate } from "react-router-dom";
import SubmittedAsByStudentCe from "./SubmittedAsByStudentCe";
import { Button } from 'react-bootstrap';
import { Example } from "./THome";
import Contact from "../home/Contact";
import Footer from "../home/Footer";
import { Context } from "../../context";

const CEmaterialforteacher = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [popup, setpopup] = useState("false")

  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  // delete files
  const deleteFilece = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteFilece/${id}`);
      setFilesList(filesList.filter((file) => file._id !== id));
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Error while deleting file. Try again later');
    }
  };

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
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
      const result = await axios.get(`${API_URL}/download/${id}`, {
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

  return (
    <div>
      <Navbar />
      <div className="b h-screen">
      <h2 className='text-center font-bold text-3xl mt-10 mb-7'>Uploaded  materials</h2>

      <div className="mt-3 mx-auto bg-gray-300 max-w-5xl rounded-lg p-6">
        <div className="">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <table className="table-auto w-full border">
            <thead className='text-lg font-semibold'>
              <tr className='bg-gray-200'>
                <th className='px-4 py-2 text-left border'>Title</th>
                <th className='px-4 py-2 text-left border'>Description</th>
                <th className='px-4 py-2 text-left border'>Download File</th>
                <th className='px-4 py-2 text-left border'>Delete File</th>
              </tr>
            </thead>
            <tbody>
              {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, title, description, file_path, file_mimetype }) => (
                    <tr key={_id} className='border-b border-gray-200'>
                      <td className="px-4 py-2 border">{title}</td>
                      <td className="px-4 py-2 border">{description}</td>
                      <td className='px-4 py-2 border'>
                        <a
                          className='underline text-blue-600 hover:text-blue-800'
                          href="#/"
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype)
                          }
                        >
                          Download
                        </a>
                      </td>
                      <td className='px-4 py-2 border'>
                        <button
                          onClick={() => deleteFilece(_id)}
                          className='text-red-500 hover:text-red-700  hover:bg-red-500 px-2 py-1 rounded focus:outline-none'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr className='border-b border-gray-200'>
                  <td colSpan={4} className='text-center py-4 text-gray-600'>
                    No files found. Please add some.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="primary" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link to="/teacher/ce/addcoursematerial">Add material</Link>
          </Button>
        </div>
      </div></div>
      <div><Example/></div>
      <div><Contact/></div>
      <div><Footer/></div>
    </div>
  );
};

export default CEmaterialforteacher;