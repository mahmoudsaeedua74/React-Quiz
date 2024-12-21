import { useQuiz } from "../ContextProvider/ContextProvider";
export default function FinishScreen() {
  const { dispatch, totalScore, length } = useQuiz();
//percentage for all score
  const percentage = (totalScore / (length + 1)) * 100;
  console.log(percentage)
  let emoji;
  //to made a total scor for user
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{totalScore}</strong> out of{" "}
        {""}
        {length + 1} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {length + 1} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}
