import React, { useState } from 'react'
import { currentDate, days, months, generateDate } from '@/utils/calendar'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

function Calendar() {
    const [today, setToday] = useState(currentDate)
    const [selectDate, setSelectDate] = useState(currentDate)
    return (
        <div className='my-shadow p-3 rounded-lg dark:bg-zinc-800'>
            <div className='flex justify-between items-center'>
                <h1 className='select-none font-semibold'>{months[today.month()]}, {today.year()}</h1>
                <div className='flex gap-10 items-center'>
                    <GrFormPrevious
                        className='w-5 h-5 next-btn'
                        onClick={() => setToday(today.month(today.month() - 1))}
                    />
                    <h1 className='next-btn' onClick={() => setToday(currentDate)}>Today</h1>
                    <GrFormNext
                        className='w-5 h-5 next-btn'
                        onClick={() => setToday(today.month(today.month() + 1))}
                    />
                </div>
            </div>
            <div className='grid grid-cols-7'>
                {days.map((day, i) => {
                    return (
                        <h1 key={i} className='text-sm text-center h-10 font-semibold grid place-content-center text-black dark:text-white select-none'>
                            {day}
                        </h1>
                    )
                })}
            </div>
            <div className='grid grid-cols-7'>
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, i) => {
                    return (
                        <div key={i} className="p-2 text-center grid place-content-center text-sm border-t">
                            <h1 className={`
                                ${currentMonth ? "" : "text-gray-400 dark:text-zinc-600"}
                                ${today ? "bg-red-600 text-white" : ""}
                                ${selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white" : ""}
                                "h-10 w-10 rounded-full grid place-content-center dark:hover:bg-black hover:bg-gray-200 hover:text-white transition-all cursor-pointer select-none"`
                            }
                                onClick={() => setSelectDate(date)}
                            >
                                {date.date()}
                            </h1>
                        </div>
                    )
                })}
            </div>
            <div className="mt-2">
                <h1 className=" font-semibold mb-2">
                    {selectDate.toDate().toDateString()} <span className='text-sm font-thin'>(4 events)</span>
                </h1>
                <div className='space-y-2'>
                    {/* <p className="text-gray-700 p-2 my-shadow rounded-md dark:bg-zinc-700 dark:text-gray-400">🥳  Birthday of Nathan Lee</p> */}
                </div>
            </div>
        </div>
    )
}

export default Calendar