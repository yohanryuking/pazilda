import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, TextField, Button, Typography } from '@mui/material';

const EditAbout = () => {
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
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('about')
      .update({ content, updated_at: new Date() })
      .eq('id', 1); // Asumiendo que solo hay un registro en la tabla 'about'

    if (error) {
      console.error('Error updating content:', error);
    } else {
      fetchContent(); // Refrescar el contenido después de guardar
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>Editar About</Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2, borderRadius: 2, boxShadow: 1 }}
      >
        Guardar
      </Button>
    </Box>
  );
};

export default EditAbout;