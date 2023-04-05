'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddExpenseModal from './addExpense/addExpenseModal';
import BarChart from './chart/barChart';

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.loggedIn) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <AddExpenseModal loggedIn={user.loggedIn} />
      <BarChart loggedIn={user.loggedIn} />
    </div>
  );
}
