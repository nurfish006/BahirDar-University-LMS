import React, {useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import EEDeptNav from './EEDeptNav'
import { Button } from 'react-bootstrap'
import { useState,Component } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Context } from "../../../context";
import Contact from '../../home/Contact';
import Footer from '../../home/Footer';

const AddCourseee = () => {
  const [cname, setCoursename] =useState('')
  const [ccode, setCoursecode] =useState('')
  const [ccredit, setCoursecredit] =useState('')
  const [loading, setLoading] = useState(false);
  // const {
  //   state: { head },
  // } = useContext(Context);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

    const { data } = await axios.post(`http://localhost:8000/api/addcourseee`, 
    {
      cname,
      ccode,
      ccredit,
      
    });
    //console.log("REGISTERED SUCCESSFULLY", data);
    toast.success(" course added successfully successfully ");
    setLoading(false);

    navigate("/head/ee/courses");
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
    <div className='h-screen'>
      <h1 className='text-center font-bold text-2xl text-black'>Add Course</h1>
    <form className="max-w-md mx-auto mt-8 " action="POST">
      <div className="mb-4">
        <label htmlFor="addc" className="block font-medium text-gray-700 mb-2">
          Course Name:
        </label>
        <input
          type="text"
          name="addc"
          id="addc"
          onChange={(e) => setCoursename(e.target.value)}
          value={cname}
          placeholder="Course Name"
          required
          className="border bg-gray-100 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coursec" className="block font-medium text-gray-700 mb-2">
          Course Code:
        </label>
        <input
          type="text"
          name="coursec"
          id="coursec"
          onChange={(e) => setCoursecode(e.target.value)}
          placeholder="Course Code"
          value={ccode}
          required
          className="border bg-gray-100 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coursecr" className="block font-medium text-gray-700 mb-2">
          Course Credit:
        </label>
        <input
          type="number"
          name="coursecr"
          id="coursecr"
          onChange={(e) => setCoursecredit(e.target.value)}
          placeholder="Course Credit"
          value={ccredit}
          required
          className="border bg-gray-100 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Adding Course...' : 'Add Course'}
        </Button>
      
         <Button
          type=""
          onClick={handleClose}
          variant="contained"
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 pl-4 pr-4 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? 'closing...' : 'close'}
        </Button>
        </div>
    </form>
    </div>
    <Contact/>
    <Footer/>
  </div>
);
};

export default AddCourseee;