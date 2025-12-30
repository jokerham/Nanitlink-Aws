import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, NavLink, useLocation } from "react-router-dom";
import SignInDialog from "@/component/dialog/signInDialog";
import SignInUserMenu from "@/component/popover/signInUserMenu";
import SecondLevelMenu from "@/component/popover/secondLevelMenu";
import { IMenu } from "@/module/menu/admin/edit/types";
import { gqListMenuTree } from "@/function/amplify/graphql/menu/gqListMenu";
import { useAuth } from "@/component/commom/AuthContext";
import { CognitoUser } from "@/function/amplify/rest/member/types";


interface IRenderAuthorizedProps {
  user: CognitoUser,
  signInUserMenuOpen: boolean,
  setAnchorEl: (anchorEl: HTMLButtonElement | null) => void,
  setSignInUserMenuOpen: (open: boolean) => void
}

const RenderAuthorized = ({
  user,
  signInUserMenuOpen,
  setAnchorEl,
  setSignInUserMenuOpen
}: IRenderAuthorizedProps) => {
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
        {user.nickName ?? "Guest"}
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
  const location = useLocation();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInUserMenuOpen, setSignInUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [secondLevelAnchorEl, setSecondLevelAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [secondLevelMenu, setSecondLevelMenu] = useState<IMenu[]>([]);
  const [renderKey, setRenderKey] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    gqListMenuTree(2, null)
      .then((menus) => setMenu(menus));
  }, []);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [location])

  const handleFirstLevelClick = (event: React.MouseEvent<HTMLButtonElement>, item: IMenu) => {
    if (item.children && item.children.length > 0) {
      setSecondLevelAnchorEl(event.currentTarget);
      setSecondLevelMenu(item.children);
    }
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar key={renderKey}>
          <Button component={Link} to="/">
            <Typography variant="h3">Nanitelink</Typography>
          </Button>
          {menu.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <Button
                key={index}
                component={hasChildren ? "button" : NavLink}
                to={hasChildren ? `#${item.name}` : item.link ?? "#"}
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
            {user ? (
              <RenderAuthorized
                user={user}
                signInUserMenuOpen={signInUserMenuOpen}
                setAnchorEl={setAnchorEl}
                setSignInUserMenuOpen={setSignInUserMenuOpen}
              />
            ) : (
              <RenderUnauthorized
                setSignInOpen={setSignInOpen}
              />
            )}
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