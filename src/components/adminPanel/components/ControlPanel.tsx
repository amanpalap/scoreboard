'use client'
import React, { useState } from 'react';
import { FormData } from '@/types/formTypes';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface AdminPanelProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ControlPanel: React.FC<AdminPanelProps> = ({ formData, setFormData }) => {

    const [over, setOver] = useState(false)

    const updateLast24Balls = (last24Balls: string[], newBall: string): string[] => {
        if (last24Balls.length >= 24) {
            last24Balls.shift();
        }
        return [...last24Balls, newBall];
    };

    // Helper to update ball count
    const updateBallCount = (currentBall: number, increment: boolean = true) => {
        if (!increment) return parseFloat((currentBall).toFixed(1));

        return currentBall + 0.1 >= Math.floor(currentBall) + 0.6
            ? Math.floor(currentBall) + 1
            : parseFloat((currentBall + 0.1).toFixed(1));
    };

    // Handle start of a ball
    const handleBallStart = () => {
        setFormData((prevState) => {
            setOver(true)
            const newCommentry = {
                run: 0,
                dialogue: `${prevState.bowler.name} to ${prevState.striker.name}: `,
            };

            return {
                ...prevState,
                commentry: [...prevState.commentry, newCommentry],
            };
        });
    };


    // Handle wide ball
    const handleWide = () => {
        setFormData((prevState) => {
            // Increment the wide count in extras
            const updatedExtras: [number, number, number, number, number] = [
                prevState.extras[0],
                prevState.extras[1],
                prevState.extras[2] + 1, // Increment wide count
                prevState.extras[3],
                prevState.extras[4],
            ];

            const updatedLast24Balls = updateLast24Balls(prevState.last24Balls, 'wd')
            // Create a new commentry array with the last object modified
            const updatedCommentry = [...prevState.commentry];
            if (updatedCommentry.length > 0) {
                const lastIndex = updatedCommentry.length - 1;
                updatedCommentry[lastIndex] = {
                    ...updatedCommentry[lastIndex],
                    run: updatedCommentry[lastIndex].run + 1, // Increment run count for wide
                    ball: prevState.teamA.over,
                    dialogue: `${updatedCommentry[lastIndex].dialogue} wide ball`,
                };
            }

            return {
                ...prevState,
                commentry: updatedCommentry,
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + 1, // Increment team runs for wide
                },
                extras: updatedExtras, // Update extras for wide
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + 1, // Add run to bowler's tally
                },
                last24Balls: updatedLast24Balls,
            };
        });
    };



    // Handle no-ball
    const handleNoBall = () => {
        setFormData((prevState) => {
            const updatedOver = updateBallCount(prevState.teamA.over)
            // Increment no-ball count and update extras
            const updatedExtras: [number, number, number, number, number] = [
                prevState.extras[0],
                prevState.extras[1], // Increment no-ball count
                prevState.extras[2],
                prevState.extras[3] + 1,
                prevState.extras[4],
            ];

            const updatedLast24Balls = updateLast24Balls(prevState.last24Balls, 'nb')
            // Modify the last commentary entry
            const updatedCommentry = [...prevState.commentry];
            if (updatedCommentry.length > 0) {
                const lastIndex = updatedCommentry.length - 1;
                updatedCommentry[lastIndex] = {
                    ...updatedCommentry[lastIndex],
                    run: updatedCommentry[lastIndex].run + 1, // Add one run for no-ball
                    ball: prevState.teamA.over,
                    dialogue: `${updatedCommentry[lastIndex].dialogue} no ball `,
                };
            }

            return {
                ...prevState,
                commentry: updatedCommentry,
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + 1, // Increment team runs for no-ball
                },
                extras: updatedExtras,
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + 1, // Add run to the bowler's tally
                },
                last24Balls: updatedLast24Balls,
            };
        });
    };

    const handleRuns = (run: number) => {
        setFormData((prevState) => {
            // Update the ball count for striker, bowler, and over
            const updatedLast24Balls = over ? updateLast24Balls(prevState.last24Balls, run.toString()) : prevState.last24Balls
            const updatedOver = over ? updateBallCount(prevState.teamA.over) : updateBallCount(prevState.teamA.over, false);
            const updatedBallsFaced = updateBallCount(prevState.striker.ballsFaced);
            const updatedBowlerOvers = updateBallCount(prevState.bowler.overs);

            // Modify the last commentary entry
            const updatedCommentry = [...prevState.commentry];
            if (updatedCommentry.length > 0) {
                const lastIndex = updatedCommentry.length - 1;
                updatedCommentry[lastIndex] = {
                    ...updatedCommentry[lastIndex],
                    run: updatedCommentry[lastIndex - 1].run + run, // Increment the run count
                    ball: updatedOver, // Increment ball count for commentary
                    dialogue: `${updatedCommentry[lastIndex].dialogue} ${run} run`, // Append run info
                };
            }

            return {
                ...prevState,
                commentry: updatedCommentry,
                teamA: {
                    ...prevState.teamA,
                    runs: prevState.teamA.runs + run, // Increment team's runs
                    over: updatedOver, // Update the over count
                },
                striker: {
                    ...prevState.striker,
                    runs: prevState.striker.runs + run, // Increment striker's runs
                    ballsFaced: updatedBallsFaced, // Update striker's balls faced
                },
                bowler: {
                    ...prevState.bowler,
                    runs: prevState.bowler.runs + run, // Add runs to bowler's tally
                    overs: updatedBowlerOvers, // Update bowler's overs
                },
                last24Balls: updatedLast24Balls,
            };
        })
        setOver(false);
    };


    const handleCommentry = (dialogue: string) => {
        setFormData((prevState) => {
            // Check if the commentry array has entries
            const lastCommentary =
                prevState.commentry.length > 0
                    ? prevState.commentry[prevState.commentry.length - 1]
                    : { run: 0, ball: 0, dialogue: '' };

            return {
                ...prevState,
                commentry: [
                    ...prevState.commentry.slice(0, -1), // Keep all but the last entry
                    {
                        ...lastCommentary,
                        dialogue: `${lastCommentary.dialogue} ${dialogue}`, // Append the new dialogue
                    },
                ],
            };
        });
    };

    const saveBoardData = async () => {
        try {
            const response = await axios.post('/api/done', formData);
            const data = response.data
            console.log(data)
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.success("Failed to save Data")
            }
        } catch (error: any) {
            console.error('Error saving board data:', error.response?.data || error.message);
            toast.error('Failed to save data');
            throw error;
        }
    };

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
                        onClick={saveBoardData}
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
