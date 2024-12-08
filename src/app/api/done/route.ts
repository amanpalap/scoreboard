import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { BoardModel } from "@/models/board";
import { TeamModel } from "@/models/team";
import { PlayerModel } from "@/models/player";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json();

        // Extract FormData fields
        const {
            ballStart,
            commentry,
            last24Balls,
            extras,
            striker,
            nonStriker,
            bowler,
            lastBowler,
            teamA,
            teamB,
        } = body;

        // Validate required fields
        if (!teamA?.name || !teamB?.name) {
            return NextResponse.json(
                { success: false, message: "Team names are required." },
                { status: 400 }
            );
        }

        // Save Team A
        let savedTeamA = await TeamModel.findOne({ name: teamA.name });
        if (!savedTeamA) {
            savedTeamA = new TeamModel({
                name: teamA.name,
                runs: teamA.runs,
                wickets: teamA.wickets,
                over: teamA.over,
                extras: extras,
                players: [],
            });
            await savedTeamA.save();
        }

        // Save or Create Striker
        let strikerPlayer = await PlayerModel.findOne({ name: striker.name });
        if (!strikerPlayer) {
            strikerPlayer = new PlayerModel({
                name: striker.name,
                runsScored: striker.runs,
                ballsFaced: striker.ballsFaced,
                fours: nonStriker.fours,
                type: "batter",
                wickets: 0,
                out: "notOut",
            });
            await strikerPlayer.save();
        }
        if (!savedTeamA.players.includes(strikerPlayer._id)) {
            savedTeamA.players.push(strikerPlayer._id);
        }

        // Save or Create Non-Striker
        let nonStrikerPlayer = await PlayerModel.findOne({ name: nonStriker.name });
        if (!nonStrikerPlayer) {
            nonStrikerPlayer = new PlayerModel({
                name: nonStriker.name,
                runsScored: nonStriker.runs,
                ballsFaced: nonStriker.ballsFaced,
                fours: nonStriker.fours,
                type: "batter",
                wickets: 0,
                out: "notOut",
            });
            await nonStrikerPlayer.save();
        }
        if (!savedTeamA.players.includes(nonStrikerPlayer._id)) {
            savedTeamA.players.push(nonStrikerPlayer._id);
        }

        // Save Team A updates
        await savedTeamA.save();

        // Save Team B
        let savedTeamB = await TeamModel.findOne({ name: teamB.name });
        if (!savedTeamB) {
            savedTeamB = new TeamModel({
                name: teamB.name,
                runs: teamB.runs,
                wickets: teamB.wickets,
                over: teamB.over,
                players: [],
            });
            await savedTeamB.save();
        }

        // Save or Create Bowler
        let bowlerPlayer = await PlayerModel.findOne({ name: bowler.name });
        if (!bowlerPlayer) {
            bowlerPlayer = new PlayerModel({
                name: bowler.name,
                runsGiven: [bowler.runs],
                type: "bowler",
                wickets: bowler.wickets,
                out: "notPlayed",
            });
            await bowlerPlayer.save();
        }
        if (!savedTeamB.players.includes(bowlerPlayer._id)) {
            savedTeamB.players.push(bowlerPlayer._id);
        }

        // Save Team B updates
        await savedTeamB.save();

        // Map commentary
        const commentary = commentry.map((item: any) => ({
            run: item.run.toString(),
            over: item.ball || 0,
            dialogue: item.dialogue,
        }));

        // Create the Board document
        const board = new BoardModel({
            teamA: savedTeamA._id,
            teamB: savedTeamB._id,
            batsman: [strikerPlayer.name, nonStrikerPlayer.name],
            strike: ballStart ? 1 : 0,
            commentary,
            extras: extras,
            last24Balls: last24Balls,
            winner: null, // You can determine the winner if necessary
        });

        await board.save(); // Save the document to the database

        return NextResponse.json(
            {
                success: true,
                message: "Board data saved successfully.",
                data: board,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Failed to save board data", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to save board data.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
