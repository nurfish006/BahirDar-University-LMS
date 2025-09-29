import React, { useEffect, useState,useContext } from "react";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import Navbar from "./StudentNavbar";

export default function NewsPageSCE() {
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
    getAllnews();
  }, []);

  /*
  // Delete news
  const deletenews = (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}`)) {
      fetch("http://localhost:8000/api/deletenews", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllnews();
        });

    } else {
    }
  };
*/

  // Fetch all news
  const getAllnews = () => {
    fetch(`http://localhost:8000/api/viewnews`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "LIST");
        SetData(data.data);
      });
  };

  return (
    <div>
      <Navbar/>
    <div style={{ margin: "auto", maxWidth: "800px" }}>
     
      
      {data.map((i) => {
        return (
          <div key={i._id} style={{ margin: "20px 0", borderBottom: "1px solid #ddd", fontSize:"226" }}>
            <h2 className="  text-2xl font-bold" style={{ marginBottom: "10px" }}>{i.title}</h2>
            <p className="font-bold" style={{ color: "#888", marginBottom: "10px" }}>Created at: {i.createdAt}</p>
            <p>{i.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
              
                            </div>
            </div>
          </div>
        );
      })}
      
     
    </div>
    </div>
  );
};