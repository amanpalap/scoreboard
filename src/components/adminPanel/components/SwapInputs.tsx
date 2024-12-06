'use client'
import React, { useState } from 'react';
import { IoMdSwap } from 'react-icons/io';

const SwapInputs = () => {
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

    const [striker, setStriker] = useState('');
    const [nonStriker, setNonStriker] = useState('');
    const [bowler, setBowler] = useState('')

    const swapNames = () => {
        setStriker(nonStriker);
        setNonStriker(striker);
    };

    return (
        <div className="grid grid-cols-3 items-center space-x-2 w-full">
            <section className='col-span-2 grid grid-cols-11 items-center justify-between'>
                <div className='col-span-5'>
                    <label className='w-full'>Batsman (Striker) </label>
                    <select
                        name="striker"
                        value={striker}
                        onChange={(e) => setStriker(e.target.value)}
                        className='cursor-pointer w-full p-2 rounded-lg border'
                    >
                        <option value="">Select Striker</option>
                        {players.map((player, index) => (
                            <option key={index} value={player}>
                                {player}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-span-1 flex items-end h-full justify-center  pb-2'>
                    <IoMdSwap className="text-red-500 w-6 h-6 cursor-pointer col-span-1" onClick={swapNames} />
                </div>
                <div className='col-span-5'>
                    <label className='w-full'>Batsman (Non-Striker) </label>
                    <select
                        name="nonStriker"
                        value={nonStriker}
                        onChange={(e) => setNonStriker(e.target.value)}
                        className='cursor-pointer w-full p-2 rounded-lg border'
                    >
                        <option value="">Select Non-Striker</option>
                        {players.map((player, index) => (
                            <option key={index} value={player}>
                                {player}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <section className='col-span-1'>
                <label className='w-full'>Bowler </label>
                <select
                    name="bowler"
                    value={bowler}
                    onChange={(e) => setBowler(e.target.value)}
                    className='cursor-pointer w-full p-2 rounded-lg border'
                >
                    <option value="">Select bowler</option>
                    {players.map((player, index) => (
                        <option key={index} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            </section>
        </div>
    );
};

export default SwapInputs;
