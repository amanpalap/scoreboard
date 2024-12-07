import mongoose, { Schema, Document } from "mongoose";

export interface batsman extends Document {
    name: string
    runs: number
    ballsPlayed: number
    out: boolean
    onStrike: boolean
}

const batsmanSchema: Schema<batsman> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    runs: {
        type: Number,
        required: true,
        default: 0,
    },
    ballsPlayed: {
        type: Number,
        required: true,
        default: 0
    },
    out: {
        type: Boolean,
        required: true,
        default: false
    },
    onStrike: {
        type: Boolean,
        required: true,
        default: null
    }
})

export interface bowler extends Document {
    name: string
    runs: number
    ballsPlayed: number
    out: boolean
    onStrike: boolean
}

const bowlerSchema: Schema<bowler> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    runs: {
        type: Number,
        required: true,
        default: 0,
    },
    ballsPlayed: {
        type: Number,
        required: true,
        default: 0
    },
    out: {
        type: Boolean,
        required: true,
        default: false
    },
    onStrike: {
        type: Boolean,
        required: true,
        default: null
    }
})

export interface Board extends Document {
    batsman1: batsman
    batsman2: batsman
    Bowler: string
    password: string
    //TODO: Address should contain more detail like pincode, landmark, locality etc
    address: string
    number: string
    otp: string
    otpExpiry: Date
    isVerified: boolean
    isAdmin: boolean
    buckets: bucket[]
}

const UserSchema: Schema<User> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
        default: null
    },
    number: {
        type: String,
        unique: false,
        default: null,
    },
    otp: {
        type: String,
        required: [true, 'OTP Code is required'],
    },
    otpExpiry: {
        type: Date,
        required: [true, 'OTP Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    buckets: {
        type: [bucketSchema],
    }
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default userModel