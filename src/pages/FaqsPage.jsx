import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { supabase } from '../client';

const FaqsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*');

    if (error) {
      console.error('Error fetching FAQs:', error);
    } else {
      setFaqs(data);
      setLoading(false);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Box sx={{ flex: 1, width: '100%', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Preguntas frecuentes
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={faq.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default FaqsPage;