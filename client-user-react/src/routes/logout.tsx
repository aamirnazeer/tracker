import { useEffect } from 'react';
import axios from 'axios';
import { logOut } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .delete('http://localhost:5000/api/logout', {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOut());
        navigate('/login');
      })
      .catch((err) => {
        console.log(err)
        navigate('/');
      });
  }, []);
  return <Skeleton />;
};

export default LogOut;
