export type Ledger = {
  id: string;
  name: string;
  ownerId: string;
  isDeleted: number;
  type: number;
  isOwner: boolean;
  owner: { username: string };
};

export type LedgerWithAccess = {
  id: string;
  ledgerid: string;
  userid: string;
  users: {
    username: string;
    id: string;
  };
};

export type NewLedgerForm = {
  name: FormDataEntryValue | null;
  type: number | null;
};

export type DeleteLedger = {
  id: string;
};

export type LedgerAccessCreate = {
  userId: string;
  ledgerId: string;
};

export type LedgerAccessUpdate = {
  ledgerId: string;
  userIds: string[];
};
