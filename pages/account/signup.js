import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { InputLabel, Select, MenuItem, Avatar, Paper, Alert, Collapse, AlertTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { parseCookies } from 'nookies';

const theme = createTheme();

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { signUp } = useContext(AuthContext)
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

  async function handleSignIn(data){
    try{

      getGeolocation();

      data.latitude = String(lat)
      data.longitude = String(lng)

      await signUp(data);
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
                        Cadastro realizado com sucesso
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
                          Ocorreu um erro ao cadastrar. Tente novamente.
                    </Alert>
            }
           
          </Collapse>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <Image src="/logo2.svg" width={250} height={250} />
            <Box component="form" noValidate onSubmit={handleSubmit(handleSignIn)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                  {...register('email')}
                    autoComplete="given-name"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('confirmPassword')}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirme a senha"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                  />
                </Grid>
                <Grid item xs={12} hidden>
                  <InputLabel id="select-role">Função</InputLabel>
                  <Select
                    {...register('role')}
                    labelId="select-role"
                    id="role"
                    autoWidth
                    defaultValue={0}
                    label="Função"
                  >
                    <MenuItem value={2}>Associado</MenuItem>
                    <MenuItem value={3}>Prestador</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastre-se
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/account/login" variant="body2">
                    Já tem uma conta ? Faça o seu login
                  </Link>
                </Grid>
              </Grid>
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