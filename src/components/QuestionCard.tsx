import React, { useState } from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  correctOne: string;
  questionNum: number;
  totalQuestions: number;
}


const QuestionCard: React.FC<Props> = ({
  question,
  answer,
  callback,
  userAnswer,
  correctOne,
  questionNum,
  totalQuestions
}) => {
  const [helpRequested, setHelpRequested] = useState(false);

  const giveHelp = (ans: string[], currAns: string) => {
    if (helpRequested) {
      setHelpRequested(false);
    } else {
      setHelpRequested(true);
    }
    answer = removeRandomItems(ans, currAns);
  }

  const removeRandomItems = (arr: string[], currAns: string) => {
          for(let i=0; i<2; i++) {
            let randomIndex = Math.floor(Math.random()*arr.length);
            let item = arr[randomIndex];
            if ((item !== undefined) && (item !== currAns)) {
              arr.splice(arr.indexOf(item), 1);
            } else {
              i -= 1;
            }
          }
          return(arr);
  }

  return (
  <Wrapper>
    <p className="number">
    Question: {questionNum} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
      {answer.map(answer => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}>
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}} />
          </button>
        </ButtonWrapper>
        )
      )}
      <button disabled={answer.length < 4 ? true : false} id="needHelp" onClick={() => giveHelp(answer, correctOne)}>I Need Help!</button>
    </div>
  </Wrapper>
)};

export default QuestionCard;
