import { AppBar, Box, Button, Container, Toolbar, Typography, Link } from "@mui/material";
import { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SignInDialog from "component/dialog/signInDialog";
import Authorized, { useUser } from "component/amplify/Authorized";
import SignInUserMenu from "component/popover/signInUserMenu";


interface IRenderAuthorizedProps {
  signInUserMenuOpen: boolean,
  setAnchorEl: (anchorEl: HTMLButtonElement | null) => void,
  setSignInUserMenuOpen: (open: boolean) => void
}

const RenderAuthorized = ({
  signInUserMenuOpen,
  setAnchorEl,
  setSignInUserMenuOpen
}: IRenderAuthorizedProps) => {
  const user = useUser();

  return (
    <Button
      className={signInUserMenuOpen ? "active" : ""}
      onClick={(event) => {
        setAnchorEl(event.currentTarget);
        setSignInUserMenuOpen(true);
      }}
    >
      <Typography variant="h4">
        <FaUser />
        {user?.userAttributes?.nickname ?? "Guest"} {/* Fix nickname access */}
      </Typography>
    </Button>
  );
}

interface IRenderUnauthorizedProps {
  setSignInOpen: (open: boolean) => void
}

const RenderUnauthorized = ({setSignInOpen}: IRenderUnauthorizedProps) => (
  <Button onClick={() => setSignInOpen(true)}>
    <Typography variant="h4">
      <FaSignInAlt /> Sign In
    </Typography>
  </Button>
);

const Header = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInUserMenuOpen, setSignInUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const menu = [
    { label: "Home", to: "/" },
    { label: "Board", to: "/board" },
    { label: "Development", to: "/dev" },
    { label: "Brainstorm", to: "/brainstorm" },
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
            <Authorized
              authorized={
                <RenderAuthorized
                  signInUserMenuOpen={signInUserMenuOpen}
                  setAnchorEl={setAnchorEl}
                  setSignInUserMenuOpen={setSignInUserMenuOpen} />}
              unauthorized={
                <RenderUnauthorized
                  setSignInOpen={setSignInOpen}
                />
              }/>
          </Box>
        </Toolbar>
      </Container>
      <SignInDialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}/>
      <SignInUserMenu
        open={signInUserMenuOpen}
        anchorEl={anchorEl}
        onClose={() => setSignInUserMenuOpen(false)}/>
    </AppBar>
  );
};

export default Header;