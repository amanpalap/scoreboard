import mongoose, { Schema, Document } from "mongoose";

export interface Player extends Document {
    name: string;
    runsScored: number;
    runsGiven: number[]; // Correct type
    type: string;
    wickets: number;
    out: boolean; // Should be boolean
    active: boolean
}

const playerSchema: Schema<Player> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    runsScored: {
        type: Number,
        required: true,
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
        type: Boolean,
        default: true,
    }
});

export const PlayerModel = mongoose.model<Player>("Player", playerSchema);
