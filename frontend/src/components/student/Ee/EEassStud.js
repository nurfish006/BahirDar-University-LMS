import React, { Component, useEffect, useState,useContext} from "react";
import { MdDelete } from 'react-icons/md'
import { Context } from "../../../context";
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import StudentNavbar from "./StudentNavbar"
import { useNavigate,Link } from "react-router-dom";
import { API_URL } from "../../teacher/constants";
import download from 'downloadjs';
import { Example } from '../logedinstudent/HomeL';
import Footer from '../../home/Footer';

export default function EEassStud() {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
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
      const result = await axios.get(`${API_URL}/downloadeeass/${id}`, {
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
    <StudentNavbar/>
    <div className=" h-screen">
    <div className='mt-10 mx-auto max-w-7xl '>
    <div className='bg-white shadow-md rounded my-6'>
      <h2 className="text-xl font-bold py-4 px-6 border-b border-gray-200">Given Assignment</h2>
      <div className='flex flex-col py-4 px-6'>
              {errorMsg && <p className="text-red-600">{errorMsg}</p>}
              <table className="table-auto w-full border-collapse border">
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Title</th>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Description</th>
                  <th className='px-4 py-2 text-center font-bold border'>Download Assignment</th>
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
<div className='flex flex-row py-4 px-6  ml-28'>
      <Link
        to='/student/ee/submitassignment'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline-blue mr-2'
      >
        Submit Your Assignment
      </Link>
      <Link
        to='/student/ee/assignmentresult'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline-blue'
      >
        Assignment Result
      </Link>
    </div>
</div>
<div><Example/></div>
<div><Footer/></div>
</div>
);
};
