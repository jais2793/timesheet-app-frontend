import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {

    const navigate = useNavigate();

    const [managers, setManagers] = useState(Array)

    const [username, setUserName] = useState('');
    const [userpass, setUserpass] = useState('');
    const [userType, setUserType] = useState(0);
    const [managerId, setManagerId] = useState('admin');
    const [incorrectRegister, setIncorrectRegister] = useState(false);
    const [incorrectMsg, setIncorrectMsg] = useState('');


    useEffect(() => {
        axios.get('http://localhost:4000/managers', {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.data.status) {
                setManagers(res.data.managers)
            }
        });
    }, [])


    const registerUser = async () => {
        setIncorrectRegister(false)
        if (username.length > 0 && userpass.length > 0 && userType >= 0 && managerId.length > 0) {
            const params = JSON.stringify({
                username: username,
                userpass: userpass,
                usertype: userType,
                mid: managerId
            })
            await axios.post('http://localhost:4000/register', params, {
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                if (res.data.status) {
                    alert('User successfully registered')
                    navigate('/login')
                } else {
                    setIncorrectRegister(true)
                    setIncorrectMsg(res.data.message)
                }
            });
        } else {
            setIncorrectRegister(true)
            setIncorrectMsg("Please, fill in all the fields")
        }
    }


    return (
        <>
            <div className='w-full h-lvh pt-20'>
                {incorrectRegister && (
                    <div className='w-full text-center '>
                        <div className='text-base font-semibold text-red-500'> {incorrectMsg}</div>
                    </div >
                )}
                <div className="max-w-sm mx-auto">
                    <h2 className='text-center text-2xl font-bold'>Register</h2>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">user name</label>
                        <input
                            type="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="User Name"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setUserpass(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="usertype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a user type</label>
                        <select
                            id="usertype"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setUserType(parseInt(e.target.value))
                            }}
                        >
                            <option value="null" disabled>Choose a user type</option>
                            <option
                                value="0"
                            >
                                Employee
                            </option>
                            <option
                                value="1"
                            >
                                Manager
                            </option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="manager" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Reporting manager</label>
                        <select
                            id="manager"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(res) => {
                                setManagerId(res.target.value);
                            }}
                        >
                            <option value="null" disabled>Choose a manager</option>
                            {managers.map((manager) => (
                                <option
                                    className="text-base border-0 outline-none capitalize bg-white text-black"
                                    value={manager.username}
                                    key={manager._id}
                                >
                                    {manager.username}
                                </option>
                            ))}
                        </select>
                    </div>




                    <div className='flex justify-between'>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={registerUser}
                        >
                            Register
                        </button>

                        <Link to='/login' className='text-blue-500 hover:opacity-70 hover:underline'>Login here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register