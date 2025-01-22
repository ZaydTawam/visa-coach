import { useNavigate } from 'react-router-dom';
import { countryData } from '../data/countries';
import { universityData } from '../data/universities';

interface Props {
  userInfo: {
    firstName: string;
    lastName: string;
    country: string;
    university: string;
  };
}

const Welcome = ({ userInfo }: Props) => {
  const navigate = useNavigate();

  const university = userInfo.university;
  const country = userInfo.country;
  const ranking = universityData[university].ranking;
  const acceptanceRate = universityData[university].acceptanceRate;
  const rejectionRate = countryData[country];
  return (
    <>
      <h1 style={{ marginTop: '39rem', marginBottom: '6rem' }}>
        {`Welcome, ${userInfo.firstName}!`}
      </h1>
      <p>
        F1 Visa Rejection Rate for {country}
        <span style={{ float: 'right' }}>{rejectionRate}%</span>
      </p>
      <div
        style={{
          marginTop: '1rem',
          marginBottom: '3rem',
          width: '100%',
          height: '1rem',
          backgroundColor: '#ffffff33',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            display: 'absolute',
            zIndex: 2,
            width: `${rejectionRate}%`,
            height: '1rem',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
        ></div>
      </div>

      <div className="info-card">
        <h2 style={{ marginBottom: '6rem' }}>{university} Profile</h2>
        <div style={{ display: 'flex' }}>
          <p style={{ lineHeight: 0.8 }}>F1 Slots Ranking:</p>
          <h3 style={{ lineHeight: 0.8, marginLeft: '1rem' }}>#{ranking}</h3>
        </div>
        <div style={{ display: 'flex', marginTop: '3rem' }}>
          <p style={{ lineHeight: 0.8 }}>Student Acceptance Rate:</p>
          <h3 style={{ lineHeight: 0.8, marginLeft: '1rem' }}>
            {acceptanceRate}
          </h3>
        </div>
      </div>
      <p style={{ width: '350px', marginTop: '5rem' }}>
        You’re about to begin your F1 visa interview practice session. The
        interview will consist of 5 questions. Take your time to answer each
        question thoroughly and clearly.
      </p>

      <button
        className="submit-btn"
        style={{ marginTop: '3rem' }}
        onClick={() => navigate('/interview')}
      >
        Lets Get Started!
      </button>
    </>
  );
};

export default Welcome;
