import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import TeacNav from './TeachersNavbar';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";
import Footer from '../home/Footer';
import Contact from '../home/Contact';

const AddNewsTCE = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);

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

      navigate("/teacher/ce/news");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
    <TeacNav />
    <div className="max-w-xl mx-auto py-10 px-4 h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add News</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter news title"
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content:</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter news content"
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="created_at" className="block text-gray-700 font-semibold mb-2">Created at:</label>
          <input
            type="date"
            name="created_at"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            placeholder="Enter news creation date"
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-400 hover:bg-blue-500 text-black py-2 px-4 rounded-lg cursor-pointer">
          {loading ? "Adding news..." : "Add News"}
        </button>
      </form>
    </div>
    <Contact/>
    <Footer/>
    </div>
  );
};

export default AddNewsTCE;