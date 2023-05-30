import { Container } from '@mui/material';
import { useGetLedgersQuery } from '../../store/ledger/ledgerSlice';
import BackDropLoader from '../../components/backdropLoader/backdropLoader';
import LedgerHolder from './ledgerHolder';
import AddNewModalLedger from './addNewLedgerModal';

const Ledgers = () => {
  const { data: ledgerData, isLoading } = useGetLedgersQuery();
  return (
    <Container maxWidth="xl">
      {isLoading ? (
        <BackDropLoader />
      ) : (
        <>
          <AddNewModalLedger />
          <LedgerHolder ledgerData={ledgerData} />
        </>
      )}
    </Container>
  );
};

export default Ledgers;
