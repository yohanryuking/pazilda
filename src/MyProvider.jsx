import React, { createContext, useState } from 'react';
import { supabase } from './client';
import { useEffect } from 'react';

// Crear el Contexto
export const MyContext = createContext();

// Crear el proveedor de contexto
export function MyProvider({ children }) {
  const [primary, setPrimary] = useState('#000');
  const [secondary, setSecondary] = useState('#000');
  const [text, setText] = useState('#000');
  const [text2, setText2] = useState('#000');

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase
        .from('colors')
        .select('*')


      if (error) {
        console.error('Error fetching colors:', error);
      } else {
        // Aquí puedes actualizar tus colores basándote en los datos que recibiste
        // Asegúrate de que los nombres de los campos en 'data' coinciden con los que estás utilizando aquí
        if (data) {
          setPrimary(data[0].primary);
          setSecondary(data[0].secondary);
          setText(data[0].text);
          setText2(data[0].text2);
        }
        console.log(data);
      }
    };

    fetchColors();
  }, []);

  return (
    <MyContext.Provider value={{ primary, secondary, text, setPrimary, setSecondary, setText, text2, setText2 }}>
      {children}
    </MyContext.Provider>
  );
}