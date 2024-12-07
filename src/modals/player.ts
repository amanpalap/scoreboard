import mongoose, { Schema, Document } from "mongoose";

export interface Player extends Document {
    name: string;
    runsScored: number;
    runsGiven: number[];
    type: string;
    wickets: number;
    out: boolean;
    active: string;
}

const playerSchema: Schema<Player> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    runsScored: {
        type: Number,
        default: 0,
    },
    runsGiven: {
        type: [Number],
        default: [],
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
        type: Boolean,
        default: false,
    },
    active: {
        type: String,
        enum: ["batting", "bowling", "fielding", "0"],
        default: "0"
    }
});

export const PlayerModel = mongoose.model<Player>("Player", playerSchema);
