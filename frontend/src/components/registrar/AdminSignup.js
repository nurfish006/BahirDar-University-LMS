
import { useState,useEffect,useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer"

const AdminSignup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  const {
    state: { admin },
  } = useContext(Context);


  useEffect(() => {
    if (admin === null) navigate("/adminlogin");
  }, [admin]);


const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

    const { data } = await axios.post(`http://localhost:8000/api/studentsignup`, 
    {
      fname,
      lname,
      email,
      password,
    });
    //console.log("REGISTERED SUCCESSFULLY", data);
    toast.success(" Student successfully Registered . Please login.");
    setLoading(false);

    navigate("/studentlogin");
  } catch (err) {
    toast.error(err.response.data);
    setLoading(false);

  }
  };

  return (
    <>
     
      

      <div className="select mt-6">
        <form  className="mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 " onSubmit={handleSubmit}>
        <p className="mx-auto text-xl">Register</p>
          <label>First Name</label>
          <input
      
            type="text"
            className="border-2 rounded-md "
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter first name"
            required
            
          />
         
          <label>Last Name</label>

          <input
            type="text"
            className="border-2 rounded-md"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter last name"
            required
          />
         
          <label> Email</label>

          <input
            type="email"
            className="border-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          
          <label className=""> Password</label>

          <input
            type="password"
            className="border-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          

          <button type="submit" className="bg-blue-500 rounded-md w-1/2 mx-auto mt-7"
             disabled={!fname || !lname || !email || !password || loading}>
            
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p  className="text-center p-3">
       Already have an account?{" "}
          <a href="/adminlogin" className="underline text-blue-500">
            Login
          </a>
        </p>
      </div>
     
    </>
  );
};

export default AdminSignup;
