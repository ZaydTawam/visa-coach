import PageIntro from '../components/PageIntro';

const Analysis = () => {
  //Content: Quality and clarity of answers.
  //Delivery: Tone, confidence, and language fluency.

  return (
    <>
      <PageIntro heading="Visa Coach’s Analysis" />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '13rem',
        }}
      >
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>Strengths</h2>
        <div style={{ flex: 3 }}>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>01</h3>
            <p>
              Question: Why did you choose this university and program?
              <br />
              <br />
              Feedback: You provided a clear and well-reasoned explanation for
              choosing your university and program, highlighting specific
              features such as faculty expertise and course structure. This
              showed thorough research and alignment with your career goals.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>02</h3>
            <p>
              Question: Why did you choose this university and program?
              <br />
              <br />
              Feedback: You provided a clear and well-reasoned explanation for
              choosing your university and program, highlighting specific
              features such as faculty expertise and course structure. This
              showed thorough research and alignment with your career goals.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '13rem',
        }}
      >
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>Weaknesses</h2>
        <div style={{ flex: 3 }}>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>01</h3>
            <p>
              Question: What are your plans after completing your degree?
              <br />
              <br />
              Feedback: Your response lacked clarity and appeared uncertain. Try
              to provide a concrete plan that demonstrates how your degree will
              contribute to your career path in your home country. This helps
              establish your intent to return after completing your studies.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>02</h3>
            <p>
              Question: Could you share your GRE, TOEFL, or IELTS scores with
              me?
              <br />
              <br />
              Feedback: Your answer was vague and did not confidently present
              your scores. If your scores are strong, share them with pride. If
              not, highlight the steps you've taken to improve your language
              proficiency or academic readiness.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>Next Steps</h2>
        <div style={{ flex: 3 }}>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>01</h3>
            <p>
              Practice giving a confident and specific answer about your career
              path that ties directly to your degree. Emphasize how the
              specialized knowledge or skills you gain will address specific
              opportunities or needs in your home country, showcasing a clear
              intent to contribute to its development.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '6rem' }}>
            <h3 style={{ lineHeight: 1.1, color: '#ffffff99' }}>02</h3>
            <p>
              Memorize your scores and rehearse how to present them clearly. If
              there are weaknesses, focus on additional preparation or academic
              achievements to offset them. Prepare a truthful explanation for
              any gaps, ensuring you emphasize personal growth or relevant
              experience during that time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
