import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Hidden, Box, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.svg';

function Nav() {
	const navigate = useNavigate();
	const theme = useTheme();

	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(!open);
	};

	const list = (isDrawer = true) => (
		<Box display={isDrawer ? "block" : "flex"} color={"#fff"} sx={{background:"pr"}} fontWeight={'bold'}>
			{[
				{ name: 'Inicio', path: '/' },
				{ name: 'Servicios', path: '/services' },
				{ name: 'Quiénes Somos', path: '/about' },
				{ name: 'FAQs', path: '/faqs' },
				{ name: 'Contacto', path: '/contact' }
			].map((item, index) => (
				<ListItem button key={item.name} onClick={() => { isDrawer ? handleToggle() : null; navigate(item.path); }} sx={{ minWidth: '150px' }}>
					<ListItemText primary={item.name} />
				</ListItem>
			))}
		</Box>
	);

	return (
		<AppBar position="static" elevation={3}>
			<Toolbar >
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Hidden smDown>
						<img src={logo} alt="Mi SVG" style={{ width: '200px', height: '80px' }} /> {/* Logo para pantallas grandes */}
					</Hidden>
					<Hidden mdUp>
						<img src={logo} alt="Mi SVG" style={{ width: '100px', height: '40px' }} /> {/* Logo para pantallas pequeñas */}
					</Hidden>
				</Typography>
				<Hidden mdUp>
					<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleToggle}>
						{open ? <CloseIcon color="secondary" /> : <MenuIcon color="secondary" />}
					</IconButton>
				</Hidden>
				<Drawer
					anchor="top"
					open={open}
					onClose={handleToggle}
					color={theme.palette.secondary.main}
				// PaperProps={{
				// 	style: { marginTop: '64px' }, // Ajusta este valor según la altura de tu AppBar
				// }}
				// ModalProps={{ BackdropProps: { invisible: true } }}
				>
					{list()}
				</Drawer>
				<Hidden smDown>
					{list(false)}
				</Hidden>
			</Toolbar>
		</AppBar>
	);
}

export default Nav;