export interface FormData {
    ballStart: boolean
    commentry: {
        run: number
        ball: number
        dialogue: string
    }
    wide: boolean
    noBall: boolean
    run: string
    extras: string[]
    striker: {
        name: string
        runs: number
        ballsFaced: number
        fours: number
    }
    nonStriker: {
        name: string
        runs: number
        ballsFaced: number
        fours: number
    }
    bowler: {
        name: string
        runs: number
        overs: number
        wickets: number
        maiden: number
    }
    lastBowler: {
        name: string
        runs: number
        overs: number
        wickets: number
        maiden: number
    }
    teamA: {
        name: string
        runs: number
        wickets: number
        over: number
    }
    teamB: {
        name: string
        runs: number
        wickets: number
        over: number
    }
}
