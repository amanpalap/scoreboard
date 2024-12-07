import mongoose, { Schema, Document } from "mongoose";
import { Player } from "./player";

export interface Board extends Document {
    teamA: Player[];
    teamB: Player[];
    batsman: string[];
    strike: number;
    commentary: {
        run: string;
        over: number;
        dialogue: string;
    }[];
    over: number;
    winner: string;
}

const BoardSchema: Schema<Board> = new mongoose.Schema({
    teamA: [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to Player model
            ref: "Player",
            required: true,
        },
    ],
    teamB: [
        {
            type: mongoose.Schema.Types.ObjectId, // Reference to Player model
            ref: "Player",
            required: true,
        },
    ],
    batsman: {
        type: [String], // Array of strings
        required: true,
        default: [],
    },
    strike: {
        type: Number,
        required: true,
        default: 0,
    },
    commentary: [
        {
            run: { type: String, required: true },
            over: { type: Number, required: true },
            dialogue: { type: String, required: true },
        },
    ],
    over: {
        type: Number,
        required: true,
        default: 0,
    },
    winner: {
        type: String,
        required: false, // Optional field
        default: null,
    },
});

export const BoardModel = mongoose.model<Board>("Board", BoardSchema);
