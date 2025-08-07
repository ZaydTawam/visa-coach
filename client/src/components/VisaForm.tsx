import { useEffect, useRef, useState } from 'react';
import validator from 'validator';
import { countryData } from '../data/countries';
import { universityData } from '../data/universities';
import logo from '../assets/visacoach.svg';
import { CaretUpDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const countries = Object.keys(countryData);

const universityNames = Object.keys(universityData);

const VisaForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    university: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    university: '',
  });

  const [countryOpen, setCountryOpen] = useState(false);
  const [universityOpen, setUniversityOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const universityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryOpen &&
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setCountryOpen(false);
      }

      if (
        universityOpen &&
        universityRef.current &&
        !universityRef.current.contains(event.target as Node)
      ) {
        setUniversityOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [countryOpen, universityOpen]);

  const validateForm = () => {
    const newErrors = {
      email: !validator.isEmail(formData.email) ? 'Invalid email' : '',
      password:
        formData.password.length < 8
          ? 'Password must be at least 8 characters long'
          : formData.password.length > 64
          ? 'Password must be no more than 64 characters'
          : '',
      firstName:
        formData.firstName.length < 1
          ? 'First name is required'
          : formData.firstName.length > 50
          ? 'First name is too long'
          : '',
      lastName:
        formData.lastName.length < 1
          ? 'Last name is required'
          : formData.lastName.length > 50
          ? 'Last name is too long'
          : '',
      country: !formData.country ? 'Please select your country' : '',
      university: !formData.university
        ? 'Please select your target university'
        : '',
    };
    setErrors(newErrors);
    return !(
      newErrors.email ||
      newErrors.password ||
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.country ||
      newErrors.university
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          }).then((r) => {
            if (r.ok) {
              console.log(1);
              window.location.href = '/';
            } else {
              console.log(2);
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
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
        <h3>Welcome to Visa Coach</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Begin by creating an account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            id="email"
            placeholder="Email"
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
        <div className="name-fields">
          <div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="select-container" ref={countryRef}>
          <div className="select" onClick={() => setCountryOpen(!countryOpen)}>
            {(formData.country && (
              <p>
                {formData.country}
                <span style={{ float: 'right', color: '#FFFFFF99' }}>
                  <CaretUpDown size={15} />
                </span>
              </p>
            )) || (
              <p style={{ color: '#FFFFFF99' }}>
                Select Your Country
                <span style={{ float: 'right', color: '#FFFFFF99' }}>
                  <CaretUpDown size={15} />
                </span>
              </p>
            )}
          </div>
          {countryOpen && (
            <div className="select-content">
              {countries.map((country) => (
                <div
                  key={country}
                  className="select-item"
                  onClick={() => {
                    setFormData({ ...formData, country });
                    setCountryOpen(false);
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
          {errors.country && <p className="error-message">{errors.country}</p>}
        </div>

        <div className="select-container" ref={universityRef}>
          <div
            className="select"
            onClick={() => setUniversityOpen(!universityOpen)}
          >
            {(formData.university && (
              <p>
                {formData.university}
                <span style={{ float: 'right', color: '#FFFFFF99' }}>
                  <CaretUpDown size={15} />
                </span>
              </p>
            )) || (
              <p style={{ color: '#FFFFFF99' }}>
                Select Your University
                <span style={{ float: 'right', color: '#FFFFFF99' }}>
                  <CaretUpDown size={15} />
                </span>
              </p>
            )}
          </div>
          {universityOpen && (
            <div className="select-content">
              {universityNames.map((university) => (
                <div
                  key={university}
                  className="select-item"
                  onClick={() => {
                    setFormData({ ...formData, university });
                    setUniversityOpen(false);
                  }}
                >
                  {university}
                </div>
              ))}
            </div>
          )}
          {errors.university && (
            <p className="error-message">{errors.university}</p>
          )}
        </div>

        <button type="submit">Continue</button>
      </form>
      <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default VisaForm;
