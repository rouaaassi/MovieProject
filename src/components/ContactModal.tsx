import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        to_email: 'assiroua25@gmail.com',
        from_name: name,
        from_email: email,
        message: message,
      };

      await email.send(
        'YOUR_SERVICE_ID', // Replace with your service ID
        'YOUR_TEMPLATE_ID', // Replace with your template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your public key
      );

      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully!',
        severity: 'success'
      });
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred while sending the message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="contact-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '90vw', sm: '500px' },
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              outline: 'none',
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.primary',
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
              Contact Us
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                  },
                }}
              >
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </Box>
        </motion.div>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}; 