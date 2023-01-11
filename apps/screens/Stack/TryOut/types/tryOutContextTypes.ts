export interface CheckAnswerTypes {
	correct: number;
	wrong: number;
	empty: number;
}

export interface TryOutContextTypes {
	checkAnswer: CheckAnswerTypes;
}
