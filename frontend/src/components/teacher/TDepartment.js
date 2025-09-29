import { useState ,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import TLoggedinNavbar from './TLoggedinNavbar';
import Contact from '../home/Contact';
import Footer from '../home/Footer';

const TDepartment = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  function handleSelectChange(event) {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Submit the form data to the server
    fetch('http://localhost:8000/api/teacherselectdept', {
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
      <TLoggedinNavbar/>
      <div className="flex flex-col items-center justify-center mt-2 h-screen">
        <p className="text-center text-3xl font-bold mb-6">Select Your Department to proceed</p>
        <form className="bg-gray-200 max-w-xl p-10 px-14 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <select id="select" value={selectedOption} onChange={handleSelectChange} className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option className="font-bold" value="">Select Your Department</option>
            <option value="ce">Computer Engineering</option>
            <option value="ee">Electrical Engineering</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 mb--5 rounded mt-16" type="submit">OK</button>
        </form>
      </div>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default TDepartment;