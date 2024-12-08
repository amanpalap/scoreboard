import mongoose, { Schema, Document } from "mongoose";
import { Team } from "./team";

export interface Board extends Document {
    teamA: Team[];
    teamB: Team[];
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
    ],
    teamB: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
    ],
    batsman: {
        type: [String],
        default: [],
    },
    strike: {
        type: Number,
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
        default: 0,
    },
    winner: {
        type: String,
        default: null,
    },
});

export const BoardModel =
    mongoose.models.Board || mongoose.model<Board>("Board", BoardSchema);
