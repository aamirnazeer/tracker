import { cookies } from 'next/headers';
import axios from 'axios';

const useRequest = async (method: string, route: string) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const a: string = accessToken ? `accessToken=${accessToken.value}` : '';
  const b: string = refreshToken ? `; refreshToken=${refreshToken.value}` : '';

  if (method === 'get') {
    const res = await axios.get(`${route}`, {
      withCredentials: true,
      headers: {
        cookie: a + b,
      },
    });

    return res;
  }
};

export default useRequest;
