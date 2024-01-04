import React from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'



const PrivateRouter = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('jsUser'))

    if (user) {
        return (
            <>
                <Navbar usertype={user.usertype} />
                {children}
                <Footer />
            </>
        )
    } else {
        return (
            <Navigate to='/login' />
        )
    }

}

export default PrivateRouter