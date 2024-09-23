import { Box, Typography } from '@mui/material';

// Función para obtener el año actual
const getCurrentYear = () => {
	const date = new Date();
	return date.getFullYear();
};

// Componente de pie de página
const Footer = () => {
	return (
		<Box sx={{ bgcolor: 'grey.900', color: 'white', p: 1, bottom: 0, width: '100%' }}>
			<Typography variant="body2" align="center">
				Todos los derechos reservados ©Pazilda {getCurrentYear()}
			</Typography>
		</Box>
	);
};

export default Footer;