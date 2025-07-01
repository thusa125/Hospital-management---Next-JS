import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Typography, Box,Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/patients');
    } else {
      setError(data.error);
    }
  };

return (
  <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{
          minHeight: { xs: 500, md: 600 },
          height: { md: 500 },
          boxShadow: 3,
          borderRadius: 3,
          overflow: 'hidden',
            alignItems: 'stretch',
        }}
      >
        {/* Left Side - Welcome */}
        <Grid
          item
            size={{ xs: 6, sm: 6, md:6, lg: 6, xl: 6}}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            width: '100%',
              height: '100%', // Ensure full height
            position: 'relative',
          }}
        >
         <img
    src="https://i.pinimg.com/736x/2c/9c/c3/2c9cc35f2c3366fb392e5e5842d94742.jpg"
    alt=""
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
    }}
  />
         
          
        </Grid>
        {/* Right Side - Login Form */}
        <Grid
          item
           size={{ xs: 6, sm: 6, md:6, lg: 6, xl: 6}}
          sx={{
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
             height: '100%', // Ensure full height
            py: 4,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 320,
              alignItems: 'center',
            }}
          >

            
            <Typography variant="h6" align="center" sx={{ mb: 2, color: '#3C6145', fontWeight: 600 }}>
              LOGIN
            </Typography>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              fullWidth
              size="small"
              sx={{ background: '#f5f6fa' }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              size="small"
              sx={{ background: '#f5f6fa' }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #3C6145 0%,rgb(177, 162, 135) 100%)',
                color: '#fff',
                fontWeight: 600,
                mt: 1,
                borderRadius: 2,
                boxShadow: 1,
                width: '100%',
              }}
            >
              LOGIN
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
);
}
