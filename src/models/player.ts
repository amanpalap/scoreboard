import mongoose, { Schema, Document } from "mongoose";

export interface Player extends Document {
    name: string;
    runsScored: number;
    runsGiven: number[];
    ballsFaced: number
    fours: number
    type: string;
    wickets: number;
    out: string;
}

const playerSchema: Schema<Player> = new mongoose.Schema({
    name: {
        type: String,
    },
    runsScored: {
        type: Number,
        default: 0,
    },
    runsGiven: {
        type: [Number],
        default: [],
    },
    ballsFaced: {
        type: Number,
        default: 0
    },
    fours: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ["batter", "bowler", "allrounder"],
    },
    wickets: {
        type: Number,
        default: 0,
    },
    out: {
        type: String,
        enum: ["out", "notOut", "notPlayed"],
    },
});

export const PlayerModel =
    mongoose.models.Player || mongoose.model<Player>("Player", playerSchema);
