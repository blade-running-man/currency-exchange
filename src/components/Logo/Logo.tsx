import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FindReplaceIcon from '@mui/icons-material/FindReplace';

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FindReplaceIcon color="primary" sx={{ display: 'flex', mr: 1 }} />
      <Typography component="h1" variant="h6" noWrap>
        Currency<strong>Exchange</strong>
      </Typography>
    </Box>
  );
}

export default Logo;
