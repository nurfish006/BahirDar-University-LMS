import React, { useEffect, useState ,useContext} from "react";
import { Context } from "../../context";
import Navbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import UpdateFormTeacher from "../form component/UpdateFormTeacher";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

export default function Teacherslist() {
  const [formpopup, setFormPopup] = useState(false);
  const [teacherToBeUpdated, setTeacherToBeUpdated] = useState({});
  const navigate = useNavigate();

  //TODO: session
  
  const {
    state: { admin },
  } = useContext(Context);


  useEffect(() => {
    if (admin === null) navigate("/adminlogin");
  }, [admin]);

  const addNewTeacher = () => {
    navigate("./addnewteacher");
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    getAllTeacher();
  }, [formpopup]);

  // Deleting user
  const deleteTeacher = (id, fname) => {
    if (window.confirm(`Are you sure you want to delete ${fname}`)) {
      fetch("http://localhost:8000/api/deleteteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          teacherid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllTeacher();
        });
    }
  };

  // Fetching data
  const getAllTeacher = () => {
    fetch(`http://localhost:8000/api/teacherlist`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "teacher LIST");
        setData(data.data);
      });
  };

  const handlePopup = (teacher) => {
    setFormPopup(!formpopup);
    setTeacherToBeUpdated(teacher);
    console.log(teacher, "//////////////from teacher popup handling");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-black text-xl font-bold text-center my-3">Mannage teachers here</h2>
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 border-b border-gray-400 divide-x divide-gray-400">
                <th className="py-3 px-6 text-left  border-r-2 ">First Name</th>
                <th className="py-3 px-6 text-left  border-r-2  ">Last Name</th>
                <th className="py-3 px-6 text-left   border-r-2 ">Email Address</th>
                <th className="py-3 px-6 text-left   border-r-2 ">Update</th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {data.map((teacher) => {
                return (
                  <tr key={teacher._id} className="border-b border-gray-400">
                    <td className="py-3 px-6 border-r">{teacher.fname}</td>
                    <td className="py-3 px-6 border-r">{teacher.lname}</td>
                    <td className="py-3 px-6 border-r">{teacher.email}</td>
                    <td className="py-3 px-6 border-r cursor-pointer">
                      <button
                        onClick={() => handlePopup(teacher)}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Update
                      </button>
                    </td>
                    <td className="py-3 px-6 cursor-pointer">
                      <button
                        onClick={() => deleteTeacher(teacher._id, teacher.fname)}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={addNewTeacher}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-6"
        >
          Add New Teacher
        </button>
      </div>

      {formpopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <UpdateFormTeacher teacherToBeUpdated={teacherToBeUpdated} formpopup={formpopup} setformpopup={setFormPopup}/>
          </div>
        </div>
      )}
      <Contact />
      <Footer />
    </div>
  );
}