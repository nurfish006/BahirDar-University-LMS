
import { useState, useContext, useEffect } from "react";
import { useRouter } from "react"
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer"
import Contact from "../home/Contact";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //access state
  const { state: { admin },
    dispatch,
  } = useContext(Context);


  const navigate = useNavigate();

  useEffect(() => {
    if (admin !== null) navigate("/admin");
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);

      const { data } = await axios.post(`http://localhost:8000/api/adminlogin`,
        {

          email,
          password,
        });
      //console.log(" you logeded in  SUCCESSFULLY", data);
      toast.success("logged in successfully");

      dispatch({
        type: "LOGIN_ADMIN",
        payload: data,
      });
      // // save in local storage
      window.localStorage.setItem("admin", JSON.stringify(data));
      // //redirect to pages
      navigate("/admin");
      setLoading(false);


    } catch (err) {
      toast.error(err.response.data);


      setLoading(false);

    }
  };

  return (
    <div>
      <Navbar />

      <div className="select h-screen mt-12">
     
        <form className="form mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7  mb-8" onSubmit={handleSubmit}>
          <p className=" p mx-auto text-xl font-bold text-slate-900">Login</p>


          <label className="font-bold"> Email</label>

          <input
            type="email"
            className="inpborder-2 rounded-mdut"
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
            disabled={!email || !password || loading}>

            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>

      </div>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default AdminLogin;
