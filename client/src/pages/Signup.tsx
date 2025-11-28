import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisaForm from '../components/VisaForm';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <div style={{ marginTop: '16rem' }}>
      <VisaForm />
    </div>
  );
};

export default Signup;
