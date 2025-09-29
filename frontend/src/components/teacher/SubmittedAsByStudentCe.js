import { toast } from "react-toastify";
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from './constants';
import React, { useEffect, useState ,useContext} from "react";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import Navbar from "./TeachersNavbar"
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";


const SubmittedAsByStudentCe = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFilesca`);
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
      const result = await axios.get(`${API_URL}/downloadca/${id}`, {
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
    <div className='  bg-gray-300  rounded-md shadow-md'>
      <div className="">
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <table className=" text-left  border border-gray-300">
          <thead className='font-bold text-lg'>
            <tr>
              <th className='py-2 px-4 border'>Student Name</th>
              <th className='py-2 px-4 border'> Assignment Title</th>
              <th className='py-2 px-4 border'>Assignment Description</th>
              <th className='py-2 px-4 border'>Download Assignment</th>
              {/* <th className='py-2 border'>Delete File</th> */}
            </tr>
          </thead>
          <tbody className='divide-y'>
            {filesList.length > 0 ? (
              filesList.map(
                ({ _id, studname, title, description, file_path, file_mimetype }) => (
                  <tr key={_id} className='hover:bg-gray-100 transition-all'>
                    <td className="py-3 px-4 border">{studname}</td>
                    <td className="py-3 px-4 border">{title}</td>
                    <td className="py-3 px-4 border">{description}</td>
                    <td className="py-3 px-4 border">
                      <a
                        className='underline text-blue-600 cursor-pointer'
                        onClick={() => downloadFile(_id, file_path, file_mimetype)}
                      >
                        Download
                      </a>
                    </td>
                    {/* <td className="py-3 border"><MdDelete size={24} onClick={() => deleteFilece(_id)} /></td> */}
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={3} className='py-3 text-red-500 border'>
                  No files found. Please add some.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedAsByStudentCe;