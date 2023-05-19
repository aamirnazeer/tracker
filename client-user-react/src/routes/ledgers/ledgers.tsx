import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

interface ILedger {
  id: string;
  name: string;
  owner: string;
}

const Ledgers = () => {
  const [ledgers, setLedgers] = useState<ILedger[]>([]);

  return (
    <Container maxWidth="xl">
      {ledgers.map((el) => {
        return (
          <div key={el.id}>
            <h1>{el.id}</h1>
            <h2>{el.name}</h2>
            <h3>{el.owner}</h3>
          </div>
        );
      })}
    </Container>
  );
};

export default Ledgers;
