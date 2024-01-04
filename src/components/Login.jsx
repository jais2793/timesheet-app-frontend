import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [userpass, setUserpass] = useState('');
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [incorrectMsg, setIncorrectMsg] = useState('');
    const [correctMsg, setCorrectMsg] = useState('');

    const loginUser = async () => {
        setIncorrectLogin(false)
        if (username.length > 0 && userpass.length > 0) {

            const params = JSON.stringify({
                username: username,
                userpass: userpass
            })
            await axios.post('http://localhost:4000/login', params, {
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                if (res.data.status) {
                    // console.log(res.data)
                    localStorage.setItem("jsUser", JSON.stringify({ id: res.data.user._id, username: res.data.user.username, manager: res.data.user.mid, usertype: res.data.user.usertype }))
                    setCorrectMsg(`${res.data.message}, Redirecting`)
                    setTimeout(() => { navigate('/') }, 3000)
                } else {
                    setIncorrectLogin(true)
                    setIncorrectMsg(res.data.message)
                }
            });
        } else {
            setIncorrectLogin(true)
            setIncorrectMsg("Please, fill in all the fields")
        }
    }



    return (
        <>
            <div className='w-full h-lvh pt-20'>
                {incorrectLogin && (
                    <div className='w-full text-center '>
                        <div className='text-base font-semibold text-red-500'> {incorrectMsg}</div>
                    </div >
                )}
                {correctMsg.length > 0 && (
                    <div className='w-full text-center '>
                        <div className='text-base font-semibold text-green-700'> {correctMsg}</div>
                    </div >
                )}
                <div className="max-w-sm mx-auto">
                    <h2 className='text-center text-2xl font-bold'>Login</h2>
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
                    <div className='flex justify-between'>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={loginUser}
                        >
                            Submit
                        </button>

                        <Link to='/register' className='text-blue-500 hover:opacity-70 hover:underline'>Register here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login