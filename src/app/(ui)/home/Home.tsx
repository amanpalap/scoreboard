import AdminPanel from '@/components/adminPanel/AdminPanel'
import React from 'react'

const Home = () => {
    return (
        <div className='grid grid-cols-7 items-start justify-center p-4 max-h-screen '>
            <AdminPanel />
        </div>
    )
}

export default Home
