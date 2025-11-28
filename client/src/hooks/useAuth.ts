import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/status", {
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => {
        setIsAuth(false);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {isAuth, isLoading};
};

export default useAuth;