import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

function ContactPage() {
	return (
		//el nav componente
		<Box>
			<Nav />

			<Box sx={{ textAlign: 'center' }}>
				<Typography variant="h4" fontWeight="bold" gutterBottom>
					Estamos aquí para ayudarte
				</Typography>
				<Typography variant="h6" fontWeight="bold" gutterBottom>
					¿Tienes alguna pregunta? No dudes en enviarnos un mensaje.
				</Typography>

				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
					<TextField label="Nombre" variant="outlined" />
					<TextField label="Correo electrónico" variant="outlined" />
					<TextField label="Teléfono" variant="outlined" />
					<TextField label="Mensaje" variant="outlined" multiline rows={4} />
					<Button variant="contained" color="primary" sx={{ mt: 2 }}>
						Enviar mensaje
					</Button>
				</Box>

				<Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
					No dudes en seguirnos para estar al día
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
					<IconButton color="secondary">
						<WhatsAppIcon />
					</IconButton>
					<IconButton color="secondary">
						<FacebookIcon />
					</IconButton>
					<IconButton color="secondary">
						<InstagramIcon />
					</IconButton>
					<IconButton color="secondary">
						<LinkedInIcon />
					</IconButton>
				</Box>

				<Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
					Gracias por visitar Pazilda
				</Typography>
			</Box>

			{/* //el footer componente */}
			<Footer />
		</Box>
	);
}

export default ContactPage;