import { Box, Divider, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', p: 2, textAlign: 'center' }}>
      <Divider/>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} NaniteLink Admin
      </Typography>
    </Box>
  );
};

export default Footer;