import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../client';

function AboutPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('about')
      .select('content')
      .single();

    if (error) {
      console.error('Error fetching content:', error);
    } else {
      setContent(data.content);
    }
    setLoading(false);
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Container sx={{ flex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Acerca de nosotros
        </Typography>
        <Typography variant="body1">
          {content}
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default AboutPage;