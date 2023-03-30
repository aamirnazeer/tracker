import AddExpense from './addExpense';
import useRequest from '@/hooks/useRequest';

export default async function Home() {
  const data = await useRequest('get', 'http://localhost:5000/api/catagories');
  return (
    <div>
      <AddExpense catagories={data} />
    </div>
  );
}
