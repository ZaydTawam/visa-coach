import { useEffect } from 'react';
import PageIntro from '../components/PageIntro';

const Account = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        window.location.href = '/';
      }
    });
  }, []);

  return (
    <>
      <PageIntro heading="Account" marginBottom="1rem" />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        <button
          style={{
            width: 'auto',
            background: '#ffffff',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 24px',
          }}
          onClick={() => {
            fetch('http://localhost:3000/api/auth/logout', {
              method: 'POST',
              credentials: 'include',
            }).then((response) => {
              if (response.ok) {
                window.location.href = '/';
              }
            });
          }}
        >
          <p
            style={{
              fontSize: '18px',
              color: '#000000',
              lineHeight: '27px',
            }}
          >
            Logout
          </p>
        </button>
        <button
          style={{
            width: 'auto',
            background: '#cf3030',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 24px',
          }}
          onClick={() => {
            fetch('http://localhost:3000/api/account', {
              method: 'DELETE',
              credentials: 'include',
            }).then((response) => {
              if (response.ok) {
                window.location.href = '/';
              }
            });
          }}
        >
          <p
            style={{
              fontSize: '18px',
              color: '#fff',
              lineHeight: '27px',
            }}
          >
            Delete Account
          </p>
        </button>
      </div>
    </>
  );
};

export default Account;
