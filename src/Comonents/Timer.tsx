import { useEffect } from "react";
import { useQuiz } from "../ContextProvider/ContextProvider";

export default function Timer() {
  const { secondTike, dispatch } = useQuiz();
  const mins = Math.floor(secondTike / 60);
  const seconds = secondTike % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [secondTike, dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
