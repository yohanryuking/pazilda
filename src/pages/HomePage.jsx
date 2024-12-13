import React from 'react';
import Nav from '../components/Nav';
import { Box, Typography, Grid, useTheme, useMediaQuery, Button, Container, Card, CardContent, CardMedia } from '@mui/material';
import Slider from "react-slick";
import CardInfo from '../components/CardInfo';
import svg1 from '../assets/svg1.svg';
import svg2 from '../assets/svg2.svg';
import svg3 from '../assets/svg3.svg';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { MyContext } from '../MyProvider';
import ColorPicker from '../components/ColorPicker';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';





function HomePage() {
	const theme = useTheme();
	const isXsOrSm = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate();
	const { primary, secondary, text, setPrimary, setSecondary, setText } = useContext(MyContext);
	const [currentColor, setCurrentColor] = useState('primary');
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		const { data, error } = await supabase
			.from('services')
			.select('*');

		if (error) {
			console.error('Error fetching services:', error);
		} else {
			console.log('Fetched services:', data); // Verificar los datos obtenidos
			setServices(data);
			setLoading(false);
		}
	};

	const handleColorChange = async (color) => {
		switch (currentColor) {
			case 'primary':
				setPrimary(color);
				await updateColorInDatabase('primary', color);
				break;
			case 'secondary':
				setSecondary(color);
				await updateColorInDatabase('secondary', color);
				break;
			case 'text':
				setText(color);
				await updateColorInDatabase('text', color);
				break;
			case 'text2':
				setText(color);
				await updateColorInDatabase('text2', color);
				break;
			default:
				break;
		}
	};

	const updateColorInDatabase = async (colorName, colorValue) => {
		const { error } = await supabase
			.from('colors')
			.update({ [colorName]: colorValue })
			.eq('id', 1); // Asume que el valor de 'id' para esa fila es 1

		if (error) {
			console.error('Error updating color:', error);
		}
	};

	const getRandomServices = (services) => {
		const shuffled = services.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 3);
	};


	const randomServices = getRandomServices(services);

	const settings = {
		// dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		// centerMode: false, // Asegúrate de que esto esté establecido en false
		// edgeFriction: 0 // Asegúrate de que esto esté establecido en 0
	};

	const pictures = [
		'Picture1.png',
		'Picture2.png',
		'Picture3.png',
		'Picture4.png',
		'Picture5.png',
		// 'Picture6.png',
		'Picture7.png',
		'Picture8.png',
		'Picture9.png'
	];

	const datos = [
		{ svg: svg1, titulo: 'Evaluación sociosanitaria', subtitulo: 'Valoramos las necesidades tanto de la persona mayor como de la familia y definimos el perfil de la cuidadora.', numero: 1 },
		{ svg: svg2, titulo: 'Selección personalizada', subtitulo: 'Enviamos a los cuidadores afines a la evaluación solicitada.', numero: 2 },
		{ svg: svg3, titulo: 'Incorporación del cuidador', subtitulo: 'El cuidador conoce a la familia y comienza a trabajar en el domicilio de la persona dependiente.', numero: 3 },
		// Más objetos aquí...
	];

	if (loading) {
		return <Typography>Cargando...</Typography>;
	}

	return (
		<Box>
			<Nav />
			<Box sx={{ position: 'relative', overflow: 'hidden', color: 'white', height: '500px' }}>
				{/* Grid animado de imágenes */}
				<Box
					sx={{
						display: 'flex',
						animation: 'scrollCollage 20s linear infinite',
						width: '200%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				>
					<Box
						component="img"
						src={`src/assets/fondo.jpg`}
						sx={{ width: '100%', height: 'auto' }}
					/>
					<Box
						component="img"
						src={`src/assets/fondo.jpg`}
						sx={{ width: '100%', height: 'auto' }}
					/>
				</Box>
				{/* Gradiente superpuesto */}
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1
					}}
				/>
				{/* Contenido de la página */}
				<Grid container spacing={2} justifyContent="center" sx={{ position: 'relative', zIndex: 2, marginTop: 0, paddingTop: 0 }}>
					<Grid item xs={12}>
						<Typography variant={isXsOrSm ? "h5" : "h1"} align="center" sx={{ fontWeight: 'bold' }}>
							Cuidado de Personas Mayores
						</Typography>
					</Grid>
					<Grid item xs={9} mb={18}>
						<Typography variant={isXsOrSm ? "body1" : "h5"} align="center" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', lineHeight: '1.2' }}>
							Garantizamos tranquilidad y estabilidad tanto para el adulto mayor como para su familia. Logramos construir relaciones duraderas entre el mayor y la cuidadora.
						</Typography>
					</Grid>
					<Grid item xs={12} container justifyContent="center">
						<Button variant="contained" color="secondary" sx={{ borderRadius: '50px', color: 'primary.main' }} onClick={() => navigate('/services')}>
							Contratar Cuidador
						</Button>
					</Grid>
					<Grid item xs={12} mb={6} container justifyContent="center">
						<Button variant="contained" color="secondary" sx={{ borderRadius: '50px', color: 'primary.main' }} onClick={() => navigate('/contact')}>
							Contáctenos
						</Button>
					</Grid>
				</Grid>
			</Box>
			<style jsx>{`
        @keyframes scrollCollage {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

			<Box py={5} width={'98%'} px={'10px'}>
				<Slider {...settings}>
					{randomServices.map(service => (
						<Box key={service.id} sx={{ p: 2 }}>
							<Card sx={{ borderRadius: 2, boxShadow: 1 }}>
								<CardMedia
									component="img"
									height="200"
									image={service.image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="url(#gradient)" /><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(240,240,240);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(200,200,200);stop-opacity:1" /></linearGradient></defs></svg>'}
									alt={service.title}
									sx={{ objectFit: 'contain', backgroundColor: service.image ? 'transparent' : '#f0f0f0' }}
								/>
								<CardContent>
									<Typography variant="h5">{service.title}</Typography>
									<Typography variant="body2">{service.description}</Typography>
								</CardContent>
							</Card>
						</Box>
					))}
				</Slider>
			</Box>

			<Box sx={{
				backgroundImage: `url('src/assets/03.png')`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				color: 'white',
			}}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					background: `linear-gradient(to top, ${theme.palette.secondary.main} 20%, transparent 60%)`,
					height: '500px',
					padding: '20px',
				}}>
					<Typography variant={isXsOrSm ? "h4" : "h3"} align="center" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', lineHeight: '1.2', }}>¿No sabes qué servicio contratar?</Typography>

					<Typography variant={isXsOrSm ? "h5" : "h4"} align="center" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', lineHeight: '1.2', }}>Pide información sin compromiso</Typography>

					<Button variant="contained" color="primary" sx={{ borderRadius: '50px', color: 'secondary.main', margin: '0 30px' }} onClick={() => navigate('/services')}>
						<Typography variant={isXsOrSm ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
							Te asesoramos gratis.
						</Typography>
					</Button>
				</Box>

			</Box>

			<Box py={5}>
				<Typography variant="h4" gutterBottom textAlign={'center'} color='secondary.main' fontWeight='bold'>
					¿Cómo contratar a tu cuidadora de personas mayores?
				</Typography>
				<div>
					{datos.map((data, index) => (
						<CardInfo key={index} data={data} />
					))}
				</div>
			</Box>

			<Box sx={{ bgcolor: 'secondary.main', color: 'primary.main', p: 4, textAlign: 'center', mb: '35px' }}>
				<Typography variant="h5" gutterBottom fontWeight="bold">
					¿Tienes preguntas o quieres saber más de nuestros servicios?
				</Typography>
				<Typography variant="body1" gutterBottom fontWeight="bold">
					No dudes en contactarnos.
				</Typography>
				<Typography variant="body1" gutterBottom mb={3} fontWeight="bold">
					Estamos aquí para ayudarte.
				</Typography>

				<Button variant="contained" sx={{ borderRadius: '50px', color: 'secondary.main', margin: '0 30px' }} onClick={() => navigate('/contact')}>
					<Typography variant={isXsOrSm ? "h6" : "h5"} sx={{ fontWeight: 'bold' }}>
						Escríbenos
					</Typography>
				</Button>
			</Box>

			<div>
				<select value={currentColor} onChange={(e) => setCurrentColor(e.target.value)}>
					<option value="primary">Primario</option>
					<option value="secondary">Secundario</option>
					<option value="text">Texto</option>
					<option value="text2">Texto2</option>
				</select>
				<ColorPicker color={currentColor === 'primary' ? primary : currentColor === 'secondary' ? secondary : text} onColorChange={handleColorChange} />
				{/* El resto de tu código... */}
			</div>

			<Footer></Footer>
		</Box>

	);
}

export default HomePage;