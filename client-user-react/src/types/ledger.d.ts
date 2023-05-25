export type Ledger = {
  id: string;
  name: string;
  ownerId: string;
  isDeleted: number;
  type: number;
  owner: { username: string };
};

export type NewLedgerForm = {
  name: FormDataEntryValue | null;
  type: number | null;
};

export type DeleteLedger = {
  id: string;
};
