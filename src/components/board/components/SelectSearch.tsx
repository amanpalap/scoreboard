'use client'
import { FormData } from '@/types/formTypes';
import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const SelectSearch: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

    const [team, setTeam] = useState('');
    const [nonteam, setNonteam] = useState('');
    const [search, setSearch] = useState('')

    return (
        <div className="flex flex-wrap items-center justify-center w-full mt-2 text-sm"  >
            <section className='grid grid-cols-2 items-center justify-between w-full gap-x-1'>
                <div className='col-span-1'>
                    <select
                        name="team"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className='cursor-pointer w-full px-2 py-1 rounded-lg border'
                    >
                        <option value="">Select team</option>
                        {players.map((player, index) => (
                            <option key={index} value={player}>
                                {player}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-span-1'>
                    <select
                        name="nonteam"
                        value={nonteam}
                        onChange={(e) => setNonteam(e.target.value)}
                        className='cursor-pointer w-full px-2 py-1 rounded-lg border'
                    >
                        <option value="">Select Non-team</option>
                        {players.map((player, index) => (
                            <option key={index} value={player}>
                                {player}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <section className='mt-1 w-full grid grid-cols-8 items-center justify-center gap-x-1'>
                <div className='col-span-7 relative'>
                    <IoMdSearch className='absolute w-5 h-5 top-1 left-2' />
                    <input
                        type="text"
                        placeholder="default size"
                        className="border w-full py-1 rounded-md pl-8 font-light focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                </div>
                <button className='col-span-1 bg-red-500 rounded-md w-full h-full text-gray-100'>
                    X
                </button>
            </section>
        </div>
    );
};

export default SelectSearch;
