import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import { action, makeObservable, observable } from 'mobx';
import { Action } from '@remix-run/router';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
const pages = ['Brands', 'Products', 'Drops']
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



const state = new State();
export default function TabBar() {
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
                <Menu
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
                </Menu>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={state.handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
            </Toolbar>
            </AppBar>
      </ThemeProvider>
    </Box>
  );
}