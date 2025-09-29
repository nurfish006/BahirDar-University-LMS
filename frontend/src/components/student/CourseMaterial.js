import React, { useState, useEffect ,useContext} from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../teacher/constants';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import StudentNavbar from './StudentNavbar';
import { Example } from './logedinstudent/HomeL';
import Footer from '../home/Footer';

const CourseMaterial = () => {
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
    <>
      <StudentNavbar />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-screen">
      <h2 className="text-black text-xl font-bold text-center my-6">Download the course materials you want</h2>
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {filesList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="mt-4 table-auto min-w-full divide-y divide-gray-200 border-collapse border">
                  <thead className='bg-gray-100 text-xl'>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs uppercase tracking-wider font-bold text-black border">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border">
                        Download File
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filesList.map(
                      ({ _id, title, description, file_path, file_mimetype }) => (
                        <tr key={_id}>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <div className="text-sm font-medium text-gray-900">
                              {title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <div className="text-sm text-gray-500">
                              {description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border">
                            <a
                              href="#/"
                              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                              onClick={() =>
                                downloadFile(_id, file_path, file_mimetype)
                              }
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">
                  No files found. Please add some.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div><Example/></div>
      <div><Footer/></div>
    </>
  );
};

export default CourseMaterial;