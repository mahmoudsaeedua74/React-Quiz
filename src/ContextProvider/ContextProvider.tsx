import { createContext, useContext, useReducer, ReactNode } from "react";

const queizContext = createContext<{
  status: State["status"];
  userAnswers: State["userAnswers"];
  length: State["length"];
  answer: State["answer"];
  secondTike: State["secondTike"];
  difficulty: State["difficulty"];
  questions: State["questions"];
  getApi: () => void;
  amount: State["amount"];
  dispatch: React.Dispatch<Action>;
  numQuestions: number;
  totalScore: number;
} | null>(null);
const questionSecond: number = 30;
//make initail state and i will over right on it
type Question = {
  text: string;
};

type State = {
  questions: Question[];
  status: "isLoading" | "ready" | "theStart" | "error" | "finshed" | "active";
  length: number;
  secondTike: number | null;
  amount: number;
  difficulty: string;
  userAnswers: boolean[];
  category: number;
  answer: boolean | null;
};
type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "finshed" }
  | { type: "newAnswer"; payload: boolean }
  | { type: "nextQuestions" }
  | { type: "restart" }
  | { type: "amount"; payload: number }
  | { type: "difficulty"; payload: string }
  | { type: "category"; payload: number }
  | { type: "isLoading" }
  | { type: "tick" };

const initialState: State = {
  questions: [],
  status: "theStart",
  length: 0,
  answer: null,
  secondTike: null,
  amount: 0,
  userAnswers: [],
  difficulty: "easy",
  category: 9,
};
//function reducer take 2 argument state and action
function reducer(state: State, action: Action): State {
  switch (action.type) {
    //if case == amount will distcut all state and amount will == action.payload
    case "amount":
      return { ...state, amount: action.payload };
    //if case == amount will distcut all state and amount will == action.payload
    case "difficulty":
      return { ...state, difficulty: action.payload };
    //if case == difficulty will distcut all state and difficulty will == action.payload
    case "category":
      return { ...state, category: action.payload };
    //if case == amount will distcut all state and amount will == action.payload
    case "isLoading":
      return { ...state, status: "isLoading" };
    //if case == isLoading will display loadin
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    //if case == dataReceived will distcut all state and questions will == action.payload and status ==ready
    case "dataFailed":
      return { ...state, status: "error" };
    //if case == error willdisplay error
    case "start":
      //if case == start will distcut all state and secondTike will == action.payload and status ==active
      return {
        ...state,
        status: "active",
        length: 0,
        answer: null,
        secondTike: state.questions.length * questionSecond,
      };
    case "newAnswer": {
      const updatedAnswers: boolean[] = [...state.userAnswers];
      //get all anwers if correct or not
      updatedAnswers[state.length] = action.payload; // payload هنا هو true أو false
      return {
        ...state,
        answer: action.payload,
        userAnswers: updatedAnswers,
      };
    }
    case "nextQuestions":
      return { ...state, length: state.length + 1, answer: null };
    case "finshed":
      return {
        ...state,
        status: "finshed",
      };
    case "restart":
      return { ...initialState, status: "theStart" };
    //i will rest data so i need initialState from start
    case "tick":
      //if case tick secondTike==secondTike but -1 and when it ==fished will back to finsh screan
      return {
        ...state,
        secondTike: state.secondTike - 1,
        status: state.secondTike === 0 ? "finshed" : state.status,
      };
    default:
      return state;
  }
}
interface ContextProviderProps {
  children: ReactNode;
}
export default function ContextProvider({ children }: ContextProviderProps) {
  const [
    {
      questions,
      status,
      length,
      answer,
      secondTike,
      difficulty,
      category,
      amount,
      userAnswers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  async function getApi() {
    dispatch({ type: "isLoading" });
    try {
      let response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let finalResponse = await response.json();
      dispatch({ type: "dataReceived", payload: finalResponse.results });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }

  //have all num of questions
  const numQuestions = questions.length;
  // Calculate the total score based on the userAnswers array where each answer is either true or false.
  // The userAnswers array contains boolean values (true or false).
  // The code maps over the answers converting each true answer to 1 and each false answer to 0,
  // then reduces the array to get the total score by summing up all the 1s.
  const totalScore = userAnswers
    .map((answer) => (answer ? 1 : 0))
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <queizContext.Provider
      value={{
        status,
        userAnswers,
        length,
        answer,
        secondTike,
        difficulty,
        questions,
        getApi,
        amount,
        dispatch,
        numQuestions,
        totalScore,
      }}
    >
      {children}
    </queizContext.Provider>
  );
}
export function useQuiz() {
  const context = useContext(queizContext);
  if (!context)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}
