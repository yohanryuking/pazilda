import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, Typography } from '@mui/material';
import ColorPicker from './ColorPicker';

const ColorPickerPage = () => {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const { data, error } = await supabase
      .from('colors')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching colors:', error);
    } else {
      setPrimaryColor(data.primary);
      setSecondaryColor(data.secondary);
      setTextColor(data.text);
    }
  };

  const handleColorChange = async (colorName, colorValue) => {
    const { error } = await supabase
      .from('colors')
      .update({ [colorName]: colorValue })
      .eq('id', 1); // Asume que el valor de 'id' para esa fila es 1

    if (error) {
      console.error('Error updating color:', error);
    } else {
      if (colorName === 'primary') setPrimaryColor(colorValue);
      if (colorName === 'secondary') setSecondaryColor(colorValue);
      if (colorName === 'text') setTextColor(colorValue);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Selecciona los colores del sitio</Typography>
      <ColorPicker currentColor={primaryColor} onColorChange={(color) => handleColorChange('primary', color)} />
      <ColorPicker currentColor={secondaryColor} onColorChange={(color) => handleColorChange('secondary', color)} />
      <ColorPicker currentColor={textColor} onColorChange={(color) => handleColorChange('text', color)} />
    </Box>
  );
};

export default ColorPickerPage;