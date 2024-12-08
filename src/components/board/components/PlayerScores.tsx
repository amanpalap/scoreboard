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
                        {formData.striker.name}*
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.striker.runs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.striker.ballsFaced}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.striker.fours}
                    </div>
                </div>
                <div className='w-full text-sm grid grid-cols-6 items-center justify-between bg-gray-100 py-1'>
                    <div className='col-span-3 w-full pl-4'>
                        {formData.nonStriker.name}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.nonStriker.runs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.nonStriker.ballsFaced}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.nonStriker.fours}
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
                        {formData.bowler.name}*
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.bowler.overs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.bowler.maiden}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.bowler.runs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.bowler.wickets}
                    </div>
                </div>
                <div className='col-span-6 w-full text-sm grid grid-cols-7 items-center justify-between bg-gray-100 py-1'>
                    <div className='col-span-3 w-full pl-4'>
                        {formData.lastBowler.name}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.lastBowler.overs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.lastBowler.maiden}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.lastBowler.runs}
                    </div>
                    <div className='col-span-1 w-full'>
                        {formData.lastBowler.wickets}
                    </div>
                </div>
            </section>

            {/* 24 Balls  */}
            <section className='w-full grid grid-cols-4 items-center justify-between bg-gray-200 py-1 rounded-md border border-gray-300 mb-1' >
                <div className='col-span-1 w-full pl-4 font-bold'>
                    24 Balls
                </div>
                <div className='col-span-3 text-xs w-full flex space-x-1 items-center justify-start overflow-x-scroll'>
                    {formData.last24Balls.map((item, idx) => (
                        <span
                            key={idx}
                            className='px-1 h-5 border-gray-400 rounded-md border flex items-center justify-center bg-gray-300'>
                            {item}
                        </span>
                    ))}
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
                        (b {formData.extras[0]}, lb {formData.extras[1]}, wd {formData.extras[2]}, nb {formData.extras[3]}, P {formData.extras[4]})
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PlayerScores
