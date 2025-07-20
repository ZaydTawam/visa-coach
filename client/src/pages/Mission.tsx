import PageIntro from '../components/PageIntro';

const Mission = () => {
  return (
    <>
      <PageIntro
        heading="Building a World Where Education Truly Knows No Borders"
        width="930px"
        marginBottom="16rem"
      >
        <span style={{ color: '#fff' }}>Global Impact</span>
        <br />
        <br /> Visa Coach helps international students prepare for visa
        interviews by providing them personalized feedback using AI technology.
        <br />
        <br />
        <span style={{ color: '#fff' }}>Equal Access</span>
        <br />
        <br /> Leveling the playing field by providing high-quality preparation
        resources to students from all backgrounds.
      </PageIntro>
      <div
        style={{
          marginBottom: '13rem',
        }}
      >
        <h2 style={{ marginBottom: '3rem' }}>Visa Rejection Rates</h2>
        <div
          style={{
            display: 'flex',
            gap: '2vw',
          }}
        >
          <div className="info-card" style={{ width: '100%' }}>
            <p>Germany</p>
            <h2>2.45%</h2>
          </div>
          <div className="info-card" style={{ width: '100%' }}>
            <p>Peru</p>
            <h2>27.61%</h2>
          </div>
          <div className="info-card" style={{ width: '100%' }}>
            <p>Africa</p>
            <h2>61%</h2>
          </div>
          <div className="info-card" style={{ width: '100%' }}>
            <p>Germany</p>
            <h2>2.45%</h2>
          </div>
          <div className="info-card" style={{ width: '100%' }}>
            <p>Germany</p>
            <h2>2.45%</h2>
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
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>The Problem</h2>
        <p style={{ flex: 3 }}>
          Students often fail for preventable reasons, saying things during
          interviews that disqualify them, while wealthier students with access
          to better guidance succeed with ease. Recognizing this inequity, we
          reached out to international student friends and uncovered the same
          story again and again: a lack of preparation creates an unjust divide.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '13rem',
        }}
      >
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>Our Solution</h2>
        <p style={{ flex: 3 }}>
          In response, we created Visa Coach, an AI-powered F1 visa interview
          preparation tool. Visa Coach simulates realistic interviews, offering
          tailored feedback on what to say and what to avoid. It empowers
          students to navigate the complex visa process with confidence,
          addressing not just their answers but how they present themselves.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <h2 style={{ flex: 1, lineHeight: 0.8 }}>Our Vision</h2>
        <p style={{ flex: 3 }}>
          Our mission is to level the playing field for students worldwide. We
          believe that no dream of studying abroad should be denied because of
          where a student comes from or their access to resources. Visa Coach is
          more than a tool; it's a movement to dismantle barriers, amplify
          potential, and give students from all backgrounds an equal shot at
          their future.
        </p>
      </div>
    </>
  );
};

export default Mission;
