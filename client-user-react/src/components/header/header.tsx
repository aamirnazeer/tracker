import { AppBar, Toolbar, Container } from '@mui/material';
import MobileHeader from './mobileHeader';
import DesktopHeader from './desktopHeader';
import AvatarHeader from './avatarHeader';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileHeader />
          <DesktopHeader />
          <AvatarHeader />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
