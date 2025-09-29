
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer"
import '../student/StudentSignup.css'
const TeacherSignup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //SESSION
  const {
    state: { teacher },
  } = useContext(Context);


  useEffect(() => {
    if (teacher !== null) navigate("/teacher");
  }, [teacher]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/teacherssignup`,
        {
          fname,
          lname,
          email,
          password,
        });
      //console.log("REGISTERED SUCCESSFULLY", data);
      toast.success(" signup successfully . Please login.");
      setLoading(false);

      navigate("/teacherslogin");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />


      <div className="select mt-4">
        <form className="form mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 " onSubmit={handleSubmit}>
          <p className=" p mx-auto text-xl font-bold">SIGNUP</p>
          <label className="font-bold">First Name</label>
          <input
            type="text"
            className="border-2 rounded-md"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter first name"
            required
          />

          <label className="font-bold">Last Name</label>

          <input
            type="text"
            className="border-2 rounded-md"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter last name"
            required
          />

          <label className="font-bold"> Email</label>

          <input
            type="email"
            className="border-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label className="font-bold"> Password</label>

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
          <a href="/teacherslogin" className="underline text-blue-500">
            Login
          </a>
        </p>
      </div>
      
    </>
  );
};

export default TeacherSignup;
