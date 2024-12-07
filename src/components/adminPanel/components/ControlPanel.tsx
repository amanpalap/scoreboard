import { FormData } from '@/types/formTypes';
import React from 'react';

interface AdminPanelProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const ControlPanel: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    return (
        <div className='flex flex-wrap items-center justify-center space-y-1'>
            {/* Section 1 */}
            <div className='w-full grid grid-cols-4 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-3 items-center gap-y-1 text-gray-50 font-bold'>
                    <button className='w-full bg-green-700 rounded-lg h-20 hover:bg-green-500 hover:scale-95 transition-all'>
                        Ball Start
                    </button>
                    <button className='w-full bg-yellow-700 rounded-lg h-20 hover:bg-orange-500 hover:scale-95 transition-all'>
                        Wide
                    </button>
                    <button className='w-full bg-teal-900 rounded-lg h-20 hover:bg-teal-700 hover:scale-95 transition-all'>
                        No Ball
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-blue-700 rounded-lg h-full hover:bg-blue-500 hover:scale-95 transition-all'>
                        0
                    </button>
                    <button className='w-full bg-cyan-700 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'>
                        2
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'>
                        1
                    </button>
                    <button className='w-full bg-green-300 rounded-lg h-full hover:bg-green-200 hover:scale-95 transition-all'>
                        4
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'>
                        Wicket
                    </button>
                    <button className='w-full bg-gray-400 rounded-lg h-full hover:bg-gray-300 hover:scale-95 transition-all'>
                        6
                    </button>
                </section>
            </div>

            {/* Section 2 */}
            <div className='w-full grid grid-cols-5 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button className='w-full bg-purple-800 rounded-lg h-20 hover:bg-purple-700 hover:scale-95 transition-all'>
                        Bowler Stop
                    </button>
                    <button className='w-full bg-teal-900 rounded-lg h-20 hover:bg-teal-700 hover:scale-95 transition-all'>
                        Other
                    </button>
                </section>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button className='w-full bg-blue-700 rounded-lg h-20 hover:bg-blue-500 hover:scale-95 transition-all'>
                        1 or 2
                    </button>
                    <button className='w-full bg-purple-800 rounded-lg h-20 hover:bg-purple-700 hover:scale-95 transition-all'>
                        3
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'>
                        2 or 4
                    </button>
                    <button className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'>
                        Boundary Check
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-yellow-800 rounded-lg h-full hover:bg-yellow-700 hover:scale-95 transition-all'>
                        4 or 6
                    </button>
                    <button className='w-full bg-cyan-600 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'>
                        Appeal
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'>
                        Ball in Air
                    </button>
                    <button className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'>
                        Catch Drop
                    </button>
                </section>
            </div>

            {/* Section 3 */}
            <div className='w-full grid grid-cols-4 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button className='w-full bg-blue-400 rounded-lg h-20 hover:bg-blue-300 hover:scale-95 transition-all'>
                        Leg Bye
                    </button>
                    <button className='w-full bg-green-900 rounded-lg h-20 hover:bg-green-800 hover:scale-95 transition-all'>
                        Done
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-green-600 rounded-lg h-full hover:bg-green-500 hover:scale-95 transition-all'>
                        bye
                    </button>
                    <button className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'>
                        Misfield
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-cyan-600 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'>
                        Third Umpire
                    </button>
                    <button className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'>
                        Overthrow
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'>
                        Review
                    </button>
                    <button className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'>
                        Wicket Confirm
                    </button>
                </section>
            </div>
        </div>
    );
}

export default ControlPanel;
