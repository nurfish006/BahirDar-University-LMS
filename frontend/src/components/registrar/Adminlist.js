import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import Navbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import UpdateFormAdmin from "../form component/updateformAdmin";
import Footer from "../home/Footer";
import Contact from "../home/Contact";

export default function Adminlist() {
  const [formpopup, setformpopup] = useState(false);
  const [adminToBeUpdted, setAdminToBeUpdated] = useState({});
  const navigate=useNavigate();
  //Session
const {
  state: { admin },
} = useContext(Context);
useEffect(() => {
  if (admin === null) 
  navigate("/adminlogin");
 }, [admin]);

  const addNewAdmin = () => {
    navigate("./addnewadmin");
  };

  const [data, SetData] = useState([]);
  useEffect(() => {
    getAllAdmin();
  }, [formpopup]);

  const deleteAdmin = (id, fname) => {
    if (window.confirm(`Are you sure you want to delete ${fname}`)) {
      axios
        .post("http://localhost:8000/api/deleteadmin", { adminid: id })
        .then((res) => {
          alert(res.data);
          getAllAdmin();
        })
        .catch((err) => console.log(err));
    } else {
    }
  };

  const getAllAdmin = () => {
    axios
      .get("http://localhost:8000/api/adminlist")
      .then((res) => {
        console.log(res.data, "admin LIST");
        SetData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePopup = (admin) => {
    setformpopup(!formpopup);
    setAdminToBeUpdated(admin);
    console.log(admin, "//////////////from  admin popup handling");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-black text-xl font-bold text-center my-6">Mannage Admins here</h2>

        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow">
          <table className="table-auto w-full">
          <thead>
  <tr className="bg-gray-200 text-gray-600 border-b">
    <th className="px-4 py-3 border-r">First Name</th>
    <th className="px-4 py-3 border-r">Last Name</th>
    <th className="px-4 py-3 border-r">Email Address</th>
    <th className="px-4 py-3 border-r">Update</th>
    <th className="px-4 py-3">Delete</th>
  </tr>
</thead>
<tbody className="text-gray-600">
  {data.map((admin) => {
    return (
      <tr key={admin._id} className="border-b">
        <td className="px-4 py-3 border-r">{admin.fname}</td>
        <td className="px-4 py-3 border-r">{admin.lname}</td>
        <td className="px-4 py-3 border-r">{admin.email}</td>
        <td className="px-4 py-3 border-r cursor-pointer">
          <button
            onClick={() => handlePopup(admin)}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Update
          </button>
        </td>
        <td className="px-4 py-3 cursor-pointer">
          <button
            onClick={() => deleteAdmin(admin._id, admin.fname)}
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
          onClick={addNewAdmin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-6"
        >
          Add New Admin
        </button>
      </div>

      {formpopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <UpdateFormAdmin adminToBeUpdted={adminToBeUpdted} formpopup={formpopup} setformpopup={setformpopup}/>
          </div>
        </div>
      )}
      <Contact/>
      <Footer/>
    </div>
  );
}