import React, { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import { Context } from '../../../context';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Navbar from './EeTeacherNav';
import Footer from '../../home/Footer';
import Contact from '../../home/Contact';
import { Example } from '../THome';
function TClassEe() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);

  // Fetch all links on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/getlinki');
        setLinks(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/addnewlinki', {
        url,
        description
      });
      setLinks([...links, response.data]);
      setUrl('');
      setDescription('');
      toast.success("Link added successfully")
    } catch (err) {
      console.error(err);
    }
  }

  // Handle delete link click
  async function handleDeleteClick(linkId) {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deletelinki/${linkId}`);
      if (response.status === 204) {
        setLinks(links.filter(link => link._id !== linkId));
             }
             toast.success("Link successfully deleted")
             window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>    <Navbar/>
 <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Live Link </h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="url-input" className="block mb-2 font-semibold">LIVE URL:</label>
              <input type="text" id="url-input" name="url" value={url} onChange={(event) => setUrl(event.target.value)} required className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex-1">
              <label htmlFor="description-input" className="block mb-2 font-semibold">CLASS NAME:</label>
              <input type="text" id="description-input" name="description" value={description} onChange={(event) => setDescription(event.target.value)} required className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <button type="submit" className="px-4 py-2 mt-8 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Add Link</button>
            </div>
          </div>
        </form>
        <h2 className="text-2xl font-bold mb-4">Class Link</h2>
        <ul className="border border-gray-300 rounded p-4">
          {links.map(link => (
            <li key={link._id} className="flex justify-between py-2">
              <div>
                <a href={link.url} className="text-blue-500 hover:underline text-2xl">{link.description}</a>
              </div>
              <div>
                <button onClick={() => handleDeleteClick(link._id)} className="px-2 ml-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
    </div>
    <Example/>
    <Contact/>
    <Footer/>
    </div>
   
  );
}

export default TClassEe;