import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions } from '../data/questions';
import { useReactMediaRecorder } from 'react-media-recorder';

const Interview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id || '';

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      credentials: 'include',
    }).then((response) => {
      if (!response.ok || !id) {
        window.location.href = '/';
      }
    });
  }, []);

  const [questionNumber, setQuestionNumber] = useState(
    location.state.questionNumber || 1
  );
  const [question, setQuestion] = useState(
    questions[0][Math.floor(Math.random() * questions[0].length)]
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [seconds, setSeconds] = useState(66);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true }
  );
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (mediaBlobUrl) setBlobUrl(mediaBlobUrl);
  }, [mediaBlobUrl]);

  const blobUrlToFile = async () => {
    if (!mediaBlobUrl) return;
    const res = await fetch(mediaBlobUrl);
    const blob = await res.blob();
    const ext = blob.type.includes('webm')
      ? 'webm'
      : blob.type.includes('ogg')
      ? 'ogg'
      : blob.type.includes('wav')
      ? 'wav'
      : 'bin';
    const file = new File([blob], `recording.${ext}`, {
      type: blob.type || 'audio/webm',
    });
    return file;
  };

  useEffect(() => {
    if (seconds <= 0) {
      stopRecording();
      setIsRecording(false);
      return;
    }
    if (seconds === 60) {
      setIsRecording(true);
      startRecording();
    }

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  const handleClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const file = await blobUrlToFile();
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('question', question);
      formData.append('audio', file);
      const response = await fetch(
        `http://localhost:3000/api/interview/${id}/answer`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        }
      );
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        let data = null;

        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        }
        if (questionNumber < 5) {
          if (data && data.followupQuestion) {
            setQuestion(data.followupQuestion);
          } else {
            setQuestion(
              questions[questionNumber][
                Math.floor(Math.random() * questions[questionNumber].length)
              ]
            );
          }

          setQuestionNumber(questionNumber + 1);
          setSeconds(66);
          setBlobUrl(null);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        } else {
          navigate('/analysis', { state: { id } });
        }
      } else {
        console.log('err');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p style={{ marginTop: '20rem', color: '#ffffff99' }}>
        Question {questionNumber} of 5
      </p>
      <h2 style={{ marginBottom: '3rem' }}>{question}</h2>
      <div
        className="info-card"
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <p>{!isRecording ? 'Recording in' : 'Recording in progress'}</p>
          <h2>
            00:
            {(seconds % 61).toString().padStart(2, '0')}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '3rem',
          justifyContent: 'space-between',
        }}
      >
        <button
          style={{
            opacity: isRecording ? 1 : 0.5,
          }}
          onClick={() => {
            if (isRecording) {
              setIsRecording(false);
              stopRecording();
              setSeconds(0);
            }
          }}
          disabled={!isRecording || isSubmitting}
        >
          Stop Recording
        </button>
        <button
          style={{
            opacity: !isRecording && !isSubmitting && blobUrl ? 1 : 0.5,
          }}
          onClick={handleClick}
          disabled={isRecording || isSubmitting || !blobUrl}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </button>
      </div>
    </>
  );
};

export default Interview;
