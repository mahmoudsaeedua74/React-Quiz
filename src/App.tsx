export default App;
import "./App.css";
import Headar from "./Comonents/Headar";
import Main from "./Comonents/Mian";
import Loader from "./Comonents/Loader";
import Error from "./Comonents/Error";
import StartScrean from "./Comonents/StartScrean";
import Form from "./Comonents/Form";
import { useQuiz } from "./ContextProvider/ContextProvider";
import Questions from "./Comonents/Questions";
import NextQuestion from "./Comonents/NextQuestion";
import FinishScrean from "./Comonents/FinishScrean";
import Timer from "./Comonents/Timer";
import Footer from "./Comonents/Footer";
import Progres from "./Comonents/Progres";
function App() {
  //
  const { status } = useQuiz();
  return (
    <>
      <div className="app">
        <Headar />
        <Main>
          {status === "theStart" && <Form />}
          {status === "isLoading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScrean />}
          {status === "active" && (
            <>
              <Progres />
              <Questions />
              <Footer>
                <Timer />
                <NextQuestion />
              </Footer>
            </>
          )}
          {status === "finshed" && <FinishScrean />}
        </Main>
      </div>
    </>
  );
}
