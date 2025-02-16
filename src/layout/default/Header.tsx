import { AppBar, Box, Button, Container, Toolbar, Typography, Link } from "@mui/material";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LoginDialog from "component/dialog/loginDialog";

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const menu = [
    { label: "Home", to: "/" },
    { label: "Board", to: "/board" },
    { label: "Development", to: "/dev" },
    { label: "Brainstorm", to: "/brainstorm" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Button component={Link} href="/">
            <Typography variant="h3">Nanitelink</Typography>
          </Button>
          {menu.map((item, index) => (
            <Button key={index} component={NavLink} to={item.to}>
              <Typography variant="h4">{item.label}</Typography>
            </Button>
          ))}
          <Box sx={{ ml: "auto" }}>
            <Button onClick={()=> setSignInOpen(true)}>
              <Typography variant="h4"> <FaSignInAlt/>Sign In</Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <LoginDialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onLogin={(username, password) => {
          console.log(username, password);
          setSignInOpen(false);
        }}/>
    </AppBar>
  );
};

export default Header;