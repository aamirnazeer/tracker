'use client';

import AddExpense from './addExpense';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.loggedIn) {
      router.push('/login');
    }
  }, []);

  return <div>{user.loggedIn && <AddExpense />}</div>;
}
