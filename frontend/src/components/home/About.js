import React from "react";
import Footer from "./Footer";
import bdu from "../../asset/bdu.png"
import { Link } from "react-router-dom";
import Contact from "./Contact";

const About = () => {
  return (
    <div className="mt--3">
      <div className="container mx-auto py-3 h-screen">
        <div className="flex flex-col md:flex-row items-center md:space-x-10">
          <div className="w-full md:w-1/3">
            <img
              src={bdu}
              alt="University logo"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-10">
            <p className="text-3xl font-bold">BahirDar University</p>
            <p className="text-gray-500">
              BahirDar university was established through the council of ministers Regulation
               issued on sep 01, 1993 G.C. BahirDar university has many campuses,
              namely, the main campus peda, poly campus of BahirDar institute of tchnology 
            </p>
            <p className="text-gray-500">
              Currently the university has different and ,many Faculty ..........................
            </p>
            <div className="flex flex-wrap items-center space-x-5 mb-2">
              <button className="px-4 py-2 font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600">
                <Link to="/services">Services</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default About;