import React, { useState ,useEffect,useContext} from 'react';
import { Context } from '../../context';
import { useNavigate } from 'react-router-dom';
import DeptNav from './DeptNav';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import Contact from '../home/Contact';
import Footer from '../home/Footer';

const AddCourse = () => {
  const [cname, setCoursename] = useState('');
  const [ccode, setCoursecode] = useState('');
  const [ccredit, setCoursecredit] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // //SESSION
  // const {
  //   state: { head },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/addcourse`, {
        cname,
        ccode,
        ccredit,
      });
      //console.log("REGISTERED SUCCESSFULLY", data);
      toast.success('Course added successfully');
      setLoading(false);

      navigate('/head/ce/courses');
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
      navigate('/head/ce');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <DeptNav />
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
          type="submit"
          onClick={handleClose}
          variant="contained"
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Closing...' : 'close'}
        </Button>
        </div>
      </form>
      </div>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default AddCourse;