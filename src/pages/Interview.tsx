import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

const Interview = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState(
    questions[0][Math.floor(Math.random() * questions[0].length)]
  );
  const [recording, setRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam when component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = () => {
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
    } else if (questionNumber >= 5) {
      navigate('/analysis');
    }
  };

  return (
    <>
      <p style={{ marginTop: '20rem', color: '#ffffff99' }}>
        Question {questionNumber} of 5
      </p>
      <h2 style={{ marginBottom: '3rem' }}>{question}</h2>
      <div className="info-card" style={{ width: '100%', aspectRatio: 16 / 9 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
        <button onClick={handleClick}>
          {(questionNumber < 5 && 'Next Question') || 'Finish Interview'}
        </button>
      </div>
    </>
  );
};

export default Interview;
