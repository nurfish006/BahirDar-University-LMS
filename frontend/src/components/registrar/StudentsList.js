import React, { useEffect, useState,useContext } from "react";
import { Context  } from "../../context";
import axios from "axios";
import Navbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import Addnewstudent from "./Addnewstudent";
import UpdateForm from "../form component/updateform";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

export default function StudentsList() {
  const [formpopup, setformpopup] = useState(false)
  const [studentToBeUpdted, setStudentToBeUpdated] = useState({})
  const navigate = useNavigate();
//session
  const {
    state: { admin },
  } = useContext(Context);


  useEffect(() => {
    if (admin === null) navigate("/adminlogin");
  }, [admin]);

  const addnewstudent = () => {
    navigate("./addnewstudent");
  }

  const [data, SetData] = useState([]);

  useEffect(() => {
    getAllStudent();
  }, [formpopup]);

  //deleting user
  const deletestudent = (id, fname) => {
    if (window.confirm(`Are you sure you want to delete ${fname}`)) {
      fetch("http://localhost:8000/api/deletstudent", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          studentid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllStudent();
        });

    } else {
    }
  };

  //fetchingdata
  const getAllStudent = () => {
    fetch(`http://localhost:8000/api/studentlist`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "student LIST");
        SetData(data.data);
      });
  };

  const handlePopup = (student) => {
    setformpopup(!formpopup)
    setStudentToBeUpdated(student);
    console.log(student, "//////////////from popup handling")
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-black text-xl font-bold text-center my-6">Mannage Students here</h2>
        <div className="flex justify-between">
          <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden rounded-lg border">
  <thead className="bg-gray-10 font-bold">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border">
        First Name
      </th>
      <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border">
        Last Name
      </th>
      <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border">
        Email Address
      </th>
      <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border">
        Update
      </th>
      <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border">
        Delete
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {data.map((i) => {
      return (
        <tr key={i._id}>
          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border">
            {i.fname}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border">
            {i.lname}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border">
            {i.email}
          </td>
          <td className="border">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => handlePopup(i)}
            >
              Update
            </button>
          </td>
          <td className="border">
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={() => deletestudent(i._id, i.fname)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
            <button onClick={addnewstudent} className="bg-blue-500 rounded-md py-2 px-4 text-white font-medium mt-7 transition-colors duration-200 hover:bg-blue-600">
              Add New Student
            </button>
          </div>
          {formpopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-gray-900">
            <div className="bg-white p-8 rounded-lg">
              <UpdateForm studentToBeUpdted={studentToBeUpdted} formpopup={formpopup} setformpopup={setformpopup} />
            </div>
          </div>}
        </div>
      </div>
      <Contact/>
      <Footer/>
    </div>
  )
}