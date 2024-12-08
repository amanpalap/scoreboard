import { Bangladesh, India } from '@/Svgs'
import { FormData } from '@/types/formTypes'
import React from 'react'

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const TeamScores: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    // const [playing, setPlaying] = useState(f)
    return (
        <div className='grid grid-cols-7 text-sm items-center justify-center rounded-t-md border mb-1'>
            <div className='w-full col-span-7 px-2 text-right font-bold text-blue-500 bg-gray-200 py-2 rounded-t-md'>
                View Full Score Card
            </div>
            <section className='flex flex-wrap items-center justify-center w-full col-span-3'>
                <div className='w-full flex items-center justify-center flex-wrap space-y-1 py-2'>
                    <h3 className='w-full text-center'>{formData.teamA.name}</h3>
                    <India className='w-8 h-8 rounded-full border' />
                    <div className='flex w-full flex-wrap items-center justify-center  rounded-lg py-1 px-2'>
                        <div className='flex flex-wrap items-center justify-center text-center rounded-lg border px-2'>
                            <div>{formData.teamA.runs}/{formData.teamA.wickets}<br />
                                Over {formData.teamA.over}</div>
                        </div>
                    </div>

                </div>
            </section>
            <section className='flex flex-wrap items-center text-red-500 font-extrabold justify-center w-full col-span-1'>
                vs
            </section>
            <section className='flex flex-wrap items-center justify-center w-full col-span-3'>
                <div className='w-full flex items-center justify-center flex-wrap space-y-1 py-2'>
                    <h3 className='w-full text-center'>{formData.teamB.name}</h3>
                    <Bangladesh className='w-8 h-8 rounded-full border' />
                    <div className='flex w-full flex-wrap items-center justify-center  rounded-lg py-1 px-2'>
                        <div className='flex flex-wrap items-center justify-center text-center rounded-lg border px-2'>
                            <div>{formData.teamB.runs}/{formData.teamB.wickets}<br />
                                Over {formData.teamB.over}</div>
                        </div>
                    </div>

                </div>
            </section>
            <div className='w-full col-span-7 px-2 text-center font-bold bg-gray-300 overflow-hidden py-1'>
                Match in Progress
            </div>
        </div>
    )
}

export default TeamScores
