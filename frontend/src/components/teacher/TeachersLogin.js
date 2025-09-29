
import { useState, useContext,useEffect } from "react";
import { useRouter } from "react"
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer"
import '../student/StudentSignup.css'
import Contact from "../home/Contact";
const TeachersLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //access state
  const { state: {teacher},
   dispatch ,
  } = useContext(Context);

 
  const navigate = useNavigate();

  useEffect(() => {
    if (teacher !== null) navigate("/teacher");
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/teacherslogin`,
        {

          email,
          password,
        });
      //console.log(" you logeded in  SUCCESSFULLY", data);
      toast.success("logged in successfully");


       dispatch({
         type: "LOGIN_TEACHER",
         payload: data,
     });
      // // save in local storage
       window.localStorage.setItem("teacher", JSON.stringify(data));
      // //redirect to pages
  
      
      navigate("/teacher");
      setLoading(false);


    } catch (err) {
      toast.error(err.response.data);


      setLoading(false);

    }
  };

  return (
    <div className="height-screen">
      <Navbar />
     

      <div className="select mt-6 h-screen">
        <form className="form mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 " onSubmit={handleSubmit}>
        <p className=" p mx-auto text-xl font-bold">Login</p>
        
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
          

          <button type="submit" className="bg-blue-500 rounded-md w-1/2 mx-auto mt-7 font-black"
            disabled={!email || !password || loading}>

            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>
        {/* <p className="text-center p-3"> Not yet registered?{" "}
          <a href="/teacherssignup">
            <a className="underline text-blue-500">Register</a>
          </a>
        </p> */}
      </div>
      <Contact/>
      <Footer />
    </div>
  );
};

export default TeachersLogin;
