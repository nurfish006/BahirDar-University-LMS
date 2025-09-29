import React, { useEffect, useState ,useContext} from "react";
import { MdDelete } from 'react-icons/md'
import { GrUpgrade } from 'react-icons/gr'
import axios from "axios";
import { Context } from '../../context';
import { useNavigate } from "react-router-dom";
import DeptNav from "./DeptNav";
import { Delete } from "@mui/icons-material";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

export default function NewsPage() {
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { head },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (head === null) navigate("/headlogin");
  //  }, [head]);
  const noteadd = () => {
    navigate("/head/ce/addnews");
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
      <DeptNav/>
      <div className="max-w-4xl mx-auto h-screen">
      <button onClick={noteadd} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded my-4 cursor-pointer w-full">
          Add News
        </button>
        {data.map((i) => {
          return (
            <div key={i._id} className="py-8 border-b border-gray-300">
              <h2 className="text-2xl font-bold mb-2">{i.title}</h2>
              <p className="text-gray-500 text-sm mb-2">Created at: {i.createdAt}</p>
              <p className="text-gray-700">{i.content}</p>
              <div className="flex justify-end items-center mt-4">
                <button onClick={() => deletenews(i._id, i.title)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer">
                  Delete
                </button>
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