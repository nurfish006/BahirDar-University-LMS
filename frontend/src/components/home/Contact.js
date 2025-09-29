import React from 'react';



function Contact() {
  return (
    <div>

      <div className=" gap-y-16 w-full bg-zinc-900 flex flex-col items-center pb-20">
        {/* <img
          src={ccc}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        /> */}
        <h1 className="text-3xl font-bold text-center ">Contact Us</h1>
        <div className="grid grid-cols-2 gap-x-96 mx-auto">
          <div className='text-gray-100 px-4'>
            <h2 className="text-xl font-bold mb-2">Address:</h2>
            <p> BahirDar University BIT </p>
          
            <p></p>
          </div>
          <div className='text-gray-100 px-4'>
            <h2 className="text-xl font-bold mb-2">Phone:</h2>
            <p>+251934947686</p>
            <p>+251900106839</p>
            <p>+251924105453</p>
          </div>
          <div className='text-gray-100 px-4 pt-20'>
            <h2 className="text-xl font-bold mb-2">Email:</h2>
            <a href='nurfish06@gmail.com' className='underline text-blue-500'>nurfish06@gmail.com</a>
            <br></br>
            <a href='eyuetezie@gmail.com' className='underline text-blue-500'>eyuel@gmail.com</a>
            <br></br>
            <a href='nurfish06@gmail.com' className='underline text-blue-500'>saleh@gmail.com</a>
          </div>
          
          <div className='text-gray-100 px-4'>
            <h2 className="text-xl font-bold mb-2 pt-20">Social Media:</h2>
            <ul className="list-none">
              <li>
                <a href="https://www.facebook.com/BahirdarUniversity/" className='underline text-blue-500'>Facebook</a>
               
                <br></br>
                 <a href="https://www.facebook.com/BahirdarUniversity/" className='underline text-blue-500'>tweeter</a>
                
                 <br></br>
                 <a href="https://www.facebook.com/BahirdarUniversity/" className='underline text-blue-500'>instagram</a>
              </li>
              </ul>
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default Contact;