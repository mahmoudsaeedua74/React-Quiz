import { useQuiz } from "../ContextProvider/ContextProvider";

export default function Options() {
  const { questions, length, dispatch, answer } = useQuiz();
  // for sort answer every question الاسلئه بتيجي عندي ف اراي وثابته وانا عايز اغيرهم ديما مخلهمش ثابتين
  const allAnswer = [
    ...questions[length].incorrect_answers,
    questions[length].correct_answer,
  ].sort();

  //to make sure he answred
  const hasAnswerd = answer !== null;
  return (
    <div className=" options">
      {allAnswer.map((option) => (
        <button
          className={`btn btn-option 
          ${
            // لو سوال الي اختاره هو الي ف الاختيارت يحط classe correct
            hasAnswerd && option === questions[length].correct_answer
              ? "correct"
              : ""
          }
          ${
            hasAnswerd && option !== questions[length].correct_answer && "wrong"
            //  وهيظهر كل الغطل ويظهر الصح بس  هنا العكس الي اختاره غلط  هيظهر
          }`}
          key={option}
          disabled={hasAnswerd}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: option === questions[length].correct_answer,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
