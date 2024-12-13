import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, TextField, Button, Typography } from '@mui/material';

const EditHome = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from('home')
      .select('*');

    if (error) {
      console.error('Error fetching sections:', error);
    } else {
      setSections(data);
      setLoading(false);
    }
  };

  const handleChange = (id, value) => {
    setSections(sections.map(section => section.id === id ? { ...section, content: value } : section));
  };

  const handleSave = async (id, content) => {
    const { error } = await supabase
      .from('home')
      .update({ content, updated_at: new Date() })
      .eq('id', id);

    if (error) {
      console.error('Error updating section:', error);
    } else {
      fetchSections(); // Refrescar las secciones después de guardar
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Editar Home</Typography>
      {sections.map(section => (
        <Box key={section.id} mb={2}>
          <Typography variant="h6">{section.section}</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={section.content}
            onChange={(e) => handleChange(section.id, e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSave(section.id, section.content)}
            sx={{ mt: 1 }}
          >
            Guardar
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default EditHome;