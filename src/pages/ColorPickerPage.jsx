import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ColorPicker from './ColorPicker';
import { ColorContext } from '../ColorContext';

const ColorPickerPage = () => {
  const { primaryColor, secondaryColor, textColor, text2Color, updateColor } = useContext(ColorContext);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Selecciona los colores del sitio</Typography>
      <ColorPicker currentColor={primaryColor} onColorChange={(color) => updateColor('primary', color)} />
      <ColorPicker currentColor={secondaryColor} onColorChange={(color) => updateColor('secondary', color)} />
      <ColorPicker currentColor={textColor} onColorChange={(color) => updateColor('text', color)} />
      <ColorPicker currentColor={text2Color} onColorChange={(color) => updateColor('text2', color)} />
    </Box>
  );
};

export default ColorPickerPage;