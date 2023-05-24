import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ledger } from '../../types/ledger';

// Define a service using a base URL and expected endpoints
export const ledgerApi = createApi({
  reducerPath: 'ledgerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    credentials: 'include',
  }),
  tagTypes: ['Ledger'],
  endpoints: (builder) => ({
    getLedgers: builder.query<Ledger[], void>({
      query: () => ({
        url: 'ledgers',
      }),
      providesTags: ['Ledger'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLedgersQuery } = ledgerApi;
