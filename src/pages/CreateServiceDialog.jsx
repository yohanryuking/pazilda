import React, { useState } from 'react';
import { supabase } from '../client';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CreateServiceDialog = ({ open, onClose, onCreate }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);

  const handleCreate = async () => {
    let imageUrl = '';
    if (newImage) {
      console.log('Uploading image:', newImage.name);
      const { data, error: uploadError } = await supabase
        .storage
        .from('services')
        .upload(`public/${newImage.name}`, newImage);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }

      console.log('Image uploaded:', data);

      const { data: publicUrlData, error: urlError } = supabase
        .storage
        .from('services')
        .getPublicUrl(`public/${newImage.name}`);

      if (urlError) {
        console.error('Error getting public URL:', urlError);
        return;
      }

      imageUrl = publicUrlData.publicUrl;
      console.log('Public URL:', imageUrl);
    }

    const { error } = await supabase
      .from('services')
      .insert([{ title: newTitle, description: newDescription, image: imageUrl, created_at: new Date(), updated_at: new Date() }]);

    if (error) {
      console.error('Error creating service:', error);
    } else {
      console.log('Service created successfully');
      setNewTitle('');
      setNewDescription('');
      setNewImage(null);
      onClose();
      onCreate(); // Refrescar los servicios después de crear uno nuevo
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    console.log('Selected image:', file);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear nuevo servicio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingresa el título, la descripción y selecciona una imagen para el nuevo servicio.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Título"
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          margin="dense"
          label="Descripción"
          fullWidth
          multiline
          rows={4}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 1, mb: 1 }}
        >
          Subir Imagen
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="red" sx={{ borderRadius: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleCreate} color="red" sx={{ borderRadius: 2 }}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateServiceDialog;