import { useQuiz } from "../ContextProvider/ContextProvider";

export default function Progres() {
  const { numQuestions, totalScore, length, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={length + Number(answer !== null)} />

      <p>
        Question <strong>{length + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{totalScore}</strong> / {length + 1}
      </p>
    </header>
  );
}
