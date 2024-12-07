import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import TeamScores from './components/TeamScores'
import PlayerScores from './components/PlayerScores'
import SelectSearch from './components/SelectSearch'
import Commentry from './components/Commentry'
import { FormData } from '@/types/formTypes'

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const Board: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    return (
        <div className='w-full col-span-2 bg-gray-100 border rounded-lg h-full p-1.5 overflow-hidden'>
            <section className='flex flex-wrap items-center cursor-pointer w-full mb-1.5'>
                <RiArrowDropDownLine className='w-8 h-8' />
                <p>Scorecard</p>
            </section>
            <TeamScores
                formData={formData}
                setFormData={setFormData}
            />
            <PlayerScores
                formData={formData}
                setFormData={setFormData}
            />
            <SelectSearch
                formData={formData}
                setFormData={setFormData}
            />
            <Commentry
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    )
}

export default Board
