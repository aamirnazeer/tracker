import { axiosClient } from '../axiosClient';
import {
  ILoginValues,
  IUser,
  ISignUpValues,
  ValidateUser,
  UserResponseValidation,
} from '../../types/user';

export const currentUserFn = async (): Promise<IUser> => {
  return (await axiosClient.get('/currentuser')).data;
};

export const loginFn = async (data: ILoginValues): Promise<IUser> => {
  return (await axiosClient.post('/login', data)).data;
};

export const signUpFn = async (data: ISignUpValues): Promise<IUser> => {
  return (await axiosClient.post('/signup', data)).data;
};

export const signOutFn = async () => {
  return (await axiosClient.delete('/logout')).data;
};

export const validateUserFn = async (
  data: ValidateUser
): Promise<UserResponseValidation> => {
  return (await axiosClient.post('/users', data)).data;
};
