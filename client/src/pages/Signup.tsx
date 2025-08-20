import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisaForm from '../components/VisaForm';

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/status', {
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        navigate('/');
      }
    });
  }, []);

  return (
    <div style={{ marginTop: '16rem' }}>
      <VisaForm />
    </div>
  );
};

export default Signup;
