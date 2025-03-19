import { AppBar, Box, Button, Container, Toolbar, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import SignInDialog from "component/dialog/signInDialog";
import Authorized, { useUser } from "component/amplify/Authorized";
import SignInUserMenu from "component/popover/signInUserMenu";
import SecondLevelMenu from "component/popover/secondLevelMenu";
import { IMenu } from "module/menu/admin/edit/types";
import { gqListMenuTree } from "function/amplify/graphql/menu/gqListMenu";


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
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [secondLevelAnchorEl, setSecondLevelAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [secondLevelMenu, setSecondLevelMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    gqListMenuTree(2, null)
      .then((menus) => {
        setMenu(menus);
      });
  }, []);

  const handleFirstLevelClick = (event: React.MouseEvent<HTMLButtonElement>, item: IMenu) => {
    if (item.children && item.children.length > 0) {
      setSecondLevelAnchorEl(event.currentTarget);
      setSecondLevelMenu(item.children);
    }
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Button component={Link} href="/">
            <Typography variant="h3">Nanitelink</Typography>
          </Button>
          {menu.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <Button
                key={index}
                component={hasChildren ? "button" : NavLink}
                to={hasChildren ? "#" : item.link ?? "#"}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => hasChildren && handleFirstLevelClick(event, item)}
                className={item.children?.some(child => window.location.pathname === child.link) ? "active" : ""}
              >
                <Typography variant="h4">
                  {item.name}
                  {hasChildren && <TiArrowSortedDown />}
                </Typography>
              </Button>
            );
          })}
          <Box sx={{ ml: "auto" }}>
            <Authorized
              authorized={
                <RenderAuthorized
                  signInUserMenuOpen={signInUserMenuOpen}
                  setAnchorEl={setAnchorEl}
                  setSignInUserMenuOpen={setSignInUserMenuOpen}
                />
              }
              unauthorized={
                <RenderUnauthorized
                  setSignInOpen={setSignInOpen}
                />
              }
            />
          </Box>
        </Toolbar>
      </Container>
      <SignInDialog open={signInOpen} onClose={() => setSignInOpen(false)} />
      <SignInUserMenu open={signInUserMenuOpen} anchorEl={anchorEl} onClose={() => setSignInUserMenuOpen(false)} />
      <SecondLevelMenu open={Boolean(secondLevelAnchorEl)} anchorEl={secondLevelAnchorEl} onClose={() => setSecondLevelAnchorEl(null)} menuItems={secondLevelMenu} />
    </AppBar>
  );
};

export default Header;