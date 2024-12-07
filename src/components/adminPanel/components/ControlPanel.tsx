import React from 'react';
import { FormData } from '@/types/formTypes';

interface AdminPanelProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ControlPanel: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {
    // Helper to update ball count
    const updateBallCount = (currentBall: number, increment: boolean = true) => {
        if (!increment) return parseFloat((currentBall - 0.1).toFixed(1));
        return currentBall + 0.1 >= Math.floor(currentBall) + 0.6
            ? Math.floor(currentBall) + 1
            : parseFloat((currentBall + 0.1).toFixed(1));
    };

    // Handle start of a ball
    const handleBallStart = () => {
        setFormData((prevState) => ({
            ...prevState,
            commentry: {
                ...prevState.commentry,
                dialogue: `${prevState.bowler.name} to ${prevState.striker.name}: `,
            },
        }));
    };

    // Handle wide ball
    const handleWide = () => {
        setFormData((prevState) => {
            const updatedExtras: [number, number, number, number, number] = [
                prevState.extras[0],
                prevState.extras[1],
                prevState.extras[2] + 1,
                prevState.extras[3],
                prevState.extras[4],
            ];

            return {
                ...prevState,
                commentry: {
                    ...prevState.commentry,
                    dialogue: `${prevState.commentry.dialogue || ''} wide ball `,
                    run: prevState.commentry.run + 1,
                },
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + 1, // Increment team runs for wide
                },
                extras: updatedExtras, // Update wide count in extras
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + 1
                },
                ballStart: false
            };
        });
    };

    // Handle no-ball
    const handleNoBall = () => {
        setFormData((prevState) => {
            const updatedExtras: [number, number, number, number, number] = [
                prevState.extras[0],
                prevState.extras[1], // Increment no-ball count
                prevState.extras[2],
                prevState.extras[3] + 1,
                prevState.extras[4],
            ];

            return {
                ...prevState,
                commentry: {
                    ...prevState.commentry,
                    dialogue: `${prevState.commentry.dialogue || ''} no ball `,
                    run: prevState.commentry.run + 1,
                },
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + 1, // Increment team runs for no-ball
                },
                extras: updatedExtras,
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + 1
                },
            };
        });
    };

    const handleRuns = (run: number) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                commentry: {
                    ...prevState.commentry,
                    dialogue: `${prevState.commentry.dialogue} ${run} run`,
                    run: prevState.commentry.run + run,
                },
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + run,
                    over: updateBallCount(prevState.teamA.over)
                },
                striker: {
                    ...prevState.striker,
                    runs: prevState.striker.runs + run,
                    ballsFaced: updateBallCount(prevState.striker.ballsFaced)
                },
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + run,
                    overs: updateBallCount(prevState.bowler.overs)
                },
            };
        });
    }

    const handleCommentry = (dialogue: string) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                commentry: {
                    ...prevState.commentry,
                    dialogue: `${prevState.commentry.dialogue} ${dialogue}`,
                },
            };
        });
    }

    return (
        <div className='flex flex-wrap items-center justify-center space-y-1'>
            {/* Section 1 */}
            <div className='w-full grid grid-cols-4 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-3 items-center gap-y-1 text-gray-50 font-bold'>
                    <button
                        className='w-full bg-green-700 rounded-lg h-20 hover:bg-green-500 hover:scale-95 transition-all'
                        onClick={handleBallStart}
                    >
                        Ball Start
                    </button>
                    <button
                        className='w-full bg-yellow-700 rounded-lg h-20 hover:bg-orange-500 hover:scale-95 transition-all'
                        onClick={handleWide}>
                        Wide
                    </button>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-20 hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={handleNoBall}>
                        No Ball
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-blue-700 rounded-lg h-full hover:bg-blue-500 hover:scale-95 transition-all'
                        onClick={() => handleRuns(0)}
                    >
                        0
                    </button>
                    <button
                        className='w-full bg-cyan-700 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'
                        onClick={() => handleRuns(2)}
                    >
                        2
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={() => handleRuns(1)}
                    >
                        1
                    </button>
                    <button
                        className='w-full bg-green-300 rounded-lg h-full hover:bg-green-200 hover:scale-95 transition-all'
                        onClick={() => handleRuns(4)}
                    >
                        4
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Out!")}
                    >
                        Wicket
                    </button>
                    <button
                        className='w-full bg-gray-400 rounded-lg h-full hover:bg-gray-300 hover:scale-95 transition-all'
                        onClick={() => handleRuns(6)}
                    >
                        6
                    </button>
                </section>
            </div>

            {/* Section 2 */}
            <div className='w-full grid grid-cols-5 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button
                        className='w-full bg-purple-800 rounded-lg h-20 hover:bg-purple-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Bowler Stops ?")}
                    >
                        Bowler Stop
                    </button>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-20 hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("other")}
                    >
                        Other
                    </button>
                </section>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button
                        className='w-full bg-blue-700 rounded-lg h-20 hover:bg-blue-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("1 or 2")}

                    >
                        1 or 2
                    </button>
                    <button
                        className='w-full bg-purple-800 rounded-lg h-20 hover:bg-purple-700 hover:scale-95 transition-all'
                        onClick={() => handleRuns(3)}
                    >
                        3
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("2 or 4")}

                    >
                        2 or 4
                    </button>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Boundary Check")}
                    >
                        Boundary Check
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-yellow-800 rounded-lg h-full hover:bg-yellow-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("4 or 6")}
                    >
                        4 or 6
                    </button>
                    <button
                        className='w-full bg-cyan-600 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Appeal")}
                    >
                        Appeal
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Ball in Air")}
                    >
                        Ball in Air
                    </button>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Catch Drop")}
                    >
                        Catch Drop
                    </button>
                </section>
            </div>

            {/* Section 3 */}
            <div className='w-full grid grid-cols-4 px-1 gap-x-1 text-xl font-bold'>
                <section className='grid grid-rows-2 items-center gap-y-1 text-gray-50 font-bold'>
                    <button
                        className='w-full bg-blue-400 rounded-lg h-20 hover:bg-blue-300 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Leg Bye")}
                    >
                        Leg Bye
                    </button>
                    <button
                        className='w-full bg-green-900 rounded-lg h-20 hover:bg-green-800 hover:scale-95 transition-all'
                    >
                        Done
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-green-600 rounded-lg h-full hover:bg-green-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Bye")}
                    >
                        bye
                    </button>
                    <button
                        className='w-full bg-teal-900 rounded-lg h-full hover:bg-teal-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Misfield")}
                    >
                        Misfield
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-cyan-600 rounded-lg h-full hover:bg-cyan-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Third Umpire")}

                    >
                        Third Umpire
                    </button>
                    <button
                        className='w-full bg-purple-800 rounded-lg h-full hover:bg-purple-700 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Overthrow")}

                    >
                        Overthrow
                    </button>
                </section>
                <section className='grid text-white grid-rows-2 items-center gap-y-1 w-full'>
                    <button
                        className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Review")}

                    >
                        Review
                    </button>
                    <button
                        className='w-full bg-red-600 rounded-lg h-full hover:bg-red-500 hover:scale-95 transition-all'
                        onClick={() => handleCommentry("Wicket Confirm")}
                    >
                        Wicket Confirm
                    </button>
                </section>
            </div>
        </div>
    );
}

export default ControlPanel;
