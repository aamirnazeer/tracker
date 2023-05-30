import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Ledger,
  NewLedgerForm,
  DeleteLedger,
  LedgerAccessCreate,
  LedgerWithAccess,
  LedgerAccessUpdate,
} from '../../types/ledger';

// Define a service using a base URL and expected endpoints
export const ledgerApi = createApi({
  reducerPath: 'ledgerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    credentials: 'include',
  }),
  tagTypes: ['Ledger', 'LedgerAccess'],
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
    getLedgerAcess: builder.query<LedgerWithAccess[], string>({
      query: (id) => ({ url: `ledgeraccess/${id}` }),
      providesTags: ['LedgerAccess'],
    }),
    addLedgerAccess: builder.mutation<void, LedgerAccessCreate>({
      query: (id) => ({
        url: `ledgeraccess`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['LedgerAccess'],
    }),
    updateLedgerAccess: builder.mutation<void, LedgerAccessUpdate>({
      query: (id) => ({
        url: `ledgeraccess`,
        method: 'PUT',
        body: id,
      }),
      invalidatesTags: ['LedgerAccess'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLedgersQuery,
  useCreateLedgerMutation,
  useDeleteLedgerMutation,
  useGetLedgerAcessQuery,
  useAddLedgerAccessMutation,
  useUpdateLedgerAccessMutation,
} = ledgerApi;
