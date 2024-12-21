import { useFormik } from "formik";
import { useQuiz } from "../ContextProvider/ContextProvider";

export default function Form() {
  const { getApi, amount, dispatch } = useQuiz();

  // Define types for form values

  // Validation function
  type FormValues = {
    amount: number | string;
    category: string;
    difficulty: string;
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (
      typeof values.amount === "number" &&
      (values.amount < 1 || values.amount > 50)
    ) {
      errors.amount = "Please choose a number between 1 and 50";
    }
    return errors;
  };

  // Initialize Formik
  const formik = useFormik<FormValues>({
    initialValues: {
      category: "",
      difficulty: "easy",
      amount: amount || 10, // Default to 10 if `amount` is not defined
    },
    validate,
    onSubmit: () => {
      getApi();
    },
  });

  // Handle the change of the "amount" value
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    formik.setFieldValue("amount", value); // Update Formik state
    dispatch({ type: "amount", payload: value }); // Update global state
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Category Selection */}
      <div className="form-floating mb-3">
        <label htmlFor="categoryMenu">Choose Category</label>
        <select
          id="categoryMenu"
          className="form-select"
          name="category"
          onChange={(e) => {
            formik.handleChange(e);
            dispatch({ type: "category", payload: Number(e.target.value) });
          }}
          value={formik.values.category}
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="27">Animals</option>
          <option value="19">Science: Mathematics</option>
          <option value="18">Science: Computers</option>
          <option value="22">Geography</option>
        </select>
      </div>

      {/* Difficulty Selection */}
      <div className="form-floating mb-3">
        <label htmlFor="difficultyOptions">Choose Difficulty Level</label>
        <select
          id="difficultyOptions"
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

      {/* Number of Questions */}
      <div className="form-floating mb-3">
        <label htmlFor="QuestionsNumber">Number of Questions</label>
        <input
          id="QuestionsNumber"
          type="number"
          className="form-control"
          name="amount"
          placeholder="Number of Questions"
          onChange={handleAmountChange} // Custom handler
          value={formik.values.amount} // Bind Formik value
        />
        {formik.errors.amount && (
          <div className="error-message text-danger mt-1">
            {formik.errors.amount}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button className="btn btn-primary w-100" type="submit">
        Start
      </button>
    </form>
  );
}
