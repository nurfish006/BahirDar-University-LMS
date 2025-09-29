import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import toast from "react-hot-toast";
import EEDeptNav from './EEDeptNav';
import Footer from '../../home/Footer';
import Contact from '../../home/Contact';
const Addinf = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
//SESSSION 
// const {
//   state: { head },
// } = useContext(Context);
// useEffect(() => {
//   if (head === null) navigate("/headlogin");
//  }, [head]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/noteadd`, {
        title,
        content,
        createdAt,
      });
      toast.success("News added successfully");
      setLoading(false);

      navigate("/head/ee/addnews");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  const handleClose = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
    // toast.success("");
    

    navigate("/head/ee");
  } catch (err) {
    toast.error(err.response.data);
    setLoading(false);

  }
  };
  return (
    <div>
      <EEDeptNav />
      <div className="max-w-md mx-auto mt-8 h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <label className="block mb-2 font-medium text-lg text-gray-700" htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter news title"
            required
            className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
          />

          <label className="block mb-2 font-medium text-lg text-gray-700" htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter news content"
            required
            className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
          />

          <label className="block mb-2 font-medium text-lg text-gray-700" htmlFor="created_at">Created at:</label>
          <input
            type="date"
            name="created_at"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            placeholder="Enter news creation date"
            required
            className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
          />
<div className="flex justify-between">
          <Button type="submit" disabled={loading} className="bg-blue-400 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded-lg">
            {loading ? "Adding news..." : "Add News"}
          </Button>

          <Button type="submit" onClick={handleClose} disabled={loading} className="bg-red-400 hover:bg-red-600 text-black font-bold py-2 px-4 rounded-lg">
            {loading ? "Closing..." : "Close"}
          </Button>
          
          </div>
        </form>
      </div>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Addinf;