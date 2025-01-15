import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './client';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#dd6e11');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [text2Color, setText2Color] = useState('#dd6e11');

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
      setText2Color(data.text2);
    }
  };

  const updateColor = async (colorName, colorValue) => {
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
      if (colorName === 'text2') setText2Color(colorValue);
    }
  };

  return (
    <ColorContext.Provider value={{ primaryColor, secondaryColor, textColor, text2Color, updateColor }}>
      {children}
    </ColorContext.Provider>
  );
};