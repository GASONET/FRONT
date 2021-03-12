import React from 'react';
import { Redirect } from 'react-router';



const Logout = ()=> {
    
       localStorage.removeItem('jwk');
       localStorage.removeItem('user');
       localStorage.removeItem('authorization');
       localStorage.removeItem('authenticated');
       return(
           <Redirect to='/login'/>
       )
    
}

export default Logout;