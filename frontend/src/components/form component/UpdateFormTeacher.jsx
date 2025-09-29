import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "../home/Footer";

const UpdateFormTeacher = ({ teacherToBeUpdated,formpopup,setformpopup }) => {
  const {fname:tfname, lname:tlname,email:temail,password:tpassword, gender:tgender, department:tdepartment, status:tstatus,experience:texperience,}=teacherToBeUpdated
  const [fname, setFname] = useState(tfname);
  const [lname, setLname] = useState(tlname);
  const [email, setEmail] = useState(temail)
  const [password, setPassword] = useState(tpassword);
  const [gender, setGender] = useState(tgender);
  const [department, setDepartment] = useState(tdepartment);
  const [status, setStatus] = useState(tstatus);
  const [experience, setExperience] = useState(texperience);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Check if teacherToBeUpdated is defined before destructuring its properties
  if (!teacherToBeUpdated) {
    return <div>Teacher data not found</div>;
  }

  const { fname: ufname, lname: ulname, email: uemail, password: upassword, gender: ugender, status: ustatus, department: udepartment, experience: uexperience } = teacherToBeUpdated;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fname || !lname || !email || !password || !department || !gender || !status || !experience) {
      setMessage("Please fill in all the information");
      return;
    }
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMessage("Please enter a valid email address");
      return;
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
      )
    ) {
      setMessage(
        "Password must:\n" +
          "• Contains at least 1 lowercase letter\n" +
          "• Contains at least 1 uppercase letter\n" +
          "• Contains at least 1 digit\n" +
          "• Contains at least 1 special character\n" +
          "• Is at least 8 characters long"
      );
      return;
    }

    try {
      setLoading(true);
      const updatedUser = {
        fname,
        lname,
        email,
        password,
        gender,
        status,
        department,
        experience,
      };
      const res = await axios.put(
        `http://localhost:8000/api/teacherupdate/${teacherToBeUpdated._id}`,
        updatedUser
      );
      toast.success("Successfully updated");
      setformpopup(!formpopup)
      console.log(res.data, "updated data");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Cannot update teacher");
    }
  };

  return (
    <>
      <div className="select mt-6 ">
        <form
          className="mx-auto bg-gray-200 max-w-sm rounded-lg flex flex-col p-7 "
          onSubmit={handleSubmit}
        >
          <p className="mx-auto text-xl">Update</p>
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
          <label>Email</label>
          <input
            type="email"
            className="border-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            className="border-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <p className="border-2 rounded-md">
            Gender:
            <label className="ml-3">
              Male
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender("male")}
              />
            </label>
            <br />
            <label className="ml-20">
              Female
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender("female")}
              />
            </label>
          </p>
  
           <label className="border-2 rounded-md">
                        Department:
                        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select Department</option>
                            <option value="Computer Engineering">Computer Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                          
                        </select>
                    </label>
                    <label className="border-2 rounded-md">
                        Work Experience:
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                            <option value="">work Experience</option>
                            <option value="1">1 Year  </option>
                            <option value="2">2 Year  </option>
                            <option value="3">3 Year  </option>
                            <option value="4">more than 3 years  </option>
                        </select>
                    </label>
                    <label className="border-2 rounded-md">
                        Status:
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value=""> Status</option>
                            <option value="degree">Degree </option>
                            <option value="ms">MS </option>
                            <option value="phd">PHD </option>
                            <option value="dr">Doctrate </option>
                            <option value="other">other </option>

                        </select>
                    </label>
       
           <p className="text-red-500 mt-3">{message}</p>
         
        <div className="flex gap-5">
        <button
            type="submit"
            className="mx-auto bg-blue-500 text-white py-2 px-4 rounded-md mt-3"
            disabled={loading}
          >
            {loading ? <SyncOutlined spin /> : "Update"}
          </button>
         <button className="bg-red-500 mx-auto text-white py-2 px-4 rounded-md mt-3" onClick={()=>{setformpopup(!formpopup)}}>Cancel</button>
            
          </div> 
        </form>
      </div>
      
    </>
  );
};

export default UpdateFormTeacher;