import VisaForm from '../components/VisaForm';
import PageIntro from '../components/PageIntro';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <PageIntro heading="Ace Your F1 Visa Interview with AI-Powered Preparation">
        Visa Coach helps{' '}
        <span style={{ color: '#FFFFFF' }}>international students</span> prepare
        for <span style={{ color: '#FFFFFF' }}>visa interviews</span> by
        providing them personalized feedback using{' '}
        <span style={{ color: '#FFFFFF' }}>AI technology</span>.
      </PageIntro>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2vw',
          marginBottom: '2vw',
        }}
      >
        <div className="info-card">
          <h3 style={{ marginBottom: '20px' }}>Global Expertise</h3>
          <p>
            Access knowledge from successful applicants worldwide, tailored to
            your specific visa type and destination.{' '}
          </p>
        </div>
        <div className="info-card">
          <h3 style={{ marginBottom: '20px' }}>Interactive Practice</h3>
          <p>
            Engage in realistic mock interviews with our AI, receiving instant
            feedback to improve your responses.
          </p>
        </div>
        <div className="info-card">
          <h3 style={{ marginBottom: '20px' }}>Personalized Guidance</h3>
          <p>
            Get customized tips and strategies based on your profile, increasing
            your chances of visa approval.
          </p>
        </div>
      </div>
      <div className="info-card" style={{ marginBottom: '8rem' }}>
        <h3 style={{ lineHeight: 1.3, marginBottom: '3rem' }}>How It Works</h3>
        <p style={{ color: '#FFFFFF99' }}>Take a Mock Interview</p>
        <p style={{ marginBottom: '1rem' }}>
          Answer realistic F1 visa questions in a timed environment that
          simulates the actual interview experience. Visa Coach adapts follow-up
          questions based on your responses for maximum realism.
        </p>
        <p style={{ color: '#FFFFFF99' }}>Get Instant AI Analysis</p>
        <p style={{ marginBottom: '1rem' }}>
          Receive detailed feedback on your answers, including what you did
          well, areas for improvement, and specific red flags that could concern
          visa officers. Our uncertainty detection identifies weak or hesitant
          responses.
        </p>
        <p style={{ color: '#FFFFFF99' }}>Improve & Practice</p>
        <p style={{ marginBottom: '1rem' }}>
          Apply the feedback, practice again, and track your progress over time.
          Each interview helps you refine your story, build confidence, and
          develop clear, convincing answers.
        </p>
      </div>
      <h2 style={{ textAlign: 'center' }}>
        Read more about the{' '}
        <Link
          to="/mission"
          style={{ textDecorationThickness: '2px', textUnderlineOffset: '4px' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          mission
        </Link>
      </h2>

      {!isAuth && (
        <div style={{ marginTop: '20rem' }}>
          <VisaForm />
        </div>
      )}
    </>
  );
};

export default Home;
