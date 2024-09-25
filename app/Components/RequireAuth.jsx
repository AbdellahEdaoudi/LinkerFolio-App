"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/Admin');
    }
    setIsAuthChecked(true);
  }, [token, router]);

  if (!isAuthChecked) {
    return null;
  }

  return children;
};

export default RequireAuth;
