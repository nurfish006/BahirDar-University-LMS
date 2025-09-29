import React, { useEffect, useState ,useContext} from "react";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import Navbar from "./TeachersNavbar";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

export default function NewsPageTCE() {
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);

  const noteadd = () => {
    navigate("/teacher/ce/addnews");
  }

  const [data, SetData] = useState([]);

  useEffect(() => {
    getAllnews();
  }, []);

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
      <Navbar />
      <div className=" relative mx-auto max-w-3xl px-4  mb-7 h-screen">
        <button onClick={noteadd} className="absolute right-0 bg-blue-500 hover:bg-blue-300 text-white py-4 px-8 rounded cursor-pointer ">
          Add News
        </button>
        {data.map((i) => {
          return (
            <div key={i._id} className="my-8 border-b border-gray-300">
              <h2 className="text-3xl font-bold mb-2">{i.title}</h2>
              <p className=" mb-2 font-serif text-black">Created at: {i.createdAt}</p>
              <p className="text-lg mb-6">{i.content}...</p>
              <div className="flex justify-between items-center">
                <div className="ml-auto">
                  <button onClick={() => deletenews(i._id, i.title)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg cursor-pointer">
                    Delete News
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
      <Contact/>
      <Footer/>
    </div>
  );
};