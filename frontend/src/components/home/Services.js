import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Entry from '../homepages/Entry';
import Servicess from '../homepages/Servicess';
import "../homepages/Servicess.css";
import Contact from './Contact';
function createEntry(emojiTerm) {
  return (
  
    <Entry
      key={emojiTerm.id}
      emoji={emojiTerm.emoji}
      name={emojiTerm.name}
      description={emojiTerm.meaning}
      action={emojiTerm.action}
    />
    
    
  );
}
const Services = () => {
  return (
    <div>
    

    <div id='services' className='h-screen'>

    <div class="text-xl mt-36 font-bold text-center pb-2">SERVICE  WE OFFERED</div>
      
      <dl className="dictionary">{Servicess.map(createEntry)}</dl>

    </div>
    <div><Contact/></div>
    <div><Footer/></div>

    </div>
  )
}


export default Services;
