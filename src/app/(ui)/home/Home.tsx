'use client';

import AdminPanel from '@/components/adminPanel/AdminPanel';
import Board from '@/components/board/Board';
import { FormData } from '@/types/formTypes';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [formData, setFormData] = useState<FormData>({
        ballStart: false,
        commentry: [],
        last24Balls: [],
        extras: [0, 0, 0, 0, 0],
        striker: {
            name: '',
            runs: 0,
            ballsFaced: 0,
            fours: 0,
        },
        nonStriker: {
            name: '',
            runs: 0,
            ballsFaced: 0,
            fours: 0,
        },
        bowler: {
            name: '',
            runs: 0,
            overs: 0,
            wickets: 0,
            maiden: 0,
        },
        lastBowler: {
            name: '',
            runs: 0,
            overs: 0,
            wickets: 0,
            maiden: 0,
        },
        teamA: {
            name: '',
            runs: 0,
            wickets: 0,
            over: 0,
        },
        teamB: {
            name: '',
            runs: 0,
            wickets: 0,
            over: 0,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/board');
                if (response.data.success) {
                    const data = response.data.data;

                    console.log('Fetched Data:', data);

                    // Ensure teamA structure is valid
                    const teamAPlayers = data?.teamA?.players || [];
                    // const batsmen = [...data?.batsman] || [];

                    console.log('TeamA Players:', teamAPlayers);
                    console.log('Batsmen:', data.batsmen);

                    const striker = teamAPlayers.find(
                        (player: any) => player.name.trim().toLowerCase() === data.batsmen[0]?.trim().toLowerCase()
                    );
                    const nonStriker = teamAPlayers.find(
                        (player: any) => player.name.trim().toLowerCase() === data.batsmen[1]?.trim().toLowerCase()
                    );

                    console.log('Striker:', striker);
                    console.log('NonStriker:', nonStriker);

                    setFormData({
                        ballStart: data?.ballStart,
                        commentry: data?.commentary,
                        last24Balls: data?.last24Balls,
                        extras: data?.extras,
                        striker: {
                            name: striker?.name || '',
                            runs: striker?.runsScored || 0,
                            ballsFaced: striker?.ballsFaced || 0,
                            fours: striker?.fours || 0,
                        },
                        nonStriker: {
                            name: nonStriker?.name || '',
                            runs: nonStriker?.runs || 0,
                            ballsFaced: nonStriker?.ballsFaced || 0,
                            fours: nonStriker?.fours || 0,
                        },
                        bowler: {
                            name: data?.teamB?.players[0]?.name,
                            runs: data?.teamB?.players[0].bowler?.runsGiven,
                            overs: data?.teamB?.players[0].bowler?.over || 3.2,
                            wickets: data?.teamB?.players[0].bowler?.wickets,
                            maiden: data?.teamB?.players[0].bowler?.maiden || 1,
                        },
                        lastBowler: {
                            name: data?.lastBowler?.name,
                            runs: data?.lastBowler?.runs,
                            overs: data?.lastBowler?.overs,
                            wickets: data?.lastBowler?.wickets,
                            maiden: data?.lastBowler?.maiden,
                        },
                        teamA: {
                            name: data?.teamA?.name,
                            runs: data?.teamA?.runs,
                            wickets: data?.teamA?.wickets,
                            over: data?.teamA?.over,
                        },
                        teamB: {
                            name: data?.teamB?.name,
                            runs: data?.teamB?.runs,
                            wickets: data?.teamB?.wickets,
                            over: data?.teamB?.over,
                        },
                    });
                } else {
                    console.error('Error:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };


        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-7 items-start justify-center p-4 max-h-screen gap-x-2'>
            <AdminPanel formData={formData} setFormData={setFormData} />
            <Board formData={formData} setFormData={setFormData} />
        </div>
    );
};

export default Home;
