import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { supabase } from '../client';
import { Box, Button, Typography } from '@mui/material';

const ColorPicker = ({ currentColor, onColorChange }) => {
  const [color, setColor] = useState(currentColor);

  const handleChangeComplete = async (color) => {
    setColor(color.hex);
    onColorChange(color.hex);
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, backgroundColor: '#fff' }}>
      <Typography variant="h6" gutterBottom>Selecciona un color</Typography>
      <SketchPicker
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </Box>
  );
};

export default ColorPicker;