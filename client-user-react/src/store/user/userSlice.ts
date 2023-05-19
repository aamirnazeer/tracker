import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IUser,
  ILoginValues,
  ISignUpValues,
  ISignoutResponse,
} from '../../types/user';

// Define a service using a base URL and expected endpoints
export const currentUserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    credentials: 'include',
  }),
  tagTypes: ['CurrentUser'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, void>({
      query: () => ({
        url: 'currentuser',
      }),
      providesTags: ['CurrentUser'],
    }),
    login: builder.mutation<IUser, ILoginValues>({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
    signup: builder.mutation<IUser, ISignUpValues>({
      query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
    signout: builder.mutation<ISignoutResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'DELETE',
      }),
      invalidatesTags: ['CurrentUser'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useSignupMutation,
  useSignoutMutation,
} = currentUserApi;
