import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const faqs = [
	{ question: '¿Pregunta 1?', answer: 'Esta es la respuesta a la pregunta 1.' },
	{ question: '¿Pregunta 2?', answer: 'Esta es la respuesta a la pregunta 2.' },
	{ question: '¿Pregunta 3?', answer: 'Esta es la respuesta a la pregunta 3.' },
	{ question: '¿Pregunta 4?', answer: 'Esta es la respuesta a la pregunta 4.' },
	{ question: '¿Pregunta 5?', answer: 'Esta es la respuesta a la pregunta 5.' },
	{ question: '¿Pregunta 6?', answer: 'Esta es la respuesta a la pregunta 6.' },
	{ question: '¿Pregunta 7?', answer: 'Esta es la respuesta a la pregunta 7.' },
	{ question: '¿Pregunta 8?', answer: 'Esta es la respuesta a la pregunta 8.' },
	{ question: '¿Pregunta 9?', answer: 'Esta es la respuesta a la pregunta 9.' },
	{ question: '¿Pregunta 10?', answer: 'Esta es la respuesta a la pregunta 10.' },
];

const FaqsPage = () => {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Box>
			{/* el nav */}
			<Nav />
			<Box sx={{ width: '100%' }}>
				<Typography variant="h4" gutterBottom>
					Preguntas frecuentes
				</Typography>
				{faqs.map((faq, index) => (
					<Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{faq.question}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>{faq.answer}</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
			<Footer />
		</Box>
	);
};

export default FaqsPage;