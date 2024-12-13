import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, TextField, Button, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const EditFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*');

    if (error) {
      console.error('Error fetching FAQs:', error);
    } else {
      setFaqs(data);
      setLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
  };

  const handleSave = async (id, question, answer) => {
    const { error } = await supabase
      .from('faqs')
      .update({ question, answer, updated_at: new Date() })
      .eq('id', id);

    if (error) {
      console.error('Error updating FAQ:', error);
    } else {
      setEditingId(null);
      fetchFaqs(); // Refrescar las FAQs después de guardar
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
    } else {
      fetchFaqs(); // Refrescar las FAQs después de eliminar
    }
  };

  const handleCreate = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .insert([{ question: newQuestion, answer: newAnswer, created_at: new Date(), updated_at: new Date() }]);

    if (error) {
      console.error('Error creating FAQ:', error);
    } else {
      setNewQuestion('');
      setNewAnswer('');
      setOpen(false);
      fetchFaqs(); // Refrescar las FAQs después de crear una nueva
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
      <Typography variant="h4" gutterBottom>Editar FAQs</Typography>
      {faqs.map(faq => (
        <Accordion key={faq.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {editingId === faq.id ? (
                <TextField
                  fullWidth
                  label="Pregunta"
                  value={faq.question}
                  onChange={(e) => handleChange(faq.id, 'question', e.target.value)}
                  sx={{ mr: 2 }}
                />
              ) : (
                <Typography sx={{ flexGrow: 1 }}>{faq.question}</Typography>
              )}
              <IconButton onClick={() => setEditingId(editingId === faq.id ? null : faq.id)}>
                {editingId === faq.id ? <CheckIcon onClick={() => handleSave(faq.id, faq.question, faq.answer)} /> : <EditIcon />}
              </IconButton>
              <IconButton onClick={() => handleDelete(faq.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {editingId === faq.id ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Respuesta"
                value={faq.answer}
                onChange={(e) => handleChange(faq.id, 'answer', e.target.value)}
              />
            ) : (
              <Typography>{faq.answer}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ borderRadius: 2, boxShadow: 1 }}
        >
          Crear nueva FAQ
        </Button>
        <Dialog open={open} onClose={handleClose} sx={{ borderRadius: 2 }}>
          <DialogTitle>Crear nueva FAQ</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, ingresa la pregunta y la respuesta para la nueva FAQ.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Pregunta"
              fullWidth
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="dense"
              label="Respuesta"
              fullWidth
              multiline
              rows={4}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" sx={{ borderRadius: 2 }}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} color="primary" sx={{ borderRadius: 2 }}>
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default EditFAQs;