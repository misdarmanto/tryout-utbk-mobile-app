import { TryOutDataTypes } from "../fakeData";

export interface ScoreTypes {
	correct: number;
	wrong: number;
	empty: number;
}

export type TryoutStateTypes = "start" | "play" | "finish" | "review" | "showScore";

export interface TryOutContextTypes {
	checkAnswer: ScoreTypes;
	tryoutState: TryoutStateTypes;
	tryOutData: TryOutDataTypes;
}
