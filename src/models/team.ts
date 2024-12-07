import mongoose, { Schema, Document } from "mongoose";
import { Player } from "./player";

export interface Team extends Document {
    name: string
    players: Player[];
    runs: number;
    wickets: number;
    extras: string[];
    over: number
}

const teamSchema: Schema<Team> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
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
        type: [String], // Array of strings
        default: [],
    },
    over: {
        type: Number,
        default: 0
    }
});

export const TeamModel = mongoose.model<Team>("Team", teamSchema);
