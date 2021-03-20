import NavBar from './NavBar';
import Wrapper from './Wrapper';

interface LayoutProps {
  variant?: 'small' | 'regular';
  children: React.ReactNode;
}

const Layout = ({ children, variant }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
