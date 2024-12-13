import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditAbout from './EditAbout';
import EditFAQs from './EditFAQs';
import EditHome from './EditHome';
import EditServices from './EditServices';
import Login from './Login';
import ColorPickerPage from './ColorPickerPage';

const drawerWidth = 240;

const AdminPanel = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('About');
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={() => handleMenuClick('About')}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('FAQs')}>
          <ListItemText primary="FAQs" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('Home')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('Services')}>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('Colors')}>
          <ListItemText primary="Colores" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'About':
        return <EditAbout />;
      case 'FAQs':
        return <EditFAQs />;
      case 'Home':
        return <EditHome />;
      case 'Services':
        return <EditServices />;
      case 'Colors':
        return <ColorPickerPage />;
      default:
        return <EditAbout />;
    }
  };

  if (!session) {
    return <Login onLogin={() => setSession(supabase.auth.getSession().data.session)} />;
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#e0e0e0', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Panel de Administración
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
};

export default AdminPanel;