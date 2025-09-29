import React, { Component, useEffect, useState,useContext } from "react";
import { Context } from "../../../context";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import StudentNavbar from "./StudentNavbar"

import { useNavigate } from "react-router-dom";



export default function CourselistStudent() {
 
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
 
  const [data, SetData] = useState([]);
  useEffect(() => {
    getAllCourse();
  }, []);
  

  //fetchingdata
  const getAllCourse = () => {

    fetch(`http://localhost:8000/api/courselist`, {
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

      <StudentNavbar />
      <div className="auth-wraper">
        <div className="auth-inner" style={{ width: "auto" }}>
          <table style={{ width: 500 }} border="1">
            <tr>
              <th>Course Name</th>
              <th>Course code</th>
              <th>Course Credit</th>
           
            </tr>
            {data.map((i) => {
              return (
                <tr>
                  <td>{i.cname}</td>
                  <td>{i.ccode}</td>
                  <td>{i.ccredit}</td>
               
                </tr>
              );
            })}
          </table>

        </div>

      </div>
     
    </>
  )
}
