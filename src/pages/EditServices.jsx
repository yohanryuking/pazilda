import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardActions, CardMedia, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateServiceDialog from './CreateServiceDialog';

const EditServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*');

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data);
      setLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setServices(services.map(service => service.id === id ? { ...service, [field]: value } : service));
  };

  const handleSave = async (id, title, description) => {
    const { error } = await supabase
      .from('services')
      .update({ title, description, updated_at: new Date() })
      .eq('id', id);

    if (error) {
      console.error('Error updating service:', error);
    } else {
      setEditingId(null);
      fetchServices(); // Refrescar los servicios después de guardar
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
    } else {
      fetchServices(); // Refrescar los servicios después de eliminar
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>Editar Servicios</Typography>
      <Grid container spacing={2}>
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
              {service.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                {editingId === service.id ? (
                  <>
                    <TextField
                      fullWidth
                      label="Título"
                      value={service.title}
                      onChange={(e) => handleChange(service.id, 'title', e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Descripción"
                      value={service.description}
                      onChange={(e) => handleChange(service.id, 'description', e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h5">{service.title}</Typography>
                    <Typography variant="body2">{service.description}</Typography>
                  </>
                )}
              </CardContent>
              <CardActions>
                <IconButton onClick={() => setEditingId(editingId === service.id ? null : service.id)}>
                  {editingId === service.id ? <CheckIcon onClick={() => handleSave(service.id, service.title, service.description)} /> : <EditIcon />}
                </IconButton>
                <IconButton onClick={() => handleDelete(service.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ borderRadius: 2, boxShadow: 1 }}
        >
          Crear nuevo servicio
        </Button>
        <CreateServiceDialog open={open} onClose={handleClose} onCreate={fetchServices} />
      </Box>
    </Box>
  );
};

export default EditServices;