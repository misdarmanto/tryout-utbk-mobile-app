export interface QuestionTypes {
	id: number;
	question: string;
	choices: {
		A: string;
		B: string;
		C: string;
		D: string;
	};
	answer: string;
	correctAnswer: string;
	review: string;
}

export interface TryOutDataTypes {
	id: string;
	time: number;
	title: string;
	total: number;
	enrollTotal: number;
	questions: QuestionTypes[];
	coin: number;
	finish: boolean;
	order: number;
}
