import { Link } from 'react-router-dom';
import logo from '../assets/visacoach.svg';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { isAuth } = useAuth();

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
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to={isAuth ? '/dashboard' : '/signup'}>
          <button className="mouse-button2">
            {isAuth ? 'Dashboard' : 'Sign Up'}
          </button>
        </Link>
        <Link to={isAuth ? '/account' : '/login'}>
          <button className="mouse-button1">
            {isAuth ? 'Account' : 'Log In'}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
