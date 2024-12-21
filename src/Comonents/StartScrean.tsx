import { useQuiz } from "../ContextProvider/ContextProvider";

export default function StartScrean() {
  const { numQuestions, dispatch} = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={()=> dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}
