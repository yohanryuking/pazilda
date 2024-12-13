import React, { useState } from 'react';
import { supabase } from '../client';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        sx={{ mt: 2, borderRadius: 2, boxShadow: 1 }}
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>
    </Box>
  );
};

export default Login;