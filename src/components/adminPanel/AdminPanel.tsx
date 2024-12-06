import React from 'react'
import SwapInputs from './components/SwapInputs'
import ControlPanel from './components/ControlPanel'

const AdminPanel = () => {
    return (
        <section className='w-full col-span-5 py-1 flex flex-wrap space-y-3 items-center justify-between border rounded-lg h-full'>
            <SwapInputs />
            <ControlPanel />
        </section>
    )
}

export default AdminPanel
