import { Ledger } from '../../types/ledger';
import BasicCard from './basicCard';
import { Box } from '@mui/material';

interface ILedger {
  ledgerData: Ledger[] | undefined;
}

const LedgerHolder: React.FC<ILedger> = ({ ledgerData }) => {
  console.log(ledgerData);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {(ledgerData || []).map((el) => {
        return <BasicCard key={el.id} data={el} />;
      })}
    </Box>
  );
};

export default LedgerHolder;
