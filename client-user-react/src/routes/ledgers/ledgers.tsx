import { Container } from '@mui/material';
import { useGetLedgersQuery } from '../../store/ledger/ledgerSlice';
import BackDropLoader from '../../components/backdropLoader/backdropLoader';

const Ledgers = () => {
  const { data: LedgerData, error, isLoading } = useGetLedgersQuery();

  return (
    <Container maxWidth="xl">
      {isLoading && <BackDropLoader />}
      {!error &&
        (LedgerData || []).map((el) => {
          return (
            <div key={el.id}>
              <h1>{el.id}</h1>
              <h2>{el.name}</h2>
              <h3>{el.ownerId}</h3>
            </div>
          );
        })}
    </Container>
  );
};

export default Ledgers;
