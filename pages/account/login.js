import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from "react-hook-form";
import { Paper, Alert, Collapse, AlertTitle, Grid } from '@mui/material';
import Image from 'next/image';
import { parseCookies } from 'nookies';

const theme = createTheme();

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext); 
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  async function getGeolocation(){
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
    });
    }
  }

  async function handleLogin(data){
    try{
      
      getGeolocation();

      data.latitude = String(lat)
      data.longitude = String(lng)

      await signIn(data);
      setIsValid(true);
      setOpen(true);

    }catch(error){
      setIsValid(false);
      setOpen(true);  
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/tE7_jvK-_YU)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Collapse in={open}>
            {isValid
                  ? <Alert
                      severity='success'
                      action={
                        <Button color="inherit" size="small" onClick={() => {setOpen(false);}}> 
                          Fechar
                        </Button>
                      }
                    >
                      <AlertTitle>Deu tudo certo!</AlertTitle>
                        Login realizado com sucesso
                    </Alert>
                  : <Alert
                      severity='error'
                      action={
                        <Button color="inherit" size="small" onClick={() => {setOpen(false);}}> 
                          Fechar
                        </Button>
                      }
                    >
                      <AlertTitle>Erro</AlertTitle>
                          Login incorreto. Confira seus dados e tente novamente.
                    </Alert>
            }
           
          </Collapse>

          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Image src="/logo2.svg" width={250} height={250} />

            <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
              <TextField
                {...register('email')}
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...register('password')}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}            
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


export const getServerSideProps = async(ctx) => {
  const { ['gisa-token']: token } = parseCookies(ctx);

  if(token){
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false
          }
      }
  }

  return {
      props:{}
  }
}