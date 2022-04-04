import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { InputLabel, Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from "react-hook-form";

const theme = createTheme();

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { signUp } = useContext(AuthContext)

  async function handleSignIn(data){
    console.log(data)
    await signUp(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Bem Vindo ao Boa Saúde
          </Typography>
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
                <MenuItem value={0}>Associado</MenuItem>
              </Select>
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
      </Container>
    </ThemeProvider>
  );
}