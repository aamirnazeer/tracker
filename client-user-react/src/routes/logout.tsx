import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../store/user/userSlice';
import Loader from '../components/loader/loader';

const LogOut = () => {
  const [signout, { data: signoutResponse, isLoading, isError }] =
    useSignoutMutation();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signout();
      console.log(signoutResponse);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logOut();
  }, []);
  return <Loader />;
};

export default LogOut;
