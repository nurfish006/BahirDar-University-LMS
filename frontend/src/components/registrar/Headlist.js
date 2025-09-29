import React, { Component, useEffect, useState ,useContext} from "react";
import { Context } from "../../context";
import axios from "axios";
import Navbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import UpdateFormHead from "../form component/updateformHead";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

export default function Headlist() {

  const [formpopup, setformpopup] = useState(false);
  const [headToBeUpdted, setHeadToBeUpdated] = useState({});

  const navigate = useNavigate();
  //Session
const {
  state: { admin },
} = useContext(Context);
useEffect(() => {
  if (admin === null) 
  navigate("/adminlogin");
 }, [admin]);


  const addnewhead = () => {
    navigate("./addnewhead");
  };

  const [data, SetData] = useState([]);

  useEffect(() => {
    getAllHead();
  }, [formpopup]);

  // deleting head
  const deletehead = (id, fname) => {
    if (window.confirm(`Are you sure you want to delete ${fname}`)) {
      fetch("http://localhost:8000/api/deletehead", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          headid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllHead();
        });

    } else {
    }
  };

  // fetching data
  const getAllHead = () => {
    fetch(`http://localhost:8000/api/headlist`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HEAD LIST");
        SetData(data.data);
      });
  };

  const handlePopup = (head) => {
    setformpopup(!formpopup);
    setHeadToBeUpdated(head);
    console.log(head, "//////////////from popup handling")
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 h-screen">
      <h2 className="text-black text-xl font-bold mx-72 my-6">Mannage Heads here</h2>
        <div className="flex justify-between">
          
          <div className="w-full">
          <table className="table-auto border border-gray-400">
          
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 font-bold text-gray-800">First Name</th>
                <th className="px-4 py-2 font-bold text-gray-800">Last Name</th>
                <th className="px-4 py-2 font-bold text-gray-800">Email Address</th>
                <th className="px-4 py-2 font-bold text-gray-800">Update</th>
                <th className="px-4 py-2 font-bold text-gray-800">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                return (
                  <tr key={i._id}>
                    <td className="border px-4 py-2">{i.fname}</td>
                    <td className="border px-4 py-2">{i.lname}</td>
                    <td className="border px-4 py-2">{i.email}</td>
                    <td className="border px-4 py-2" >
                      <button
                        onClick={() => handlePopup(i)}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                        Update
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deletehead(i._id, i.fname)} size={24} 
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

       
      </div>
      <div>
      <button onClick={addnewhead} className="bg-blue-500 rounded-md  mx-auto mt-7 py-2 px-4 text-white hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue">
          Add New Head
        </button>
      </div>
      {formpopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-gray-900">
        <UpdateFormHead headToBeUpdted={headToBeUpdted} setformpopup={setformpopup} formpopup={formpopup}/>
      </div>}
      </div>
      <Contact/>
      <Footer/>
    </div>
  )
}