import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

import toast from "react-hot-toast";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import Footer from "../home/Footer"
import Contact from "../home/Contact";
// import './StudentSignup.css';
const Addnewstudent = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("")
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")
  const [semister, setSemister] = useState("")
  const [message, setMessage] = useState("")
  const {
    state: { admin },
  } = useContext(Context);


  
  useEffect(() => {
    if (admin === null) navigate("/adminlogin");
  }, [admin]);


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fname || !lname || !email || !password || !department || !gender || !year || !semister) {
      setMessage('Please fill in all the information');
      return;
    }
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMessage('Please enter a valid email address');
      return;
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    )) {
       setMessage("Password must:\n" 
      + "• Contains at least 1 lowercase letter\n" 
      + "• Contains at least 1 uppercase letter\n" 
      + "• Contains at least 1 digit\n" 
      + "• Contains at least 1 special character\n" 
      + "• Is at least 8 characters long");
      
      return;
    }
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/studentsignup`,
        {
          fname,
          lname,
          email,
          password,
          department,
          year,
          semister,
          gender,
        });
      //console.log("REGISTERED SUCCESSFULLY", data);
      toast.success( "You Registered "+fname +" " + lname+ " "+"Successfully");
      setLoading(false);

      navigate("/admin/studentslist");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);

    }
  };

  return (
    <>

<AdminNavbar/>
<div>
      <div className="select mt-6 h-screen">
      <p className="mx-auto text-xl font-bold text-center mt-14 mb-4 ">CREATE ACCOUNT</p>
        <form className="mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 " onSubmit={handleSubmit}>
      
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
          <p   className="border-2 rounded-md">
            Gender :

            <label className="ml-3"> male
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender('male')} />
            </label><br/>
            <label className="ml-20"> female
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender('female')} />
            </label>
          </p>
          <label   className="border-2 rounded-md">
            Department:
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
             
            </select>
          </label>
          <label   className="border-2 rounded-md">
            Year:
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              <option value="1">Year I </option>
              <option value="2">Year II </option>
              <option value="3">Year III </option>
              <option value="4">Year IV </option>


            </select>
          </label>
          <label   className="border-2 rounded-md">
            Semister:
            <select value={semister} onChange={(e) => setSemister(e.target.value)}>
              <option value="">Select Semister</option>
              <option value="semisterI">Semister I </option>
              <option value="semisterII">Semister II </option>


            </select>
          </label>

          <button type="submit" className="bg-blue-500 rounded-md w-1/2 mx-auto mt-7"
            disabled={!fname || !lname || !email || !password || loading}>

            {loading ? <SyncOutlined spin /> : "CREATE"}
          </button>
          <div className=" text-red-500"> {message && <div>{message}</div>}</div>
        </form>
       

      </div>
      <Contact/>
      <Footer/>
      </div>

    </>
  );
};

export default Addnewstudent;
