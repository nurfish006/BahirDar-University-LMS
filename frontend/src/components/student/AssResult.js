import { toast } from "react-toastify";
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../teacher/constants';
import React, { useEffect, useState ,useContext} from "react";

import Navbar from "./StudentNavbar";
import { useNavigate } from "react-router-dom";
import Contact from "../home/Contact";
import Footer from "../home/Footer";
import { Context } from "../../context";

const AssResult = () => {
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
        const { data } = await axios.get(`${API_URL}/assresultce`);
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
      const result = await axios.get(`${API_URL}/downloadresult/${id}`, {
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
      <div className=' rounded-md shadow-md h-screen'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-2 text-center mt-10 '>Assignment Result</h2>
          {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
          <table className=' w-3/4 border border-gray-300 mx-auto'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border font-medium'>Assignment Title</th>
                <th className='py-2 px-4 border font-medium'>Assignment Description</th>
                <th className='py-2 px-4 border font-medium'>Download Result</th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {filesList.length > 0 ? (
                filesList.map(({ _id, studname, title, description, file_path, file_mimetype }) => (
                  <tr key={_id} className='hover:bg-gray-100 transition-all'>
                    <td className='py-3 px-4 border'>{title}</td>
                    <td className='py-3 px-4 border'>{description}</td>
                    <td className='py-3 px-4 border'>
                      <a
                        className='underline text-blue-600 cursor-pointer'
                        onClick={() => downloadFile(_id, file_path, file_mimetype)}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
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
      <Contact/>
      <Footer/>
    </div>
  );
};

export default AssResult;