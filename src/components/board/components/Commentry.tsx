import { FormData } from '@/types/formTypes'
import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const Commentry: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    return (
        <div className='w-full border-t h-full border-gray-300 py-2 mt-3 text-sm overflow-x-scroll max-h-40'>
            <div className='w-full grid grid-cols-8 items-center justify-center px-2 gap-x-1 mb-1'>
                {/* Runs  */}
                <section className='col-span-1 aspect rounded-full h-11  font-medium flex items-center justify-center bg-green-300 w-full'>
                    {formData.commentry.run}
                </section>
                {/* Over  */}
                <section className='col-span-1 font-medium flex items-center justify-center w-full'>
                    {formData.commentry.ball}
                </section>
                {/* Commentry  */}
                <section className='col-span-5 flex items-center  w-full'>
                    {formData.commentry.dialogue}
                </section>
                {/* options  */}
                <section className='col-span-1 cursor-pointer h-full flex items-center justify-center w-full'>
                    <BiDotsVerticalRounded className='w-5 h-5' />
                </section>
            </div>
        </div>
    )
}

export default Commentry
