import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { Context } from '../../context';
import { useNavigate } from 'react-router-dom';
import DeptNav from './DeptNav';
import Contact from '../home/Contact';
import Footer from '../home/Footer';

export default function Courselist() {
  const navigate = useNavigate();
  // //SESSION
  // const {
  //   state: { head },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);

  const addnewcourse = () => {
    navigate('/head/ce/addcourse');
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCourse();
  }, []);

  //deleting user
  const deletecourse = (id, cname) => {
    if (window.confirm(`Are you sure you want to delete the course ${cname}?`)) {
      fetch('http://localhost:8000/api/deletecourse', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          courseid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllCourse();
        });
    }
  };

  //fetching data
  const getAllCourse = () => {
    fetch(`http://localhost:8000/api/courselist`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'Course LIST');
        setData(data.data);
      });
  };

  return (
    <>
      <DeptNav />
      <div className='h-screen'>
      <div className="max-w-4xl mx-auto mt-8">
        <table className="w-full border-collapse border border-gray-300 divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-500 uppercase tracking-wider border border-gray-300">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-500 uppercase tracking-wider border border-gray-300">
                Course Code
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-gray-500 uppercase tracking-wider border border-gray-300">
                Course Credit
              </th>

              <th className="px-6 py-3 text-center text-lg font-bold text-gray-500 uppercase tracking-wider border border-gray-300">
                Delete Course
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {data.map((i) => {
              return (
                <tr key={i._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border border-gray-300">
                    {i.cname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 border border-gray-300">
                    {i.ccode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 border border-gray-300">
                    {i.ccredit}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center text-lg font-medium border border-gray-300">
                    <button
                      className='text-red-500 hover:text-red-700  hover:bg-red-500 px-2 py-1 rounded focus:outline-none'
                      onClick={() => deletecourse(i._id, i.cname)}
                      size={40}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={addnewcourse}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
      >
        Add New Course
      </button>
      </div>
      <div><Contact/></div>
      <div><Footer/></div>
    </>
  );
}