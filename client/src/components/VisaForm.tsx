import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countryData } from '../data/countries';
import { universityData } from '../data/universities';
import { CaretUpDown } from '@phosphor-icons/react';

const countries = Object.keys(countryData);

const universityNames = Object.keys(universityData);

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

const VisaForm = ({ setUserInfo }: Props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    university: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
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
      firstName:
        formData.firstName.length < 2
          ? 'First name must be at least 2 characters'
          : '',
      lastName:
        formData.lastName.length < 2
          ? 'Last name must be at least 2 characters'
          : '',
      country: !formData.country ? 'Please select your country' : '',
      university: !formData.university
        ? 'Please select your target university'
        : '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (validateForm()) {
      setUserInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        university: formData.university,
      });
      navigate('/welcome');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '57px' }}>
        Let’s Prepare You for Your Visa Interview!
      </h2>
      {/* In the future limit form to just email and password and navigate to another page for rest of info */}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
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
      {/* Already have an account, log in */}
    </div>
  );
};

export default VisaForm;
