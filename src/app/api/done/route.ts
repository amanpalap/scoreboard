import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { TeamModel } from '@/models/team'; // Import TeamModel
import { PlayerModel } from '@/models/player'; // Assuming PlayerModel exists for reference validation

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json(); // Parse the request body

        const { name, players, runs, wickets, extras, over } = body;

        // Basic validation
        if (!name || !Array.isArray(players) || players.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Team name and players are required.' },
                { status: 400 }
            );
        }

        // Validate referenced players
        const playerValidation = await PlayerModel.find({ _id: { $in: players } });
        if (playerValidation.length !== players.length) {
            return NextResponse.json(
                { success: false, message: 'Some player IDs are invalid.' },
                { status: 400 }
            );
        }

        // Create a new Team document
        const team = new TeamModel({
            name,
            players,
            runs: runs || 0,
            wickets: wickets || 0,
            extras: extras || [],
            over: over || 0,
        });

        await team.save(); // Save the document

        return NextResponse.json(
            { success: true, message: 'Team data saved successfully.', data: team },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Failed to save team data", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to save team data",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
