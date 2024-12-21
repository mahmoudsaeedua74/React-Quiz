import { useQuiz } from "../ContextProvider/ContextProvider";
import Options from "./Options";

export default function Questions() {
  const { questions, length } = useQuiz();
  return (
    <div>
      <h4>{questions[length].question}</h4>
      <Options />
    </div>
  );
}
