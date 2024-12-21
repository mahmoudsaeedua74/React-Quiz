# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Quiz Form Application

This project is a quiz form application built using React and Formik. The form allows users to select a quiz category, difficulty level, and the number of questions. The form validates user input to ensure it meets specific requirements and integrates with a context provider for global state management.

---

## Features

- **Dynamic Form with Validation**: Users can select quiz parameters such as category, difficulty, and number of questions.
- **Validation**: Ensures the number of questions is between 1 and 50.
- **Global State Management**: Uses Context API to manage form values and API interactions.
- **Formik Integration**: Simplifies form handling, validation, and submission.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-form.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiz-form
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## Usage

1. Select a quiz category from the dropdown menu.
2. Choose a difficulty level (Easy, Medium, Hard).
3. Specify the number of questions (between 1 and 50).
4. Click the **Start** button to submit the form and fetch the quiz data.

---

## Folder Structure

```plaintext
src/
├── components/
│   └── Form.js          # The main form component
├── ContextProvider/
│   └── ContextProvider.js # Context for managing global state
├── App.js               # Entry point of the app
├── index.js             # Application bootstrap
```

---

## Technologies Used

- **React**: For building the user interface.
- **Formik**: For form management and validation.
- **Context API**: For global state management.

---

## Validation Rules

- **Amount of Questions**: Must be between 1 and 50. If the input is invalid, an error message is displayed.

---

## Future Improvements

- Add more quiz categories dynamically from an API.
- Improve the UI/UX with enhanced styling.
- Add support for more validation rules.

---

## How It Works

1. **Formik Form**: The form is managed using `Formik`, which handles state and validation.
2. **Validation Function**: Ensures the amount of questions is within a valid range.
3. **Context API**: Provides global state management for the form values and API integration.
4. **Submission**: On form submission, an API call is triggered to fetch quiz data.

---

## Example Code Snippet

```javascript
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
    amount: 10,
  },
  validate,
  onSubmit: () => {
    getApi();
  },
});
```

---
