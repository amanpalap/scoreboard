import AdminPanel from '@/components/adminPanel/AdminPanel'
import Board from '@/components/board/Board'
import { FormData } from '@/types/formTypes'
import React, { useState } from 'react'

const Home = () => {
    const [formData, setFormData] = useState<FormData>({
        ballStart: false,
        commentry: '',
        wide: false,
        noBall: false,
        run: '',
        extras: []
    })

    return (
        <div className='grid grid-cols-7 items-start justify-center p-4 max-h-screen gap-x-2'>
            <AdminPanel
                formData={formData}
                setFormData={setFormData}
            />
            <Board
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    )
}

export default Home
