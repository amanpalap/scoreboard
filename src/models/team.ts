import mongoose, { Schema, Document } from "mongoose";
import { Player } from "./player";

export interface Team extends Document {
    name: string;
    players: Player[];
    runs: number;
    wickets: number;
    extras: string[];
    over: number;
}

const teamSchema: Schema<Team> = new mongoose.Schema({
    name: {
        type: String,
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
    ],
    runs: {
        type: Number,
        default: 0,
    },
    wickets: {
        type: Number,
        default: 0,
    },
    extras: {
        type: [String],
        default: [],
    },
    over: {
        type: Number,
        default: 0,
    },
});

export const TeamModel =
    mongoose.models.Team || mongoose.model<Team>("Team", teamSchema);
