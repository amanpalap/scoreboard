'use client'
import AdminPanel from '@/components/adminPanel/AdminPanel'
import Board from '@/components/board/Board'
import { FormData } from '@/types/formTypes'
import React, { useState } from 'react'

const Home = () => {
    const [formData, setFormData] = useState<FormData>({
        ballStart: false,
        commentry: {
            run: 0,
            ball: 0,
            dialogue: ''
        },
        last24Balls: [],
        extras: [0, 0, 0, 0, 0],
        striker: {
            name: '',
            runs: 0,
            ballsFaced: 0,
            fours: 0
        },
        nonStriker: {
            name: '',
            runs: 0,
            ballsFaced: 0,
            fours: 0
        },
        bowler: {
            name: '',
            runs: 0,
            overs: 0,
            wickets: 0,
            maiden: 0
        },
        lastBowler: {
            name: 'Starc',
            runs: 0,
            overs: 0,
            wickets: 0,
            maiden: 0
        },
        teamA: {
            name: 'IND',
            runs: 0,
            wickets: 0,
            over: 0
        },
        teamB: {
            name: 'BAN',
            runs: 0,
            wickets: 0,
            over: 0
        }
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
