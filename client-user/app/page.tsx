'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasicModal from './addExpenseModal';
import { BarChart } from './barChart';
import { Box } from '@mui/material';

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
      <Box
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BasicModal />
      </Box>
      <Box
        sx={{
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BarChart />
      </Box>
    </div>
  );
}
