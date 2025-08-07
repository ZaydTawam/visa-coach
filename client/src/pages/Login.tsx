import { useEffect, useState } from 'react';
import validator from 'validator';
import logo from '../assets/visacoach.svg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        navigate('/');
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: validator.isEmpty(formData.email)
        ? 'Email is required'
        : !validator.isEmail(formData.email)
        ? 'Invalid email'
        : '',
      password: validator.isEmpty(formData.password)
        ? 'Password is required'
        : '',
    };
    setErrors(newErrors);
    return !(errors.email || errors.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          console.log(1);
          window.location.href = '/';
        } else {
          console.log(2);
        }
      });
    }
  };

  return (
    <div
      className="info-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        margin: '0 auto',
        marginTop: '16rem',
        padding: '3.5rem',
      }}
    >
      <div
        style={{
          marginBottom: '8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logo}
          style={{
            width: '6rem',
            marginBottom: '2rem',
          }}
        />
        <h3>Log in</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          or <Link to="/signup">create an account</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            id="email"
            placeholder="Email"
            style={{ width: '330px' }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <button type="submit">Enter</button>
      </form>
      <Link
        to="/"
        style={{
          fontSize: '1.5rem',
          letterSpacing: '0.4px',
          marginTop: '2rem',
        }}
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default Login;
