import VisaForm from '../components/VisaForm';
import PageIntro from '../components/PageIntro';
import { Quotes } from '@phosphor-icons/react';

interface Props {
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      country: string;
      university: string;
    }>
  >;
}

const Home = ({ setUserInfo }: Props) => {
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
      <div className="info-card" style={{ marginBottom: '229px' }}>
        <Quotes size={'3rem'} weight="fill" style={{ marginBottom: '3rem' }} />
        <h3 style={{ lineHeight: 1.3, marginBottom: '1rem' }}>
          "As a student from Nigeria, I was worried about the high visa
          rejection rates. Visa Coach gave me the confidence and preparation I
          needed to ace my interview."
        </h3>
        <p style={{ marginBottom: '1rem' }}>Oluwaseun Adebayo</p>
        <p style={{ color: '#FFFFFF99' }}>Nigeria • MIT</p>
      </div>
      <VisaForm setUserInfo={setUserInfo} />
    </>
  );
};

export default Home;
