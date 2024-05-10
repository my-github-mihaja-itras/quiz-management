import {
  QuestionResult,
  QuizSession,
} from "@/services/quiz-session/quiz-session.models";
import style from "./quizResult.module.css";
import { Choice } from "@/services/question/question.models";

const QuizResult = ({ quizSession }: { quizSession: QuizSession | any }) => {
  console.log(quizSession)
  return (
    <div className={style.layout}>
      {quizSession.quiz.map(
        (quizItem: QuestionResult, quizItemIndex: number) => (
          <div className={style.quizItem} key={`quizItem${quizItemIndex}`}>
            <div className={style.question}>
              {`Q${quizItemIndex + 1} ) `}{" "}
              {quizItem.question.questionAsked}
            </div >
            {quizItem.question.choice.map(
              (choice: Choice, choiceIndex: number) => (
                <div
                  className={`
              ${style.containerChoice}
               ${quizItem.question.trueAnswer == choice._id && style.trueAnswer}
               ${
                 quizItem.userAnswer == choice._id &&
                 choice._id != quizItem.question.trueAnswer &&
                 style.falseAnswer
               }
               `}
                  key={`choice${choiceIndex}`}
                >
                  <div className={style.text}>
                    {`${choiceIndex + 1}- `}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                    {choice.choiceValue as string}
                  </div>
                  <div className={style.containerInputRadio}>
                    <input
                      type="radio"
                      checked={quizItem.userAnswer == choice._id ? true : false}
                      readOnly={true}
                    />
                  </div>

                  <div className={style.containerIcon}>
                    {choice._id === quizItem.userAnswer && (
                      <img
                        src={`/resources/${
                          choice._id == quizItem.question.trueAnswer
                            ? "IconCheckGreen"
                            : "IconCheckRed"
                        }.svg`}
                        className={style.image}
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
};
export default QuizResult;
