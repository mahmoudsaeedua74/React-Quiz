import { useQuiz } from "../ContextProvider/ContextProvider";
export default function NextQuestion() {
  const { dispatch, answer, numQuestions, status, length } = useQuiz();
  //for make sure if answer == null its mean he doesn chose any answer or status fished return null that mean finish quiz then
  if (answer === null || status === "finshed") return null;
  //when lenght < num-1 it will display Next if the bot equal wil display Finish
  if (length < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestions" })}
      >
        Next
      </button>
    );
  if (length === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finshed" })}
      >
        Finish
      </button>
    );
}
