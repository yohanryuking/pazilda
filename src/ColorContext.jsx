import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './client';

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
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

  return (
    <ColorContext.Provider value={{ primaryColor, secondaryColor, textColor }}>
      {children}
    </ColorContext.Provider>
  );
};