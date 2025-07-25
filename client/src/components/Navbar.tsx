import { Link } from 'react-router-dom';
import logo from '../assets/visacoach.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <nav>
      <Link to="/">
        <img src={logo} style={{ width: '60px' }} />
        <p
          style={{
            margin: '0 0 0 10px',
            fontSize: '20px',
          }}
        >
          Visa Coach
        </p>
      </Link>
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        <Link
          to="/mission"
          className="mouseButton"
          style={{
            width: '119px',
            background: 'linear-gradient(117.04deg, #ffffff26, #ffffff0d)',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <p
            style={{
              fontSize: '18px',
            }}
          >
            Mission
          </p>
        </Link>
        {loggedIn && (
          <Link
            to="/"
            className="mouseButton"
            style={{
              width: '119px',
              background: 'linear-gradient(117.04deg, #ffffff26, #ffffff0d)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.4)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <p
              style={{
                fontSize: '18px',
              }}
            >
              Interview
            </p>
          </Link>
        )}
        <Link
          to={loggedIn ? '/' : '/login'}
          className="mouseButton"
          style={{
            width: '119px',
            background: '#ffffff',
            backdropFilter: 'blur(15px)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <p
            style={{
              fontSize: '18px',
              color: '#000000',
            }}
          >
            {loggedIn ? 'Account' : 'Log In'}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
