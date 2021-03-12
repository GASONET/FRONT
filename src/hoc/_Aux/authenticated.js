const isAuthenticated = () =>{

    if(localStorage.getItem('authenticated') === true)
        return true
    else 
    //if ((localStorage.getItem('authenticated') == undefined)||(localStorage.getItem('authenticated') === false))
        return false
}

export default isAuthenticated;