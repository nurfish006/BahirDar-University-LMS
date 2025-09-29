// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// export default function MenuPopupState() {
//   return (
//     <PopupState variant="popover" popupId="demo-popup-menu">
//       {(popupState) => (
//         <React.Fragment>
//           <Button variant="contained" {...bindTrigger(popupState)}>
//             Dashboard
//           </Button>
//           <Menu {...bindMenu(popupState)}>
//             <MenuItem onClick={popupState.close}>Profile</MenuItem>
//             <MenuItem onClick={popupState.close}>My account</MenuItem>
//             <MenuItem onClick={popupState.close}>Logout</MenuItem>
//           </Menu>
//         </React.Fragment>
//       )}
//     </PopupState>
//   );
// }
import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import './LoginChoice.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid } from '@mui/material';
const LoginChoice = () => {
    return (
        <div className='absolute right-20 bg-slate-200 py-3 px-5'>
            

    
            <ul className='lchoice' >
            <Link to='/studentlogin'><li>Student</li></Link>
            <Link to='/teacherslogin'><li>Teacher</li></Link>
            <Link to='/adminlogin'><li>Admin</li></Link>
            <Link to='/headlogin'><li>Head</li></Link>
            </ul>

      
        
        </div>
    )
}

export default LoginChoice;