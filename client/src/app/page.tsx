import AddExpense from './addExpense';
import axios from 'axios';
import { cookies } from 'next/headers';

async function getCatagories() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const res = await axios.get('http://localhost:5000/api/catagories', {
    headers: {
      cookie: accessToken && `accessToken=${accessToken.value}`,
    },
  });
  return res.data;
}

export default async function Home() {
  const data = await getCatagories();
  return (
    <div>
      <AddExpense catagories={data} />
    </div>
  );
}
