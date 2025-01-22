import { Link } from 'react-router-dom';
import logo from '../assets/visacoach.svg';

const Navbar = () => {
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

      <Link
        to="/mission"
        className="mouseButton"
        style={{
          marginLeft: 'auto',
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
            fontSize: '20px',
          }}
        >
          Mission
        </p>
      </Link>
    </nav>
  );
};

export default Navbar;
