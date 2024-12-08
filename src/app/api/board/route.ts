import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { BoardModel } from "@/models/board";
import { TeamModel } from "@/models/team";
import { PlayerModel } from "@/models/player";

export async function GET() {
    await dbConnect();

    try {
        // Fetch the board document
        const board = await BoardModel.findOne({});
        if (!board) {
            return NextResponse.json(
                { success: false, message: "Board not found." },
                { status: 404 }
            );
        }

        // Fetch teamA and teamB from the Team collection
        const [teamA, teamB] = await Promise.all([
            TeamModel.findById(board.teamA[0])
                .populate("players"), // Populate players array
            TeamModel.findById(board.teamB[0])
                .populate("players"), // Populate players array
        ]);

        if (!teamA || !teamB) {
            return NextResponse.json(
                { success: false, message: "Teams not found." },
                { status: 404 }
            );
        }

        // Format the response
        const response = {
            ballStart: board.strike === 1,
            commentary: board.commentary.map((c: any) => ({
                run: parseInt(c.run),
                ball: c.over,
                dialogue: c.dialogue,
            })),
            last24Balls: board.last24Balls,
            extras: board.extras,
            batsmen: board.batsman,
            teamA: {
                name: teamA.name,
                runs: teamA.runs,
                wickets: teamA.wickets,
                over: teamA.over,
                extras: teamA.extras,
                players: teamA.players.map((player: any) => ({
                    name: player.name,
                    runsScored: player.runsScored,
                    type: player.type,
                    wickets: player.wickets,
                    out: player.out,
                })),
            },
            teamB: {
                name: teamB.name,
                runs: teamB.runs,
                wickets: teamB.wickets,
                over: teamB.over,
                extras: teamB.extras,
                players: teamB.players.map((player: any) => ({
                    name: player.name,
                    runsScored: player.runsScored,
                    type: player.type,
                    wickets: player.wickets,
                    out: player.out,
                })),
            },
        };

        return NextResponse.json({ success: true, data: response }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching board data:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch board data.", error: error.message },
            { status: 500 }
        );
    }
}
