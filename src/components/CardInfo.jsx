import { Grid, Typography, Box, useTheme, useMediaQuery } from '@mui/material';


const CardInfo = ({ data }) => {
	const theme = useTheme();
	const isXsOrSm = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid container mb={2} sx={{ alignItems: 'center' }}>
			<Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ bgcolor: 'secondary.main', color: 'primary.main', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>{data.numero}</Typography>
				</Box>
			</Grid>
			<Grid item xs={10}>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<img src={data.svg} alt="Mi SVG" style={{ width: '200px', height: '200px' }} />
					<Typography pb={3} variant={isXsOrSm ? "h4" : "h3"} sx={{ fontWeight: 'bold', }} color="secondary.main">{data.titulo}</Typography>
					<Typography variant={isXsOrSm ? "h5" : "h4"} sx={{ fontWeight: 'bold', }} color="secondary.main">{data.subtitulo}</Typography>
				</Box>
			</Grid>
		</Grid>
	);
};

export default CardInfo;