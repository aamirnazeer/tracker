'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/user/userSlice';
import { RootState } from '@/redux/store';

export default function Entries() {
  const user: UserState = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user.loggedIn) {
      router.push('/login');
    }
  }, []);

  return <>{user.loggedIn && <h1>hello</h1>}</>;
}
