import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../store/user/userSlice';
import Loader from '../components/loader/loader';
import { useDispatch } from 'react-redux';
import { currentUserApi } from '../store/user/userSlice';
import { ledgerApi } from '../store/ledger/ledgerSlice';

const LogOut = () => {
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signout();
      setTimeout(() => {
        navigate('/login');
      }, 100);
      dispatch(currentUserApi.util.resetApiState());
      dispatch(ledgerApi.util.resetApiState());
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
