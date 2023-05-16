import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

interface ILedger {
  id: string;
  name: string;
  owner: string;
}

const Ledgers = () => {
  const [ledgers, setLedgers] = useState<ILedger[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/ledgers', { withCredentials: true })
      .then((res) => setLedgers(res.data))
      .catch((err) => console.log(err));
  },[]);
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
