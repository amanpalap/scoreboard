'use client'
import { OffSwitch } from '@/Svgs';
import { FormData } from '@/types/formTypes';
import React, { useState } from 'react';
import { IoMdSwap } from 'react-icons/io';

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const SwapInputs: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    const players = ['John Smith', 'Steve Johnson', 'James Anderson', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11', 'Player 12'];

    const [isSwitch, setIsSwitch] = useState(false)

    const swapNames = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            striker: prevFormData.nonStriker,
            nonStriker: prevFormData.striker,
        }));
    };

    const handleSwitch = () => {
        setIsSwitch(!isSwitch)
    }

    return (
        <div className="grid grid-cols-3 items-center space-x-2 w-full gap-y-3 px-2" >
            <section className='col-span-2 grid grid-cols-11 items-center justify-between'>
                <div className='col-span-5'>
                    <label className='w-full text-sm font-semibold'>Batsman (Striker) </label>
                    <select
                        name="striker"
                        value={formData.striker.name}
                        onChange={(e) => setFormData((prevState) => ({
                            ...prevState,
                            striker: {
                                ...prevState.striker,
                                name: e.target.value,
                            },
                        }))
                        }
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
                    <label className='w-full text-sm font-semibold'>Batsman (Non-Striker) </label>
                    <select
                        name="nonStriker"
                        value={formData.nonStriker.name}
                        onChange={(e) => setFormData((prevState) => ({
                            ...prevState,
                            nonStriker: {
                                ...prevState.nonStriker,
                                name: e.target.value,
                            },
                        }))
                        } className='cursor-pointer w-full p-2 rounded-lg border'
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
                <label className='w-full text-sm font-semibold'>Bowler </label>
                <select
                    name="bowler"
                    value={formData.bowler.name}
                    onChange={(e) => setFormData((prevState) => ({
                        ...prevState,
                        bowler: {
                            ...prevState.bowler,
                            name: e.target.value,
                        },
                    }))
                    } className='cursor-pointer w-full p-2 rounded-lg border'
                >
                    <option value="">Select bowler</option>
                    {players.map((player, index) => (
                        <option key={index} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            </section>
            <section className='col-span-3 grid grid-cols-2 gap-x-4'>
                <div className='flex flex-wrap items-center justify-start space-y-4 '>
                    <div className='flex flex-wrap items-center justify-start space-x-3 w-full'>
                        <h3 className='font-semibold text-sm'>Score:</h3>
                        <p>score</p>
                    </div>
                    <div className='flex flex-wrap items-center justify-start space-x-3 w-full'>
                        <h3 className='font-semibold text-sm'>Extras:</h3>
                        <p>score</p>
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-center '>
                    <div onClick={handleSwitch} className='cursor-pointer flex flex-wrap items-center justify-center space-y-0 border rounded-lg'>
                        <section className='flex items-center justify-center'>
                            {isSwitch
                                ? <OffSwitch className='w-8 h-8 ' />
                                : <OffSwitch className='w-8 h-8 scale-[-1]' />
                            }
                        </section>
                        <p className='text-xs font-semibold w-full text-center'>Mute & Text Off</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SwapInputs;
