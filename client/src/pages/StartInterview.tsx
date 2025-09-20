import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartInterview = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/status", {
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        window.location.href = "/";
      }
    });
  }, []);

  const handleClick = () => {
    fetch("http://localhost:3000/api/interview/start", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to start interview");
        return response.text();
      })
      .then((id) => {
        navigate("/interview", { state: { id } });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div style={{ marginTop: "390px" }}>
        <h1 style={{ marginBottom: "61px" }}>Start Interview</h1>
        <p style={{ width: "550px", color: "#FFFFFF99" }}>
          This mock interview is designed to closely simulate a real F-1 visa
          interview. You will be asked five questions and you’ll have up to 60
          seconds to respond to each.
          <br />
          <br />
          After completing all five questions, you’ll receive a detailed
          analysis of your performance, including a confidence score, insights
          into what you did well, and recommendations on how to improve your
          responses for real interviews.
          <br />
          <br />
          Before starting, please ensure your microphone is enabled and when
          prompted, you allow microphone access for this website in your browser
          settings.
        </p>
      </div>
      <button
        onClick={handleClick}
        style={{
          marginTop: "6rem",
          background: "#fff",
          borderRadius: "25px",
          display: "inline-block",
          padding: "8px 24px",
          textDecoration: "none",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#000",
            lineHeight: "27px",
          }}
        >
          Start Interview
        </p>
      </button>
    </>
  );
};

export default StartInterview;
