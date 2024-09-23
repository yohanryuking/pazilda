import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function AboutPage() {
	return (
		<Box>
			<Nav />
			<Container>
				<Typography variant="h2" component="h1" gutterBottom>
					Acerca de nosotros
				</Typography>
				<Typography variant="body1">
					Somos una empresa dedicada a proporcionar soluciones de alta calidad para nuestros clientes.
				</Typography>
			</Container>
			<Footer />
		</Box>
	);
}

export default AboutPage;