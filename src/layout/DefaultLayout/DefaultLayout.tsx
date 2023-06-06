import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { Container } from '@mui/material';

function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default DefaultLayout;
