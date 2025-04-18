'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url, alias }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setError(!res.ok);
    setMessage(res.ok ? `${window.location.origin}/${alias}` : data.error);
  };

  return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: 'background.paper',
            }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            URL Shortener 🔗
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Custom Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                margin="normal"
                required
            />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
            >
              Shorten
            </Button>
          </form>

          {message && (
              <Alert
                  severity={error ? 'error' : 'success'}
                  sx={{
                    mt: 4,
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                  }}
              >
                <Typography
                    variant="body2"
                    sx={{ wordBreak: 'break-all', flexGrow: 1, mr: 2 }}
                >
                  {message}
                </Typography>
                {!error && (
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigator.clipboard.writeText(message)}
                    >
                      Copy
                    </Button>
                )}
              </Alert>
          )}
        </Box>
      </Container>
  );
}
