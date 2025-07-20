import { Link } from 'react-router-dom';
import logo from '../assets/visacoach.svg';
import { useEffect } from 'react';

const Navbar = () => {
  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  });

  // get auth and make sure account creation is complete and change log in button to accound and add interview button accordingly

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
        <Link
          to="/"
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
            Log In
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
