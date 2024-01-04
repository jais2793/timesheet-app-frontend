import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const AddTimesheet = () => {

    const user = JSON.parse(localStorage.getItem('jsUser'));

    const navigate = useNavigate();

    const [date, setDate] = useState('')
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [description, setDescription] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');


    const addTimesheet = async () => {
        setErrorMsg('')
        if (date.length > 0 && fromTime.length > 0 && toTime.length > 0 && description.length > 0) {
            const params = JSON.stringify({
                username: user.username,
                manager: user.manager,
                date: date,
                fromTime: fromTime,
                toTime: toTime,
                description: description
            })
            await axios.post('http://localhost:4000/timesheet', params, {
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                if (res.data.status) {
                    setResponseMsg('Timesheet submitted, Redirecting back')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                } else {
                    setErrorMsg(res.data.message)
                }
            });
        } else {
            setErrorMsg('Please fill all the fields')
        }

    }



    return (
        <>
            <div className='w-full h-lvh pt-20'>
                {errorMsg.length > 0 && (
                    <div className='w-full text-center '>
                        <div className='text-base font-semibold text-red-700'> {errorMsg}</div>
                    </div >
                )}
                {responseMsg.length > 0 && (
                    <div className='w-full text-center '>
                        <div className='text-base font-semibold text-green-700'> {responseMsg}</div>
                    </div >
                )}
                <div className="max-w-sm mx-auto">
                    <h2 className='text-center text-2xl font-bold'>Add Timesheet</h2>
                    <div className="mb-5">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="fromTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
                        <input
                            type="time"
                            id="fromtime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setFromTime(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="toTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
                        <input
                            type="time"
                            id="toTime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setToTime(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                        <textarea
                            placeholder='Add your description'
                            id="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={addTimesheet}
                        >
                            Add
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddTimesheet