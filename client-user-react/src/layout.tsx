import Header from './components/header/header';
import { Skeleton } from '@mui/material';

interface Layout {
  children: React.ReactNode;
  loggedIn?: boolean;
}

const Layout = ({ loggedIn, children }: Layout) => {
  return (
    <div>
      <Header loggedIn={loggedIn}/>
      {loggedIn ? children : <Skeleton />}
    </div>
  );
};

export default Layout;
