import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Ledger, NewLedgerForm, DeleteLedger } from '../../types/ledger';

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
    createLedger: builder.mutation<void, NewLedgerForm>({
      query: (ledger) => ({
        url: 'ledgers',
        method: 'POST',
        body: ledger,
      }),
      invalidatesTags: ['Ledger'],
    }),
    deleteLedger: builder.mutation<void, DeleteLedger>({
      query: (ledger) => ({
        url: 'ledgers',
        method: 'DELETE',
        body: ledger,
      }),
      invalidatesTags: ['Ledger'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLedgersQuery,
  useCreateLedgerMutation,
  useDeleteLedgerMutation,
} = ledgerApi;
