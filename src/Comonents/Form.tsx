import { useFormik } from "formik";
import { useQuiz } from "../ContextProvider/ContextProvider";

export default function Form() {
  const { getApi, amount, dispatch } = useQuiz();

  const validate = (values) => {
    const errors = {};
    if (values.amount < 1 || values.amount > 50) {
      errors.amount = "Please choose a number between 1 and 50";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      difficulty: "easy",
      amount: amount, // تأكد من أن الـ initialValues لا يتغير هنا بشكل مباشر
    },
    validate: validate,
    onSubmit: () => {
      getApi();
    },
  });

  // Handle the change of the "amount" value
  const handleAmountChange = (e) => {
    // Update Formik value first
    formik.setFieldValue("amount", Number(e.target.value));

    // Dispatch action to update global state
    dispatch({ type: "amount", payload: Number(e.target.value) });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-floating">
        <label htmlFor="categoryMenu">Choose Category</label>
        <select
          className="form-select"
          name="category"
          onChange={(e) => {
            formik.handleChange(e);
            dispatch({ type: "category", payload: e.target.value });
          }}
          value={formik.values.category}
        >
          <option value="">Any Category</option>
          <option value={9}>General Knowledge</option>
          <option value={27}>Animals</option>
          <option value={19}>Science: Mathematics</option>
          <option value={18}>Science: Computers</option>
          <option value={22}>Geography</option>
        </select>
      </div>

      <div className="form-floating">
        <label htmlFor="difficultyOptions">Choose Difficulty Level</label>
        <select
          className="form-select"
          name="difficulty"
          onChange={(e) => {
            formik.handleChange(e);
            dispatch({ type: "difficulty", payload: e.target.value });
          }}
          value={formik.values.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-floating">
        <label htmlFor="QuestionsNumber">Number of Questions</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          placeholder="Number of Questions"
          onChange={handleAmountChange} // Use the new function here
          value={formik.values.amount} // Bind Formik value here
        />
        {formik.errors.amount && (
          <div className="error-message">{formik.errors.amount}</div>
        )}
      </div>

      <button className="btn btn-ui" type="submit">
        Start
      </button>
    </form>
  );
}
