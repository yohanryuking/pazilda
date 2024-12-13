import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { MyContext } from './MyProvider';
import { ColorContext, ColorProvider } from './ColorContext';

// Tus componentes de página
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FaqsPage from './pages/FaqsPage';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';




function App() {
  const { primary, secondary, text, text2 } = useContext(MyContext);

  useEffect(() => {
    // Aquí puedes actualizar el estado de tu componente en función del nuevo valor del contexto
    console.log('El color primario ha cambiado a:', primary);
  }, [primary, secondary, text, text2]); // Este array de dependencias hace que useEffect se ejecute cada vez que 'primary' cambia


  const theme = createTheme({
    palette: {
      primary: {
        main: primary, // color primario
      },
      secondary: {
        main: secondary, // color secundario
      },
      text: {
        main: text,
      },
      text2: {
        main: text2,
      },
      // Agrega más colores según sea necesario
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 500,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      letterSpacing: '-0.1em',
      lineHeight: '1.2',
    },
    // spacing: 4,
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    // shadows: [ '0px 2px 1px -1px rgba(0,0,0,0.2), ...'],
  });


  return (

    <ThemeProvider theme={theme}>
      <ColorProvider>

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
      </ColorProvider>
    </ThemeProvider>
  );
}

export default App;