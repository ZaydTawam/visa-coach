import { useNavigate } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { useEffect, useState } from 'react';
import Interview from './Interview';

interface Interview {
  date: Date;
  status: 'in-progress' | 'completed';
  responses: { question: string; answer: string }[];
  feedback: {
    strengths: string[];
    weaknesses: string[];
    overallScore: Number;
  };
  _id: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selected, setSelected] = useState<Interview | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        window.location.href = '/';
      } else {
        fetch('http://localhost:3000/api/interviews', {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) =>
            setInterviews(
              data.map((item: any) => ({ ...item, date: new Date(item.date) }))
            )
          )
          .catch((error) => console.error(error));
      }
    });
  }, []);
  return (
    <>
      <PageIntro heading="Dashboard" marginBottom="1rem" />
      <button
        onClick={() => {
          fetch('http://localhost:3000/api/interview/start', {
            method: 'POST',
            credentials: 'include',
          })
            .then((response) => {
              if (!response.ok) throw new Error('Failed to start interview');
              return response.text();
            })
            .then((id) => {
              navigate('/interview', { state: { id } });
            })
            .catch((err) => {
              console.error(err);
            });
        }}
        style={{
          marginBottom: '15rem',
          background: '#fff',
          borderRadius: '25px',
          display: 'inline-block',
          padding: '8px 24px',
          textDecoration: 'none',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            color: '#000',
            lineHeight: '27px',
          }}
        >
          Start New Interview
        </p>
      </button>

      <h3 style={{ marginBottom: '1.5rem' }}>Your Recent Interviews</h3>
      <div
        className="info-card"
        style={{ width: '100%', display: 'flex', minHeight: '30rem' }}
      >
        <div
          style={{
            marginRight: '8rem',
            minWidth: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {interviews
            .map((interview) => (
              <p
                style={{ color: interview === selected ? '#FFF' : '#FFFFFF99' }}
                onClick={() => setSelected(interview)}
                key={interview._id}
              >
                {interview.date.toLocaleDateString()}
              </p>
            ))
            .reverse()}
        </div>
        {!selected ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ color: '#FFFFFF99' }}>No Interview Selected</h3>
          </div>
        ) : selected.status === 'in-progress' ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ color: '#FFFFFF99', marginBottom: '2rem' }}>
              Still in progress
            </h3>
            <button
              onClick={() => {
                fetch(`http://localhost:3000/api/interview/${selected._id}`, {
                  method: 'GET',
                  credentials: 'include',
                })
                  .then((response) => {
                    if (!response.ok)
                      throw new Error('Failed to start interview');
                    return response.json();
                  })
                  .then((data) => {
                    const { questionNumber, id, question, answer } = data;
                    navigate('/interview', {
                      state: { id, questionNumber, question, answer },
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
              style={{
                background: '#fff',
                borderRadius: '25px',
                display: 'inline-block',
                padding: '8px 24px',
                textDecoration: 'none',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  color: '#000',
                  lineHeight: '27px',
                }}
              >
                Resume
              </p>
            </button>
          </div>
        ) : (
          <div>
            <p>Question 1: {selected.responses[0].question}</p>
            <p>Answer: {selected.responses[0].answer}</p>
            <p>Question 2: {selected.responses[1].question}</p>
            <p>Answer: {selected.responses[1].answer}</p>
            <p>Question 3: {selected.responses[2].question}</p>
            <p>Answer: {selected.responses[2].answer}</p>
            <p>Question 4: {selected.responses[3].question}</p>
            <p>Answer: {selected.responses[3].answer}</p>
            <p>Question 5: {selected.responses[4].question}</p>
            <p>Answer: {selected.responses[4].answer}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
