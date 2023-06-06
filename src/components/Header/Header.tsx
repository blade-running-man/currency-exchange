import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Logo from '@/components/Logo';
import NavBar from '@/components/NavBar';

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Box gap={3} sx={{ display: 'flex' }}>
          <Logo />
          <NavBar />
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
