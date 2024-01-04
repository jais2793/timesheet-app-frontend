import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const user = JSON.parse(localStorage.getItem('jsUser'));
    if (user.usertype === 1) {
        var df = 'http://localhost:4000/subtimesheets/'
    } else {
        df = 'http://localhost:4000/timesheets/'
    }

    // console.log(`${df}${user.username}`)

    const [timesheets, setTimesheets] = useState([])

    useEffect(() => {
        axios.get(`${df}${user.username}`, {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.data.status) {
                // console.log(`${df}${user.username}`)
                // console.log(res.data)
                setTimesheets(res.data.timesheets)
            }
        });
    }, [df, user.username])

    if (timesheets.length <= 0) {
        return (
            <>
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className='w-full h-3 pt-5 px-5 text-right'>
                        <Link to={`/addtimesheet`} className='text-lg font-semibold text-blue-500 hover:opacity-70 hover:underline'>Add Timesheet</Link>
                    </div>
                    <h2 className='w-full text-center mt-10 mb-5 text-2xl'>Timesheet</h2>
                    No Timesheets yet
                </div>
            </>
        )
    }

    return (
        <>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">

                <div className='w-full h-3 pt-5 px-5 text-right'>
                    <Link to={`/addtimesheet`} className='text-lg font-semibold text-blue-500 hover:opacity-70 hover:underline'>Add Timesheet</Link>
                </div>


                <h2 className='w-full text-center mt-10 mb-5 font-bold text-2xl'>Timesheet</h2>
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
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>

                            {user.usertype === 1 && (
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {timesheets?.map((timesheet) => (
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
                                    {timesheet.description}
                                </td>
                                <td className="px-6 py-4">
                                    {timesheet.rating}
                                </td>
                                {user.usertype === 1 && (
                                    <td className="px-6 py-4">
                                        <a href={`/ratetimesheet/${timesheet._id}`} className="font-medium text-green-600 dark:text-green-500 hover:underline">Rate</a>
                                    </td>
                                )}

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home