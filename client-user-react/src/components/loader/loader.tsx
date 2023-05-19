import { CircularProgress, Container, Box, Skeleton } from '@mui/material';

const Loader = () => {
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Skeleton width={'100%'} height={'100%'}/>
      </Box>
    </Container>
  );
};

export default Loader;
