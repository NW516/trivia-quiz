import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export enum Category {
  "Any Category" = "any",
  "General Knowledge" = "9",
  "Books" = "10",
  "Film" = "11",
  "Music" = "12",
  "Musicals & Theatre" = "13",
  "Television" = "14",
  "Video Games" = "15",
  "Board Games" = "16",
  "Nature" = "17",
  "Computers" = "18",
  "Mathematics" = "19",
  "Mythology" = "20",
  "Sports" = "21",
  "Geography" = "22",
  "History" = "23",
  "Politics" = "24",
  "Art" = "25",
  "Celebrities" = "26",
  "Animals" = "27",
  "Vehicles" = "28",
  "Comics" = "29",
  "Gadgets" = "30",
  "Japanese Anime & Manga" = "31"
}

export const fetchQuizQuestions = async (amount: number, difficulty: string, category: any) => {
  const endpoint = `https://opentdb.com/api.php?category=${category}&amount=${amount}&difficulty=${difficulty}&type=multiple`;
  console.log("endpoint is " + endpoint);
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  return data.results.map((question: Question) => (
    {
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer])
    })
  )
}
