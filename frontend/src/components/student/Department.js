import { useState ,useEffect,useContext} from 'react';
import Navbar from './StudentNavbar';
import LoggedinNavbar from './LoggedinNavbar';
import Footer from '../home/Footer';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';

const Department = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
  function handleSelectChange(event) {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Submit the form data to the server
    fetch('http://localhost:8000/api/selectdepartment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedOption })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('An error occurred');
        }
        return response.json();
      })
      .then(data => {
        // Navigate to the URL returned by the server
        window.location.href = data.url;
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred');
      });
  }

  return (
    <div>
      <LoggedinNavbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-3xl font-bold mb-8">
          Select Your Department to Proceed
        </p>
        <form
          className="bg-gray-100 p-10 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="select"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Your Department:
          </label>
          <select
            id="select"
            value={selectedOption}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Your Department</option>
            <option value="ce">Computer Engineering</option>
            <option value="ee">Electrical Engineering</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
            type="submit"
          >
            OK
          </button>
        </form>
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Department;