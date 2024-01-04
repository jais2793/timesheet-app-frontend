import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className='w-full text-center '>
                <div className='text-xl font-semibold'> 404 Not Found</div>
                <Link to="/" className='text-lg font-base hover:opacity-70 hover:underline transition duration-300 text-blue-500'>Go to home page</Link>
            </div >
        </>
    )
}

export default NotFound