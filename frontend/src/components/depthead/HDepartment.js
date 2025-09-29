import { useState ,useContext,useEffect} from 'react';
import { Context } from '../../context';
import { useNavigate } from 'react-router-dom';
import HLoggedinNav from './HLoggedinNav';
import Contact from '../home/Contact';
import Footer from '../home/Footer';

const HDepartment = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate=useNavigate();
//SESSION
// const {
//   state: { head },
// } = useContext(Context);
// useEffect(() => {
//   if (head === null) navigate("/headlogin");
//  }, [head]);
  function handleSelectChange(event) {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Submit the form data to the server
    fetch('http://localhost:8000/api/selectdeptH', {
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
      <HLoggedinNav />
      <div className="max-w-4xl mx-auto bg-gray-50 py-8 px-4 h-screen mt-16 mb-8">
        <p className="text-center text-2xl font-bold mb-8">Select Your Department to proceed</p>
        <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
          <select id="select" value={selectedOption} onChange={handleSelectChange} className="border border-gray-400 rounded-md mb-4 px-4 py-2 focus:outline-none focus:border-blue-500">
            <option className="font-bold" value="">Select Your Department</option>
            <option value="ce">Computer Engineering</option>
            <option value="ee">Electrical Engineering</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer" type="submit">OK</button>
        </form>
      </div>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default HDepartment;