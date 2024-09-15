import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const MessageTemplateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4003/learnup/api/notification/create-template', { title, content });
      toast.success("Message template created successfully!")
      setTitle('');
      setContent('');
      navigate('/admin/dashboard/notification/template')
    } catch (error) {
      console.error('Error creating template:', error);
      alert('Failed to create message template');
    }
  };

  return (
    <Container>
      
      <Box position="sticky" top={0} borderColor="primary.main" borderRadius={1} boxShadow={1} padding={1}>
      <Typography variant="h5" align="center" gutterBottom>
        New Template
      </Typography>
      <Box mt={2}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          style={{backgroundColor:"#92e3a9", color:"black"}}
        
        >
          Create Template
        </Button>
      </Box>
      </Box>
    </Container>
  );
}

export default MessageTemplateForm;
