import React, { useState ,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context';
import Navbar from './StudentNavbar';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);

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

      navigate("/news");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div> 
        <Navbar />
    <div style={{ margin: "auto", maxWidth: "800px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter news title"
          required
          style={{ marginBottom: "20px", padding: "10px", borderRadius: "4px", border: "none",alignItems:"center",fontSize:"22px", boxShadow: "2px 2px 4px #ddd" }}
        />

        <label>Content:</label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter news content"
          required
          style={{ marginBottom: "20px", padding: "10px", borderRadius: "4px", border: "none", boxShadow: "2px 2px 4px #ddd" }}
        />

        <label>Created at:</label>
        <input
          type="date"
          name="created_at"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          placeholder="Enter news creation date"
          required
          style={{ marginBottom: "20px", padding: "10px", borderRadius: "4px", border: "none", boxShadow: "2px 2px 4px #ddd" }}
        />

        <Button type="submit" disabled={loading} style={{ backgroundColor: "#4CAF50", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Adding news..." : "Add News"}
        </Button>
      </form>
    </div>
    </div>
  );
};

export default AddNews;