import React from 'react';
import { Redirect } from 'react-router';



const Logout = ()=> {
    
       localStorage.removeItem('jwk');
       localStorage.removeItem('user');
       localStorage.removeItem('authorization');
       return(
           <Redirect to='/'/>
       )
    
}

export default Logout;