import React, { Component, useEffect, useState ,useContext} from "react";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import Navbar from "./Ee/StudentNavbar";
import { Example } from "./logedinstudent/HomeL";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import Footer from "../home/Footer";


export default function Studentcourselistee() {
   const [data, SetData] = useState([]);
   const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);


  useEffect(() => {
    getAllCourse();
  }, []);
  

  //fetchingdata
  const getAllCourse = () => {

    fetch(`http://localhost:8000/api/courselistee`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Course LIST");
        SetData(data.data);
      });
  };
  return (
    <>
    <Navbar />
    <div className="auth-wraper mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-screen">
      <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
      
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-black text-xl font-bold" >List of courses you learn</h2>
          <table className="w-full text-left border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-gray-200 text-gray-700 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-3 border">Course Name</th>
                <th className="px-6 py-3 border">Course Code</th>
                <th className="px-6 py-3 border">Course Credit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {data.map((i) => {
                return (
                  <tr key={i.id}>
                    <td className="px-6 py-4 border">{i.cname}</td>
                    <td className="px-6 py-4 border">{i.ccode}</td>
                    <td className="px-6 py-4 border">{i.ccredit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div><Example/></div>
    <div><Footer/></div>
  </>
)
}