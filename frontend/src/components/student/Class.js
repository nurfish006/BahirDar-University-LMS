import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import Navbar from './StudentNavbar';
import { Example } from './logedinstudent/HomeL';
import Footer from '../home/Footer';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
function LinksStudent() {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
   // Fetch all links on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/getlinkc');
        setLinks(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

    return (
      <div>
        <Navbar/>
      <div>
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-600">LIVE CLASS </h1>
       
        <h2 className="text-2xl font-bold mb-4">Class Link</h2>
        <ul className="border border-gray-300 rounded p-4">
          {links.map(link => (
            <li key={link._id} className="flex justify-between py-2">
              <div>
                <a href={link.url} className="text-blue-500 hover:underline text-2xl">{link.description}</a>
              </div>
             <div className='text-xl text-gray-500'> Click the link to Join the  class</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    <div><Example/></div>
    <div><Footer/></div>
    </div>
  );
}

export default LinksStudent;