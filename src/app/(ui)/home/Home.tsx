import AdminPanel from '@/components/adminPanel/AdminPanel'
import Board from '@/components/board/Board'
import React from 'react'

const Home = () => {
    return (
        <div className='grid grid-cols-7 items-start justify-center p-4 max-h-screen gap-x-2'>
            <AdminPanel />
            <Board />
        </div>
    )
}

export default Home
