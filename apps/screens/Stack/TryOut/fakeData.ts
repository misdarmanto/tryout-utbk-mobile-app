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
	total: number;
	enrollTotal: number;
	questions: QuestionTypes[];
	coin: number;
	finish: boolean;
}

const QUESTIONS: QuestionTypes[] = [
	{
		id: 1,
		question: "question 1?",
		choices: {
			A: "hs",
			B: "world",
			C: "hslo",
			D: "aloha",
		},
		answer: "",
		correctAnswer: "A",
		review: "hello",
	},
	{
		id: 2,
		question: "question 2?",
		choices: {
			A: "hello",
			B: "world",
			C: "hallo",
			D: "aloha",
		},
		answer: "",
		correctAnswer: "B",
		review: "hello",
	},
	{
		id: 3,
		question: "question 3?",
		choices: {
			A: "hello",
			B: "world",
			C: "hallo",
			D: "aloha",
		},
		answer: "",
		correctAnswer: "C",
		review: "hello",
	},
	{
		id: 4,
		question: "question 4?",
		choices: {
			A: "helldddo",
			B: "worldfdfdfd",
			C: "hallodff",
			D: "alohdfdfa",
		},
		answer: "",
		correctAnswer: "D",
		review: "hello",
	},
	{
		id: 5,
		question: `question 5?`,
		choices: {
			A: "hello",
			B: "world",
			C: "hallo",
			D: "aloha",
		},
		answer: "",
		correctAnswer: "A",
		review: "hello",
	},
];

export const TRYOUT_DATA: TryOutDataTypes = {
	id: "qA12SgxVZ",
	time: 10,
	total: QUESTIONS.length,
	enrollTotal: 1000,
	finish: false,
	coin: 50,
	questions: QUESTIONS,
};
