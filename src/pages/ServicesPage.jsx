import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick';

const ServicesPage = () => {
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.4,
    slidesToScroll: 1,
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>Servicios</Typography>
        <Slider {...settings}>
          {services.map(service => (
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
      <Footer />
    </Box>
  );
};

export default ServicesPage;