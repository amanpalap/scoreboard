import { FormData } from '@/types/formTypes'
import React from 'react'

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const PlayerScores: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    return (
        <div className='flex flex-wrap items-center text-sm justify-center mt-2'>
            {/* Batsman section  */}
            <section className='flex flex-wrap items-center w-full border mb-1'>
                <div className='w-full grid grid-cols-6 items-center justify-between bg-gray-300 py-1 text-gray-600 font-extrabold'>
                    <div className='col-span-3 w-full pl-4'>
                        Batsman
                    </div>
                    <div className='col-span-1 w-full'>
                        R
                    </div>
                    <div className='col-span-1 w-full'>
                        B
                    </div>
                    <div className='col-span-1 w-full'>
                        4s
                    </div>
                </div>
                <div className='w-full text-sm grid grid-cols-6 items-center justify-between bg-gray-100 py-1 text-gray-800'>
                    <div className='col-span-3 w-full pl-4'>
                        Tazim Hazam Sakib*
                    </div>
                    <div className='col-span-1 w-full'>
                        8
                    </div>
                    <div className='col-span-1 w-full'>
                        8
                    </div>
                    <div className='col-span-1 w-full'>
                        1
                    </div>
                </div>
                <div className='w-full text-sm grid grid-cols-6 items-center justify-between bg-gray-100 py-1'>
                    <div className='col-span-3 w-full pl-4'>
                        Towhid Hridoy
                    </div>
                    <div className='col-span-1 w-full'>
                        63
                    </div>
                    <div className='col-span-1 w-full'>
                        42
                    </div>
                    <div className='col-span-1 w-full'>
                        5
                    </div>
                </div>
            </section>

            {/* Bowler section  */}
            <section className='flex flex-wrap items-center w-full border mb-1'>
                <div className='w-full grid grid-cols-7 items-center justify-between bg-gray-300 py-1 text-gray-600 font-extrabold'>
                    <div className='col-span-3 w-full pl-4'>
                        Bowler
                    </div>
                    <div className='col-span-1 w-full'>
                        O
                    </div>
                    <div className='col-span-1 w-full'>
                        M
                    </div>
                    <div className='col-span-1 w-full'>
                        R
                    </div>
                    <div className='col-span-1 w-full'>
                        W
                    </div>
                </div>
                <div className='w-full text-sm grid grid-cols-7 items-center justify-between bg-gray-100 py-1 text-gray-800'>
                    <div className='col-span-3 w-full pl-4'>
                        Tazim Hazam Sakib*
                    </div>
                    <div className='col-span-1 w-full'>
                        8
                    </div>
                    <div className='col-span-1 w-full'>
                        8
                    </div>
                    <div className='col-span-1 w-full'>
                        1
                    </div>
                    <div className='col-span-1 w-full'>
                        1
                    </div>
                </div>
                <div className='col-span-6 w-full text-sm grid grid-cols-7 items-center justify-between bg-gray-100 py-1'>
                    <div className='col-span-3 w-full pl-4'>
                        Towhid Hridoy
                    </div>
                    <div className='col-span-1 w-full'>
                        63
                    </div>
                    <div className='col-span-1 w-full'>
                        42
                    </div>
                    <div className='col-span-1 w-full'>
                        5
                    </div>
                    <div className='col-span-1 w-full'>
                        1
                    </div>
                </div>
            </section>

            {/* 24 Balls  */}
            <section className='w-full grid grid-cols-4 items-center justify-between bg-gray-200 py-1 rounded-md border border-gray-300 mb-1' >
                <div className='col-span-1 w-full pl-4 font-bold'>
                    24 Balls
                </div>
                <div className='col-span-3 text-xs w-full flex items-center justify-start overflow-x-scroll'>
                    <span className='w-4 h-5 border-gray-400 rounded-md border flex items-center justify-center bg-gray-300'>
                        6
                    </span>
                </div>
            </section>
            <section className='w-full grid grid-cols-5 items-center justify-between bg-gray-200 py-1 rounded-md border border-gray-300 ' >
                <div className='col-span-1 w-full pl-4 font-bold'>
                    Extras
                </div>
                <div className='flex space-x-1 flex-wrap items-center col-span-4'>
                    <span>
                        11
                    </span>
                    <div className='flex items-center justify-start overflow-x-scroll'>
                        (b 0, lb 4, wd 6, nb 1, P 0)
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PlayerScores
