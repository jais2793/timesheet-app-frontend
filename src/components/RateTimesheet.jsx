import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const RateTimesheet = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [timesheet, setTimesheet] = useState([])
    const [rating, setRating] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:4000/timesheet/${id}`, {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.data.status) {
                setTimesheet(res.data.timesheet)
            }
        });
    }, [id])

    const addRating = async () => {
        setErrorMsg('')
        if (rating > 0) {
            const params = JSON.stringify({
                id: id,
                rating: rating
            })
            await axios.put(`http://localhost:4000/timesheet`, params, {
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                if (res.data.status) {
                    setResponseMsg('Timesheet rated, Redirecting back')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                } else {
                    setErrorMsg(res.data.message)
                }
            });
        } else {
            setErrorMsg('Please select a rating')
        }
    }

    return (
        <>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
                <h2 className='w-full text-center mt-10 mb-5 font-bold text-2xl'>Timesheet Data</h2>
                <table className="w-full sm:w-3/4 xs:w-3/4 ml-auto mr-auto text-sm text-left font-semibold rtl:text-right text-black dark:text-black">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-black">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reporting Manager
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={timesheet._id}>
                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                                {timesheet.username}
                            </th>
                            <td className="px-6 py-4">
                                {timesheet.manager}
                            </td>
                            <td className="px-6 py-4">
                                {timesheet.date}
                            </td>
                            <td className="px-6 py-4">
                                {timesheet.fromTime}
                            </td>
                            <td className="px-6 py-4">
                                {timesheet.toTime}
                            </td>
                            <td className="px-6 py-4">
                                {timesheet.rating}
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div className="max-w-sm mx-auto mt-5">
                    <h2 className='text-center text-xl font-bold'>Add Rating</h2>
                    <div className="mb-5">
                        <select
                            id="usertype"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setRating(parseInt(e.target.value))
                            }}
                        >
                            <option disabled>Choose a rating</option>
                            <option
                                value="1"
                            >
                                1
                            </option>
                            <option
                                value="2"
                            >
                                2
                            </option>
                            <option
                                value="3"
                            >
                                3
                            </option>
                            <option
                                value="4"
                            >
                                4
                            </option>
                            <option
                                value="5"
                            >
                                5
                            </option>
                        </select>

                    </div>

                    <div className='flex justify-between'>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={addRating}
                        >
                            Add Rating
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RateTimesheet