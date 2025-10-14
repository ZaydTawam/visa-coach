import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageIntro from "../components/PageIntro";

type Feedback = {
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  overallScore: number;
};

const Analysis = () => {
  const location = useLocation();
  const id = location.state.id || "";
  const [feedback, setFeedback] = useState<Feedback>({
    strengths: [],
    weaknesses: [],
    nextSteps: [],
    overallScore: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/status", {
      credentials: "include",
    }).then((response) => {
      if (!response.ok || !id) {
        window.location.href = "/";
      } else {
        fetch(`http://localhost:3000/api/interview/${id}/analysis`, {
          credentials: "include",
        }).then((response) => {
          if (!response.ok) {
            window.location.href = "/dashboard";
          } else {
            response.json().then((data) => setFeedback(data));
          }
        });
      }
    });
  }, []);

  return (
    <>
      <PageIntro heading="Visa Coach’s Analysis" />
      {feedback.strengths.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "13rem",
          }}
        >
          <h2 style={{ flex: 1, lineHeight: 0.8 }}>Strengths</h2>
          <div style={{ flex: 3 }}>
            {feedback.strengths.map((strength, index) => {
              return (
                <div
                  style={{ display: "flex", gap: "3rem", marginBottom: "6rem" }}
                >
                  <h3 style={{ lineHeight: 1.1, color: "#ffffff99" }}>
                    0{index + 1}
                  </h3>
                  <p>{strength}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {feedback.weaknesses.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "13rem",
          }}
        >
          <h2 style={{ flex: 1, lineHeight: 0.8 }}>Weaknesses</h2>
          <div style={{ flex: 3 }}>
            {feedback.weaknesses.map((weakness, index) => {
              return (
                <div
                  style={{ display: "flex", gap: "3rem", marginBottom: "6rem" }}
                >
                  <h3 style={{ lineHeight: 1.1, color: "#ffffff99" }}>
                    0{index + 1}
                  </h3>
                  <p>{weakness}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {feedback.nextSteps.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "13rem",
          }}
        >
          <h2 style={{ flex: 1, lineHeight: 0.8 }}>Next Steps</h2>
          <div style={{ flex: 3 }}>
            {feedback.nextSteps.map((nextStep, index) => {
              return (
                <div
                  style={{ display: "flex", gap: "3rem", marginBottom: "6rem" }}
                >
                  <h3 style={{ lineHeight: 1.1, color: "#ffffff99" }}>
                    0{index + 1}
                  </h3>
                  <p>{nextStep}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <h2>Overall Score: {feedback.overallScore}/10</h2>
    </>
  );
};

export default Analysis;
