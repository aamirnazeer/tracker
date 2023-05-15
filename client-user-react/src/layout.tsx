import Header from './components/header/header';
import { JsxChild } from './types/jsxChild';

const Layout: React.FC<JsxChild> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
