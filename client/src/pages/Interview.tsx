import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions } from '../data/questions';

const Interview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id || '';
  const [questionNumber, setQuestionNumber] = useState(
    location.state.questionNumber || 1
  );
  const [question, setQuestion] = useState(
    location.state.question ||
      questions[0][Math.floor(Math.random() * questions[0].length)]
  );
  const [answer, setAnswer] = useState(location.state.answer || '');
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (question) {
      console.log(question, answer);
      fetch(`http://localhost:3000/api/interview/${id}/save`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question, answer: answer }),
      });
    }
  }, [answer]);

  const handleClick = () => {
    if (answer) {
      fetch(`http://localhost:3000/api/interview/${id}/answer`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question, answer: answer }),
      }).then((response) => {
        if (response.ok) {
          setAnswer('');
          if (questionNumber < 5) {
            setQuestion(
              questions[questionNumber][
                Math.floor(Math.random() * questions[questionNumber].length)
              ]
            );
            setQuestionNumber(questionNumber + 1);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          } else {
            navigate('/analysis');
          }
        } else {
          console.log('err');
        }
      });
    }
  };

  return (
    <>
      <p style={{ marginTop: '20rem', color: '#ffffff99' }}>
        Question {questionNumber} of 5
      </p>
      <h2 style={{ marginBottom: '3rem' }}>{question}</h2>
      <div className="info-card" style={{ width: '100%', aspectRatio: 16 / 9 }}>
        <input
          type="text"
          name="answer"
          id="answer"
          placeholder="Answer"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '3rem',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => setRecording(!recording)}>
          {!recording ? 'Start' : 'Stop'} Recording
        </button>
        <button
          style={{
            opacity: answer ? 1 : 0.5,
          }}
          onClick={handleClick}
        >
          Submit Response
        </button>
      </div>
    </>
  );
};

export default Interview;
