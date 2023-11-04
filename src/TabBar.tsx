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
    {
        name: 'Products',
        path: '/products'
    },
    {
        name: 'Drops',
        path: '/drops'
    },
];


interface TabBarProps {
  onTabChange: (path: string) => void;
}
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