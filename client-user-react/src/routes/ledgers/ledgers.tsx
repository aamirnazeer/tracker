import { Container } from '@mui/material';
import { useGetLedgersQuery } from '../../store/ledger/ledgerSlice';
import BackDropLoader from '../../components/backdropLoader/backdropLoader';
import LedgerHolder from './ledgerHolder';
import AddNewModalLedger from './addNewLedgerModal';
import ErrorPage from '../../errorPage';

const Ledgers = () => {
  const { data: ledgerData, error, isLoading } = useGetLedgersQuery();

  return (
    <Container maxWidth="xl">
      {isLoading && <BackDropLoader />}
      {!error && <AddNewModalLedger />}
      {!error && <LedgerHolder ledgerData={ledgerData} />}
      {error && <ErrorPage />}
    </Container>
  );
};

export default Ledgers;
