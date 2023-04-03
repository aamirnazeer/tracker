import AddExpense from './addExpense';
import useRequest from '@/hooks/useRequest';
import axios from 'axios';

export default async function Home() {
  const res: any = await useRequest(
    'get',
    'http://localhost:5000/api/currentuser'
  );

  console.log(res.data);

  return (
    <div>
      <AddExpense />
    </div>
  );
}
