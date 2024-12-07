import React from 'react'
import SwapInputs from './components/SwapInputs'
import ControlPanel from './components/ControlPanel'
import { FormData } from '@/types/formTypes'

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const AdminPanel: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    return (
        <section className='w-full col-span-5 py-1 flex flex-wrap space-y-3 items-center justify-between border rounded-lg h-full'>
            <SwapInputs
                formData={formData}
                setFormData={setFormData}
            />
            <ControlPanel
                formData={formData}
                setFormData={setFormData}
            />
        </section>
    )
}

export default AdminPanel
