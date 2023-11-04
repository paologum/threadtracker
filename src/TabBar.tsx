import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { context } from './util/index';
import { Page } from './util/types';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
const pages: Page[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Brands',
        path: '/brands'
    },
];
class State {
  anchorElNav :null | HTMLElement = null;
  anchorElUser:null | HTMLElement = null;
  constructor() {
    makeObservable(this, {
      anchorElNav: observable,
      anchorElUser: observable,
      handleOpenNavMenu: action,
      handleOpenUserMenu: action,
      handleCloseNavMenu: action,
      handleCloseUserMenu: action
    })
  };

  handleOpenNavMenu(value: React.MouseEvent<HTMLElement>) {
    this.anchorElNav = value.currentTarget;
  };

  handleOpenUserMenu(value: React.MouseEvent<HTMLElement>) {
    this.anchorElUser = value.currentTarget;
  };

  handleCloseNavMenu() {
    this.anchorElNav = null;
  };

  handleCloseUserMenu() {
    this.anchorElUser = null;
  };
}



interface TabBarProps {
  onTabChange: (path: string) => void;
}
const state = new State();
export const TabBar: React.FC<TabBarProps> = observer (function ({onTabChange}) {
  const {state, actions} = useContext(context);
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                {/* <Menu
                  id="menu-appbar"
                  anchorEl={state.anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(state.anchorElNav)}
                  onClose={state.handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={state.handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page, index) => (
                    <Button
                      key={index}
                      onClick={() => {onTabChange(page.path)}}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
            </Toolbar>
            </AppBar>
      </ThemeProvider>
    </Box>
  );
});